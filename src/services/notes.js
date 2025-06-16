// Data Access Layer (DAL)
import "server-only";

export async function getNotes() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
}

export async function createNote(title, content) {
  const newNote = await Prisma.note.create({
    data: {
      title,
      content,
    },
  });
  return newNote;
}
