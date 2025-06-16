import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTodoAction } from "./action";
import { getNotes } from "@/services/notes";

export default async function Home() {
  const notes = await getNotes();

  return (
    <div>
      <form action={createTodoAction}>
        <Input name="title" />
        <Textarea name="content" />
        <Button>Create</Button>
      </form>
      <h3>My Notes</h3>
      <div>
        {notes.map((note) => {
          return <div key={note.id}>{note.title}</div>;
        })}
      </div>
    </div>
  );
}
