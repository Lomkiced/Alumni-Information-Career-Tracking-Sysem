import { notFound } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, MapPin, Briefcase, GraduationCap, Building, Calendar } from "lucide-react";
import { formatInitials } from "@/lib/utils/format";
import { format, differenceInYears } from "date-fns";
import Link from "next/link";
import { BackButton } from "@/components/shared/BackButton";

interface NetworkProfilePageProps {
  params: Promise<{ profileId: string }>;
}

// ── Explicit types so Supabase's generated `never` inference doesn't break JSX ──
interface AlumniInfo {
  course: string | null;
  major: string | null;
  batch_year: number | null;
  city: string | null;
  province: string | null;
  linkedin_url: string | null;
}

interface EmployerInfo {
  company_name: string | null;
  industry: string | null;
  company_size: string | null;
  company_address: string | null;
  company_website: string | null;
  company_description: string | null;
}

interface CareerRecord {
  id: string;
  job_title: string | null;
  employer_name: string | null;
  employment_status: string;
  industry: string | null;
  start_date: string | null;
}

interface ProfileRow {
  id: string;
  full_name: string;
  role: string;
  profile_photo_url: string | null;
  cover_photo_url: string | null;
  birthdate: string | null;
  is_active: boolean;
  is_searchable: boolean;
  alumni: AlumniInfo | AlumniInfo[] | null;
  employers: EmployerInfo | EmployerInfo[] | null;
}

export default async function NetworkProfilePage({ params }: NetworkProfilePageProps) {
  const resolvedParams = await params;
  const { profileId } = resolvedParams;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return notFound();

  // Use admin client to bypass RLS — safe because we only expose is_searchable profiles
  const adminClient = createAdminClient();

  const { data: raw, error } = await adminClient
    .from("profiles")
    .select(`
      id,
      full_name,
      role,
      profile_photo_url,
      cover_photo_url,
      birthdate,
      is_active,
      is_searchable,
      alumni!alumni_id_fkey(course, major, batch_year, city, province, linkedin_url),
      employers!employers_id_fkey(company_name, industry, company_size, company_address, company_website, company_description)
    `)
    .eq("id", profileId)
    .eq("is_active", true)
    .eq("is_searchable", true)
    .single();

  if (error || !raw) return notFound();

  // Cast to our explicit type to avoid Supabase `never` inference
  const profileData = raw as unknown as ProfileRow;

  // Supabase returns 1-to-1 relations as an array or single object depending on version
  const alumni = Array.isArray(profileData.alumni)
    ? (profileData.alumni[0] as AlumniInfo | undefined) ?? null
    : (profileData.alumni as AlumniInfo | null);

  const employer = Array.isArray(profileData.employers)
    ? (profileData.employers[0] as EmployerInfo | undefined) ?? null
    : (profileData.employers as EmployerInfo | null);

  // Fetch current career record separately (alumni only)
  let currentCareer: CareerRecord | null = null;
  if (profileData.role === "alumni") {
    const { data: careers } = await adminClient
      .from("career_records")
      .select("id, job_title, employer_name, employment_status, industry, start_date")
      .eq("alumni_id", profileId)
      .eq("is_current", true)
      .order("start_date", { ascending: false })
      .limit(1);
    currentCareer = (careers?.[0] as CareerRecord | undefined) ?? null;
  }

  const isSelf = user.id === profileId;
  const age = profileData.birthdate
    ? differenceInYears(new Date(), new Date(profileData.birthdate))
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BackButton />
      {/* ── Header Card ─────────────────────────────────────────────────── */}
      <Card className="overflow-hidden border-border/50 shadow-sm">
        <div className="h-64 sm:h-80 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
          {profileData.cover_photo_url && (
            <img src={profileData.cover_photo_url} alt="Cover" className="w-full h-full object-cover object-[center_25%] absolute inset-0" />
          )}
        </div>
        <CardContent className="relative px-6 pb-6 pt-0 sm:px-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-16 mb-4">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl rounded-full bg-muted">
              <AvatarImage src={profileData.profile_photo_url ?? ""} />
              <AvatarFallback className="text-4xl text-primary font-bold">
                {formatInitials(
                  profileData.role === "employer"
                    ? (employer?.company_name ?? profileData.full_name)
                    : profileData.full_name
                )}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <h1 className="text-3xl font-heading font-bold text-foreground">
                {profileData.full_name}
              </h1>
              <p className="text-muted-foreground font-medium flex items-center justify-center sm:justify-start gap-2">
                {profileData.role === "employer" ? (
                  <><Building size={16} /> {employer?.industry ?? "Employer"}</>
                ) : profileData.role === "alumni" ? (
                  <><GraduationCap size={16} /> Alumni{alumni?.course ? ` · ${alumni.course}` : ""}</>
                ) : (
                  <span className="capitalize">{profileData.role}</span>
                )}
              </p>
            </div>

            {!isSelf && (
              <div className="flex shrink-0">
                <Link href={`?chat=${profileData.id}`} scroll={false}>
                  <Button size="lg" className="rounded-full shadow-lg gap-2">
                    <MessageSquare size={18} />
                    Message
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left: About */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {profileData.role === "employer" && employer && (
                <>
                  {employer.company_size && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Building size={16} />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Company Size</p>
                        <p className="font-medium">{employer.company_size} employees</p>
                      </div>
                    </div>
                  )}
                  {employer.company_address && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Location</p>
                        <p className="font-medium">{employer.company_address}</p>
                      </div>
                    </div>
                  )}
                  {employer.company_website && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Building size={16} />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Website</p>
                        <a
                          href={employer.company_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline truncate block"
                        >
                          {employer.company_website}
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}

              {profileData.role === "alumni" && alumni && (
                <>
                  {age !== null && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Age</p>
                        <p className="font-medium">{age} years old</p>
                      </div>
                    </div>
                  )}
                  {(alumni.city || alumni.province) && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Location</p>
                        <p className="font-medium">
                          {[alumni.city, alumni.province].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

            </CardContent>
          </Card>
        </div>

        {/* Right: Career / Academic */}
        <div className="md:col-span-2 space-y-6">

          {profileData.role === "alumni" && alumni && (
            <>
              {/* Academic Background */}
              <Card className="border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="text-primary" size={20} /> Academic Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-1 border-l-2 border-primary/20 pl-4 py-1">
                    <h3 className="font-semibold text-base text-foreground">{alumni.course}</h3>
                    {alumni.major && (
                      <p className="text-sm text-muted-foreground">Major in {alumni.major}</p>
                    )}
                    {alumni.batch_year && (
                      <p className="text-sm text-primary font-medium mt-1">Batch {alumni.batch_year}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Current Job Status */}
              <Card className="border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="text-primary" size={20} /> Current Job Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentCareer ? (
                    <div className="flex flex-col gap-1 border-l-2 border-primary/20 pl-4 py-1">
                      <h3 className="font-semibold text-base text-foreground">
                        {currentCareer.job_title ?? "Employed"}
                      </h3>
                      {currentCareer.employer_name && (
                        <p className="text-sm text-foreground">{currentCareer.employer_name}</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {currentCareer.employment_status.replace(/_/g, " ")}
                        {currentCareer.industry ? ` · ${currentCareer.industry}` : ""}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentCareer.start_date
                          ? format(new Date(currentCareer.start_date), "MMM yyyy")
                          : ""}
                        {" "}- Present
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic border-l-2 border-muted pl-4 py-1">
                      No current career records available.
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {profileData.role === "employer" && employer?.company_description && (
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Company Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {employer.company_description}
                </p>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
