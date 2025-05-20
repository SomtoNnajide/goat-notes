// lib/note-utils.ts
import { prisma } from "@/db/prisma";

export async function getNewestNoteId(userId: string): Promise<string | null> {
    const note = await prisma.note.findFirst({
        where: { authorId: userId },
        orderBy: { createdAt: "desc" },
        select: { id: true },
    });

    return note?.id || null;
}

export async function createNewNote(userId: string): Promise<string> {
    const note = await prisma.note.create({
        data: { authorId: userId, text: "" },
        select: { id: true },
    });

    return note.id;
}
