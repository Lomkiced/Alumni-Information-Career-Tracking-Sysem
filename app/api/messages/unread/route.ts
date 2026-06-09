import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find all conversations the user is part of
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { user1_id: user.id },
          { user2_id: user.id }
        ]
      },
      select: { id: true }
    });

    if (conversations.length === 0) {
      return NextResponse.json({ count: 0 });
    }

    // Count unread messages in these conversations sent by other users
    const unreadCount = await prisma.message.count({
      where: {
        conversation_id: { in: conversations.map(c => c.id) },
        sender_id: { not: user.id },
        is_read: false
      }
    });

    return NextResponse.json({ count: unreadCount });
  } catch (error) {
    console.error("[GET /api/messages/unread]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
