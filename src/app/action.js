"use server";

import { createNote } from "@/services/notes";
import { revalidatePath } from "next/cache";

export async function createTodoAction(formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  await createNote(title, content);
  revalidatePath("/");
}
