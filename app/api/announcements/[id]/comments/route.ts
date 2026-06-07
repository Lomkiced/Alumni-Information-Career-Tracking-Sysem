import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch comments for this announcement, joining with profiles for author details
    // We order by created_at ascending so older comments are at the top
    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        content,
        parent_id,
        created_at,
        user_id,
        profiles (
          full_name,
          profile_photo_url,
          role
        )
      `)
      .eq("announcement_id", id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error("[GET /api/announcements/[id]/comments]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { content, parent_id } = body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
    }

    const { data, error } = await (supabase as any)
      .from("comments")
      .insert({
        announcement_id: id,
        user_id: user.id,
        content: content.trim(),
        parent_id: parent_id || null,
      })
      .select(`
        id,
        content,
        parent_id,
        created_at,
        user_id,
        profiles (
          full_name,
          profile_photo_url,
          role
        )
      `)
      .single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/announcements/[id]/comments]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
