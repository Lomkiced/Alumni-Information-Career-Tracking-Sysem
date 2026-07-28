"use client";
// app/(dashboard)/admin/profile/page.tsx
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminRegisterSchema, type AdminRegisterInput } from "@/lib/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { UserPlus, ShieldAlert, Loader2, User, Trash2 } from "lucide-react";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";

type AdminUser = {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  role: string;
};

export default function AdminProfilePage() {
  const { profile } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);
  
  // Deletion state
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<AdminRegisterInput>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: { full_name: "", email: "", password: "", confirm_password: "" },
  });

  const fetchAdmins = async () => {
    try {
      setIsLoadingAdmins(true);
      const res = await fetch("/api/admin/admins");
      const data = await res.json();
      if (res.ok) {
        setAdmins(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const onSubmit = async (values: AdminRegisterInput) => {
    try {
      const res = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create admin");
      }

      toast.success("New administrator successfully created.");
      form.reset();
      setIsAdding(false);
      fetchAdmins(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteAdmin = async () => {
    if (!adminToDelete) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/admins/${adminToDelete.id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete admin");
      }

      toast.success("Admin account permanently deleted.");
      setAdminToDelete(null);
      fetchAdmins(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<AdminUser>[] = [
    {
      key: "full_name",
      header: "Name",
      cell: (row) => <span className="font-medium text-foreground">{row.full_name}</span>
    },
    { key: "email", header: "Email Address" },
    {
      key: "created_at",
      header: "Joined Date",
      cell: (row) => <span className="text-muted-foreground">{format(new Date(row.created_at), "MMM d, yyyy")}</span>
    },
    {
      key: "actions",
      header: "",
      className: "w-[80px] text-right",
      cell: (row) => (
        <div className="flex justify-end">
          {profile?.id !== row.id && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); setAdminToDelete(row); }}
              className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-8 px-2"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Administrator Profile" description="Manage your account and system administrators." />

      {/* Current Profile Section */}
      <div className="glass p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pclu-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <h2 className="text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="text-pclu-sky-500" size={20} /> My Profile Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Full Name</p>
            <p className="font-medium text-foreground">{profile?.full_name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Email Address</p>
            <p className="font-medium text-foreground">{profile?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Role</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
              Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Add Admin Section */}
      <div className="glass p-6 rounded-2xl border border-white/10 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground flex items-center gap-2">
              <ShieldAlert className="text-red-500" size={20} /> Manage Administrators
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              View all system administrators, create new accounts, or revoke access from existing ones.
            </p>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} className="gap-2 shrink-0">
              <UserPlus size={16} /> New Admin
            </Button>
          )}
        </div>

        {/* Add Form */}
        {isAdding && (
          <div className="bg-background/50 rounded-xl p-6 border border-border mb-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-semibold mb-4">Create New Administrator</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="full_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="confirm_password" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                  <Button type="button" variant="ghost" onClick={() => { setIsAdding(false); form.reset(); }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</>
                    ) : "Create Administrator"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* Admin Data Table */}
        <DataTable 
          data={admins}
          columns={columns}
          loading={isLoadingAdmins}
          searchable={true}
          searchPlaceholder="Search admins by name or email..."
          emptyMessage="No administrators found."
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!adminToDelete} onOpenChange={(open) => !open && setAdminToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Permanently Delete Administrator</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete <strong>{adminToDelete?.full_name}</strong>? 
              This will completely erase their account from the system and database. Any announcements or approvals they made will be safely reassigned to you.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setAdminToDelete(null)} disabled={isDeleting}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAdmin} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Yes, Permanently Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
