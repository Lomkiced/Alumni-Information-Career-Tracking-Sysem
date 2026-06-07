import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { user1_id: user.id },
          { user2_id: user.id }
        ]
      },
      include: {
        user1: { select: { id: true, full_name: true, profile_photo_url: true, role: true } },
        user2: { select: { id: true, full_name: true, profile_photo_url: true, role: true } },
        messages: {
          orderBy: { created_at: 'desc' },
          take: 1
        }
      },
      orderBy: {
        updated_at: 'desc'
      }
    });

    const unreadCounts = await prisma.message.groupBy({
      by: ['conversation_id'],
      where: {
        conversation_id: { in: conversations.map(c => c.id) },
        sender_id: { not: user.id },
        is_read: false
      },
      _count: {
        id: true
      }
    });

    const unreadMap = new Map();
    unreadCounts.forEach(c => unreadMap.set(c.conversation_id, c._count.id));

    const formatted = conversations.map(c => {
      const otherUser = c.user1_id === user.id ? c.user2 : c.user1;
      const latestMessage = c.messages[0] || null;
      return {
        id: c.id,
        otherUser,
        latestMessage,
        unreadCount: unreadMap.get(c.id) || 0,
        updatedAt: c.updated_at
      };
    });

    return NextResponse.json({ data: formatted });
  } catch (error) {
    console.error("[GET /api/messages/conversations]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
