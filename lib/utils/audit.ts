// lib/utils/audit.ts
// Audit log utility — call in every API route that mutates data

import { prisma, Prisma } from "@/lib/prisma";

interface AuditLogParams {
  userId: string | null | undefined;
  action: string;          // e.g., "UPDATE_CAREER_RECORD"
  tableName?: string;      // e.g., "career_records"
  recordId?: string;       // UUID of the affected record
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        user_id: params.userId ?? null,
        action: params.action,
        table_name: params.tableName ?? null,
        record_id: params.recordId ?? null,
        old_values: params.oldValues
          ? (params.oldValues as Prisma.InputJsonValue)
          : undefined,
        new_values: params.newValues
          ? (params.newValues as Prisma.InputJsonValue)
          : undefined,
        ip_address: params.ipAddress ?? null,
        user_agent: params.userAgent ?? null,
      },
    });
  } catch (error) {
    // Never throw — audit failure must not break the main flow
    console.error("[AuditLog] Failed to write audit log:", error);
  }
}

// ── Action constants ──────────────────────────────────────────────────────────

export const AUDIT_ACTIONS = {
  // Auth
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  PASSWORD_RESET: "PASSWORD_RESET",

  // Profile
  UPDATE_PROFILE: "UPDATE_PROFILE",
  UPLOAD_PHOTO: "UPLOAD_PHOTO",

  // Alumni
  CREATE_ALUMNI: "CREATE_ALUMNI",
  UPDATE_ALUMNI: "UPDATE_ALUMNI",

  // Career
  CREATE_CAREER_RECORD: "CREATE_CAREER_RECORD",
  UPDATE_CAREER_RECORD: "UPDATE_CAREER_RECORD",
  DELETE_CAREER_RECORD: "DELETE_CAREER_RECORD",

  // Employer
  CREATE_EMPLOYER: "CREATE_EMPLOYER",
  UPDATE_EMPLOYER: "UPDATE_EMPLOYER",
  APPROVE_EMPLOYER: "APPROVE_EMPLOYER",
  REJECT_EMPLOYER: "REJECT_EMPLOYER",

  // Jobs
  CREATE_JOB: "CREATE_JOB_POSTING",
  UPDATE_JOB: "UPDATE_JOB_POSTING",
  APPROVE_JOB: "APPROVE_JOB_POSTING",
  REJECT_JOB: "REJECT_JOB_POSTING",
  EXPIRE_JOB: "EXPIRE_JOB_POSTING",
  CLOSE_JOB: "CLOSE_JOB_POSTING",

  // Applications
  CREATE_APPLICATION: "CREATE_JOB_APPLICATION",
  UPDATE_APPLICATION_STATUS: "UPDATE_APPLICATION_STATUS",

  // Announcements
  CREATE_ANNOUNCEMENT: "CREATE_ANNOUNCEMENT",
  UPDATE_ANNOUNCEMENT: "UPDATE_ANNOUNCEMENT",
  PUBLISH_ANNOUNCEMENT: "PUBLISH_ANNOUNCEMENT",
  DELETE_ANNOUNCEMENT: "DELETE_ANNOUNCEMENT",
} as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS];
