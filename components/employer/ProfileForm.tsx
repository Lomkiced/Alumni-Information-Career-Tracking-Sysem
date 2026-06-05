"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employerProfileSchema, type EmployerProfileInput } from "@/lib/validations/employer.schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Save, Eye, Building2, Contact, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ProfilePreview } from "./ProfilePreview";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("pending");

  const form = useForm<EmployerProfileInput>({
    resolver: zodResolver(employerProfileSchema),
    defaultValues: {
      company_name: "",
      industry: "",
      company_size: undefined,
      company_website: "",
      company_logo_url: "",
      company_description: "",
      full_name: "",
      phone: "",
      company_address: "",
      business_permit_number: "",
    },
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/employer/profile");
        if (res.ok) {
          const data = await res.json();
          form.reset(data);
          setApprovalStatus(data.approval_status);
        } else {
          toast.error("Failed to load profile data.");
        }
      } catch (err) {
        toast.error("An error occurred while fetching your profile.");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [form]);

  async function onSubmit(values: EmployerProfileInput) {
    setSaving(true);
    try {
      const res = await fetch("/api/employer/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to update profile.");
      }
    } catch (err) {
      toast.error("A network error occurred.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 border rounded-xl bg-card">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
        
        {/* Header/Cover Photo Area */}
        <div className="relative rounded-2xl overflow-hidden border bg-card">
          <div className="h-32 bg-gradient-to-r from-pclu-navy-800 to-pclu-sky-600"></div>
          <div className="px-8 pb-6">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-end -mt-12 relative z-10">
              {/* Logo Preview */}
              <div className="w-24 h-24 rounded-xl bg-background border-4 border-background shadow-lg flex items-center justify-center overflow-hidden shrink-0">
                {form.watch("company_logo_url") ? (
                  <img src={form.watch("company_logo_url")} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-10 h-10 text-muted-foreground/50" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-2xl font-bold">{form.watch("company_name") || "Your Company Name"}</h2>
                <p className="text-muted-foreground text-sm">{form.watch("industry") || "Industry"} • {form.watch("company_size") || "Size"} employees</p>
              </div>
              <div className="flex items-center gap-3">
                <Dialog>
                  <DialogTrigger render={<Button type="button" variant="outline" className="gap-2" />}>
                    <Eye size={18} />
                    Preview Public Profile
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 overflow-hidden bg-muted/20">
                    <ProfilePreview data={form.getValues()} />
                  </DialogContent>
                </Dialog>
                <Button type="submit" disabled={saving} className="gap-2">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8 h-12 p-1 bg-muted/50">
            <TabsTrigger value="general" className="gap-2 text-base rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"><Building2 size={16}/> General Info</TabsTrigger>
            <TabsTrigger value="contact" className="gap-2 text-base rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"><Contact size={16}/> Contact</TabsTrigger>
            <TabsTrigger value="verification" className="gap-2 text-base rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"><ShieldCheck size={16}/> Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Identity</CardTitle>
                <CardDescription>Basic information that identifies your company on the platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Technology, Finance, Education" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 px-4 text-base">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company_logo_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Logo URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <Input placeholder="https://example.com/logo.png" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About Us</CardTitle>
                <CardDescription>A compelling description of your company, culture, and mission.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="company_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RichTextEditor
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Write a comprehensive description about what your company does, your values, and why alumni should join your team..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact & Location</CardTitle>
                <CardDescription>Where your company is located and how to reach you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="company_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headquarters Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Business Avenue, Tech District, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Primary Contact Person</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+63 912 345 6789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Verification</CardTitle>
                <CardDescription>
                  Your verification status determines whether you can post jobs on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl border flex items-start gap-4 bg-muted/30">
                  <div className={`p-2 rounded-full ${
                    approvalStatus === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    approvalStatus === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg capitalize">{approvalStatus} Status</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      {approvalStatus === 'approved' && "Your account is fully verified. You can post jobs and interact with alumni."}
                      {approvalStatus === 'pending' && "Your account is under review by the administration. You can complete your profile in the meantime."}
                      {approvalStatus === 'rejected' && "Your account verification was unsuccessful. Please update your details and contact administration."}
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="business_permit_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Permit Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Permit / SEC Registration No." 
                          {...field} 
                          disabled={approvalStatus === 'approved'} 
                        />
                      </FormControl>
                      {approvalStatus === 'approved' && (
                        <p className="text-xs text-muted-foreground mt-2">
                          This field cannot be edited after approval.
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </form>
    </Form>
  );
}
