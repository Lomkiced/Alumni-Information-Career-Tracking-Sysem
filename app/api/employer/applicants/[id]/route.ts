// app/api/employer/applicants/[id]/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

const VALID_STATUSES = ["pending", "viewed", "shortlisted", "for_interview", "hired", "rejected"] as const;

// PATCH /api/employer/applicants/[id] — update application status + optional notes
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "employer") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const { application_status, employer_notes } = body as {
      application_status?: string;
      employer_notes?: string;
    };

    if (application_status && !VALID_STATUSES.includes(application_status as typeof VALID_STATUSES[number])) {
      return Response.json({ error: "Invalid status" }, { status: 422 });
    }

    // Verify ownership via job posting
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: app } = await (supabase as any)
      .from("job_applications")
      .select("id, alumni_id, application_status, job_postings!inner(title, employer_id)")
      .eq("id", id)
      .single() as {
        data: {
          id: string;
          alumni_id: string;
          application_status: string;
          job_postings: { title: string; employer_id: string };
        } | null;
      };

    if (!app) return Response.json({ error: "Not found" }, { status: 404 });
    if (app.job_postings.employer_id !== user.id) return Response.json({ error: "Forbidden" }, { status: 403 });

    const updateData: Record<string, string> = { updated_at: new Date().toISOString() };
    if (application_status) updateData.application_status = application_status;
    if (employer_notes !== undefined) updateData.employer_notes = employer_notes;

    const adminClient = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateErr } = await (adminClient as any).from("job_applications").update(updateData).eq("id", id);
    if (updateErr) throw updateErr;

    if (application_status) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (adminClient as any).from("notifications").insert({
        user_id: app.alumni_id,
        title: "Application Status Update",
        message: `Your application for "${app.job_postings.title}" has been updated to: ${application_status.replace(/_/g, " ")}.`,
        type: "job_status",
        action_url: "/alumni/jobs",
      });
    }

    await logAudit({
      userId: user.id,
      action: AUDIT_ACTIONS.UPDATE_APPLICATION_STATUS,
      tableName: "job_applications",
      recordId: id,
      newValues: updateData,
    });

    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("[PATCH /api/employer/applicants/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
