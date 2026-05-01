// app/api/cron/expire-jobs/route.ts
// Vercel Cron: runs daily at midnight — expires overdue active job postings
import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";
import { sendEmail } from "@/lib/email/send";
import { jobExpiredEmail } from "@/lib/email/templates";

export async function GET(request: NextRequest) {
  const cronSecret = request.headers.get("x-cron-secret");
  if (cronSecret !== process.env.CRON_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const adminClient = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = adminClient as any;

    const { data: expiredJobs, error: fetchErr } = await db
      .from("job_postings")
      .select(`
        id, title, employer_id,
        employers!inner(
          company_name,
          profiles!inner(email, full_name)
        )
      `)
      .eq("status", "active")
      .lt("expires_at", new Date().toISOString());

    if (fetchErr) throw fetchErr;
    if (!expiredJobs || expiredJobs.length === 0) {
      return Response.json({ data: { expired: 0, message: "No jobs to expire." } });
    }

    const ids = expiredJobs.map((j: { id: string }) => j.id);

    const { error: updateErr } = await db
      .from("job_postings")
      .update({ status: "expired", updated_at: new Date().toISOString() })
      .in("id", ids);

    if (updateErr) throw updateErr;

    // In-app notifications
    const notifications = expiredJobs.map((j: { id: string; title: string; employer_id: string }) => ({
      user_id: j.employer_id,
      title: "Job Posting Expired",
      message: `Your job posting "${j.title}" has expired and is no longer visible to applicants.`,
      type: "job_status",
      action_url: "/employer/jobs",
    }));

    for (let i = 0; i < notifications.length; i += 500) {
      await db.from("notifications").insert(notifications.slice(i, i + 500));
    }

    // Send email notifications to employers
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aicts.vercel.app";
    const emailPromises = expiredJobs.map(async (j: any) => {
      const email = j.employers?.profiles?.email;
      const companyName = j.employers?.company_name ?? "Your Company";
      if (email) {
        await sendEmail({
          to: email,
          subject: `Job Posting Expired: "${j.title}"`,
          html: jobExpiredEmail(companyName, j.title, `${appUrl}/employer/jobs`),
        });
      }
    });
    await Promise.allSettled(emailPromises);

    await Promise.all(
      expiredJobs.map((j: { id: string }) =>
        logAudit({
          userId: null,
          action: AUDIT_ACTIONS.EXPIRE_JOB,
          tableName: "job_postings",
          recordId: j.id,
          newValues: { status: "expired" },
        })
      )
    );

    console.log(`[CronJob] Expired ${expiredJobs.length} job postings.`);
    return Response.json({ data: { expired: expiredJobs.length } });
  } catch (error) {
    console.error("[CronJob /api/cron/expire-jobs]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
