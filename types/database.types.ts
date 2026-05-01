// types/database.types.ts
// Auto-generated Supabase TypeScript types
// Regenerate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "alumni" | "admin" | "employer";
          full_name: string;
          email: string;
          phone: string | null;
          profile_photo_url: string | null;
          is_verified: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role: "alumni" | "admin" | "employer";
          full_name: string;
          email: string;
          phone?: string | null;
          profile_photo_url?: string | null;
          is_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      alumni: {
        Row: {
          id: string;
          student_id: string | null;
          course: string;
          major: string | null;
          batch_year: number;
          graduation_year: number;
          address: string | null;
          city: string | null;
          province: string | null;
          linkedin_url: string | null;
          is_profile_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          student_id?: string | null;
          course: string;
          major?: string | null;
          batch_year: number;
          graduation_year: number;
          address?: string | null;
          city?: string | null;
          province?: string | null;
          linkedin_url?: string | null;
          is_profile_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["alumni"]["Insert"]>;
      };
      employers: {
        Row: {
          id: string;
          company_name: string;
          industry: string;
          company_size: string | null;
          business_permit_number: string | null;
          company_address: string | null;
          company_website: string | null;
          company_logo_url: string | null;
          approval_status: "pending" | "approved" | "rejected";
          rejection_reason: string | null;
          approved_at: string | null;
          approved_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          company_name: string;
          industry: string;
          company_size?: string | null;
          business_permit_number?: string | null;
          company_address?: string | null;
          company_website?: string | null;
          company_logo_url?: string | null;
          approval_status?: "pending" | "approved" | "rejected";
          rejection_reason?: string | null;
          approved_at?: string | null;
          approved_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["employers"]["Insert"]>;
      };
      career_records: {
        Row: {
          id: string;
          alumni_id: string;
          employment_status: string;
          employer_name: string | null;
          job_title: string | null;
          industry: string | null;
          employment_type: string | null;
          salary_range: string | null;
          start_date: string | null;
          end_date: string | null;
          is_current: boolean;
          country: string;
          city: string | null;
          job_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          alumni_id: string;
          employment_status: string;
          employer_name?: string | null;
          job_title?: string | null;
          industry?: string | null;
          employment_type?: string | null;
          salary_range?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          country?: string;
          city?: string | null;
          job_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["career_records"]["Insert"]>;
      };
      job_postings: {
        Row: {
          id: string;
          employer_id: string;
          title: string;
          description: string;
          requirements: string | null;
          job_type: string;
          industry: string;
          location: string | null;
          is_remote: boolean;
          salary_min: number | null;
          salary_max: number | null;
          preferred_courses: string[];
          slots: number;
          expires_at: string;
          status: string;
          rejection_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employer_id: string;
          title: string;
          description: string;
          requirements?: string | null;
          job_type: string;
          industry: string;
          location?: string | null;
          is_remote?: boolean;
          salary_min?: number | null;
          salary_max?: number | null;
          preferred_courses?: string[];
          slots?: number;
          expires_at: string;
          status?: string;
          rejection_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["job_postings"]["Insert"]>;
      };
      job_applications: {
        Row: {
          id: string;
          job_id: string;
          alumni_id: string;
          cover_letter: string | null;
          resume_url: string | null;
          application_status: string;
          employer_notes: string | null;
          applied_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          alumni_id: string;
          cover_letter?: string | null;
          resume_url?: string | null;
          application_status?: string;
          employer_notes?: string | null;
          applied_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["job_applications"]["Insert"]
        >;
      };
      announcements: {
        Row: {
          id: string;
          admin_id: string;
          title: string;
          content: string;
          category: string;
          image_url: string | null;
          is_published: boolean;
          published_at: string | null;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          title: string;
          content: string;
          category?: string;
          image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["announcements"]["Insert"]
        >;
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          table_name: string | null;
          record_id: string | null;
          old_values: Json | null;
          new_values: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          table_name?: string | null;
          record_id?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string | null;
          is_read: boolean;
          action_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: string | null;
          is_read?: boolean;
          action_url?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["notifications"]["Insert"]
        >;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
  graphql_public?: Record<string, never>;
} & { PostgrestVersion: "12" };
