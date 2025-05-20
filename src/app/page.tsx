import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import AskAIButton from "@/components/assets/AskAIButton";
import NewNoteButton from "@/components/assets/NewNoteButton";
import NoteTextInput from "@/components/assets/NoteTextInput";
import FallbackUI from "@/components/handle-error-ui/FallbackUI";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  let note = null;

  try {
    note = await prisma.note.findUnique({
      where: {
        id: noteId,
        authorId: user?.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return <FallbackUI error={error} />;
    }
  }

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>
  );
}

export default HomePage;
