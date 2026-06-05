import { Building2, MapPin, Globe, Users } from "lucide-react";
import type { EmployerProfileInput } from "@/lib/validations/employer.schema";

export function ProfilePreview({ data }: { data: EmployerProfileInput }) {
  return (
    <div className="bg-background w-full h-full max-h-[80vh] overflow-y-auto flex flex-col rounded-lg">
      {/* Cover */}
      <div className="h-40 bg-gradient-to-r from-pclu-navy-800 to-pclu-sky-600 w-full shrink-0"></div>
      
      {/* Content */}
      <div className="px-8 pb-8 relative flex-1">
        <div className="flex flex-col sm:flex-row gap-6 -mt-16 sm:-mt-20">
          <div className="w-32 h-32 rounded-2xl bg-white dark:bg-card border-4 border-background shadow-xl flex items-center justify-center overflow-hidden shrink-0 z-10 relative">
            {data.company_logo_url ? (
              <img src={data.company_logo_url} alt={data.company_name} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-12 h-12 text-muted-foreground/30" />
            )}
          </div>
          <div className="flex-1 mt-4 sm:mt-24">
            <h1 className="text-3xl font-heading font-bold">{data.company_name || "Company Name"}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-muted-foreground">
              {data.industry && (
                <div className="flex items-center gap-1.5 text-sm">
                  <Building2 size={16} />
                  {data.industry}
                </div>
              )}
              {data.company_size && (
                <div className="flex items-center gap-1.5 text-sm">
                  <Users size={16} />
                  {data.company_size} employees
                </div>
              )}
              {data.company_address && (
                <div className="flex items-center gap-1.5 text-sm">
                  <MapPin size={16} />
                  <span className="truncate max-w-[200px]">{data.company_address}</span>
                </div>
              )}
              {data.company_website && (
                <div className="flex items-center gap-1.5 text-sm">
                  <Globe size={16} />
                  <a href={data.company_website} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate max-w-[200px]">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-heading font-bold border-b border-border pb-2 mb-6">About Us</h2>
          {data.company_description && data.company_description !== "<p></p>" ? (
            <div 
              className="prose prose-slate dark:prose-invert max-w-none tiptap-editor border-none bg-transparent ring-0 ring-offset-0 px-0 py-0"
              dangerouslySetInnerHTML={{ __html: data.company_description }}
            />
          ) : (
            <p className="text-muted-foreground italic bg-muted/30 p-6 rounded-xl border border-dashed text-center">No description provided yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
