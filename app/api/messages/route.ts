import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

// GET /api/messages?userId=<id>
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const searchParams = request.nextUrl.searchParams;
    const targetUserId = searchParams.get("userId");
    if (!targetUserId) return Response.json({ error: "Missing userId" }, { status: 400 });

    // Ensure they are not the same
    if (user.id === targetUserId) return Response.json({ error: "Cannot chat with yourself" }, { status: 400 });

    // Find existing conversation or create one
    let conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          { user1_id: user.id, user2_id: targetUserId },
          { user1_id: targetUserId, user2_id: user.id }
        ]
      }
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          user1_id: user.id,
          user2_id: targetUserId
        }
      });
    }

    // Fetch messages
    const messages = await prisma.message.findMany({
      where: { conversation_id: conversation.id },
      orderBy: { created_at: 'asc' },
      take: 100,
    });

    // Mark unread messages as read
    await prisma.message.updateMany({
      where: { conversation_id: conversation.id, sender_id: targetUserId, is_read: false },
      data: { is_read: true }
    });

    // Fetch target user profile
    const targetProfile = await prisma.profile.findUnique({
      where: { id: targetUserId },
      select: { id: true, full_name: true, profile_photo_url: true, role: true }
    });

    return Response.json({ data: { conversation, messages, targetProfile } });
  } catch (error) {
    console.error("[GET /api/messages]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/messages
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { conversation_id, content } = body;

    if (!conversation_id || !content) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify conversation belongs to user
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversation_id,
        OR: [
          { user1_id: user.id },
          { user2_id: user.id }
        ]
      }
    });

    if (!conversation) return Response.json({ error: "Conversation not found or access denied" }, { status: 404 });

    const message = await prisma.message.create({
      data: {
        conversation_id,
        sender_id: user.id,
        content: content.trim(),
      }
    });

    await prisma.conversation.update({
      where: { id: conversation_id },
      data: { updated_at: new Date() }
    });

    return Response.json({ data: message }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/messages]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/messages?messageId=<id>
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const searchParams = request.nextUrl.searchParams;
    const messageId = searchParams.get("messageId");
    if (!messageId) return Response.json({ error: "Missing messageId" }, { status: 400 });

    const message = await prisma.message.findUnique({ where: { id: messageId } });
    if (!message || message.sender_id !== user.id) {
      return Response.json({ error: "Message not found or unauthorized" }, { status: 404 });
    }

    await prisma.message.delete({ where: { id: messageId } });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/messages]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
