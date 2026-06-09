"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, User, FileText, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

interface EmployerData {
  id: string;
  company_name: string;
  industry: string;
  company_size: string | null;
  business_permit_number: string | null;
  company_website: string | null;
  company_address: string | null;
  approval_status: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

export default function EmployerReviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [employer, setEmployer] = useState<EmployerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [disapproveDialogOpen, setDisapproveDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function fetchEmployer() {
      try {
        const res = await fetch(`/api/admin/employers/${id}`);
        const json = await res.json();
        if (res.ok && json.data) {
          setEmployer(json.data);
        } else {
          toast.error("Failed to load employer data.");
        }
      } catch (err) {
        toast.error("Error loading employer.");
      } finally {
        setLoading(false);
      }
    }
    fetchEmployer();
  }, [id]);

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/employers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to approve");

      toast.success("Employer has been approved successfully.");
      setApproveDialogOpen(false);
      setTimeout(() => {
        router.push("/admin/employers");
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "Failed to approve employer");
      setActionLoading(false);
      setApproveDialogOpen(false);
    }
  };

  const handleDisapprove = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/employers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "disapprove" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to disapprove");

      toast.success("Employer has been disapproved and set back to Pending.");
      setDisapproveDialogOpen(false);
      setTimeout(() => {
        router.push("/admin/employers");
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "Failed to disapprove employer");
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/employers/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to reject/delete");

      toast.success("Employer has been rejected and removed from the system.");
      setRejectDialogOpen(false);
      router.push("/admin/employers");
    } catch (err: any) {
      toast.error(err.message || "Failed to reject employer");
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-24 bg-muted rounded animate-pulse" />
        <div className="h-48 bg-muted rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!employer) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Employer not found.
        <div className="mt-4">
          <Link href="/admin/employers">
            <Button variant="outline">Return to Employers</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { profiles } = employer;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back Navigation */}
      <Link href="/admin/employers">
        <Button variant="ghost" className="pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent -ml-2 mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employers
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Review Employer</h1>
          <p className="text-muted-foreground mt-1">Verify employer details before taking action.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Account Information */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4 bg-muted/20 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                <p className="font-medium">{profiles?.full_name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                <p className="font-medium">{profiles?.email || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4 bg-muted/20 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Company Name</p>
                <p className="font-medium">{employer.company_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Industry</p>
                <p className="font-medium">{employer.industry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Company Size</p>
                <p className="font-medium">{employer.company_size || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Business Permit No.</p>
                <p className="font-medium">{employer.business_permit_number || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Company Website</p>
                <p className="font-medium">
                  {employer.company_website ? (
                    <a href={employer.company_website.startsWith('http') ? employer.company_website : `https://${employer.company_website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {employer.company_website}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Company Address</p>
                <p className="font-medium">{employer.company_address || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Details */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4 bg-muted/20 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Registration Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date Registered</p>
                <p className="font-medium">{format(new Date(employer.created_at), "MMMM d, yyyy h:mm a")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Status</p>
                <StatusBadge status={employer.approval_status} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-border">
        {employer.approval_status === "pending" && (
          <Button
            variant="destructive"
            onClick={() => setRejectDialogOpen(true)}
            disabled={actionLoading}
            className="w-32"
          >
            <XCircle className="mr-2 h-4 w-4" /> Reject
          </Button>
        )}
        {(employer.approval_status === "pending" || employer.approval_status === "rejected") && (
          <Button
            onClick={() => setApproveDialogOpen(true)}
            disabled={actionLoading}
            className="w-32 hover:bg-emerald-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
          </Button>
        )}
        {employer.approval_status === "approved" && (
          <Button
            onClick={() => setDisapproveDialogOpen(true)}
            disabled={actionLoading}
            variant="outline"
            className="w-36 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
          >
            <AlertCircle className="mr-2 h-4 w-4" /> Disapprove
          </Button>
        )}
      </div>

      {/* Reject Confirmation Dialog */}
      <ConfirmDialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onConfirm={handleReject}
        title="Reject Employer"
        description="Are you sure you want to reject this employer? This will permanently remove them from the system."
        confirmLabel={actionLoading ? "Rejecting..." : "Confirm"}
        confirmVariant="destructive"
      />

      {/* Disapprove Confirmation Dialog */}
      <ConfirmDialog
        open={disapproveDialogOpen}
        onClose={() => setDisapproveDialogOpen(false)}
        onConfirm={handleDisapprove}
        title="Disapprove Employer"
        description="Are you sure you want to disapprove this employer? Their account will be set back to Pending and will require re-review."
        confirmLabel={actionLoading ? "Disapproving..." : "Confirm"}
        confirmVariant="default"
      />

      {/* Approve Confirmation Dialog */}
      <ConfirmDialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        onConfirm={handleApprove}
        title="Approve Employer"
        description="This will approve the employer account and notify them via in-app notification."
        confirmLabel={actionLoading ? "Approving..." : "Approve"}
        confirmVariant="default"
      />
    </div>
  );
}
