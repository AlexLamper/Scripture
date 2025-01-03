"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const supabase = createClient();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("notes").select();

    if (error) {
      console.error("Error fetching notes:", error.message);
    } else {
      setNotes(data);
    }
    setLoading(false);
  };

  const addNote = async () => {
    if (!newNote.title || !newNote.content) {
      alert("Title and content are required!");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }

    const { data, error } = await supabase
      .from("notes")
      .insert([{ title: newNote.title, content: newNote.content, user_id: user?.id }]);

    if (error) {
      console.error("Error adding note:", error.message);
    } else {
      console.log("Note added:", data);
      setNewNote({ title: "", content: "" });
      fetchNotes();
    }
  };

  const editNote = async (id: number, title: string, content: string) => {
    const { data, error } = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", id);

    if (error) {
      console.error("Error editing note:", error.message);
    } else {
      console.log("Note updated:", data);
      fetchNotes();
    }
  };

  const deleteNote = async (id: number) => {
    const { data, error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      console.error("Error deleting note:", error.message);
    } else {
      console.log("Note deleted:", data);
      fetchNotes();
    }
  };

  return (
    <div className="p-6 min-h-[100vh]">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>

      {/* Form to add a new note */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="border p-2 rounded-md mr-2"
        />
        <input
          type="text"
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="border p-2 rounded-md mr-2"
        />
        <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Note
        </button>
      </div>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes && notes.length > 0 ? (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li key={note.id} className="border p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="font-bold">{note.title}</p>
                <p>{note.content}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    editNote(note.id, prompt("New Title", note.title) || note.title, prompt("New Content", note.content) || note.content)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}
