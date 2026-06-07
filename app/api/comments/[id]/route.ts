import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch the comment to check ownership or if the user is an admin
    const { data: comment, error: fetchError } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isAdmin = profile?.role === "admin";
    const isOwner = comment.user_id === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden. You can only delete your own comments." }, { status: 403 });
    }

    // Delete the comment
    const { error: deleteError } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/comments/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
