import { useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { currentDate } from "./utils";
import ReactQuill from "react-quill";
import Empty from "./Empty";
import FormattedDate from "./FormattedDate";
import "react-quill/dist/quill.snow.css";

function WriteBox({ edit }) {
  let { noteId } = useParams();
  noteId -= 1;
  const [notes, updateNote, deleteNote] = useOutletContext();
  let currentNote = { title: "", body: "", when: "" };
  if (noteId >= 0 && notes.length > noteId) {
    currentNote = notes[noteId];
  }
  const [noteBody, setNoteBody] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteWhen, setNoteWhen] = useState();
  const [id, setId] = useState("");

  useEffect(() => {
    setNoteBody(currentNote.body);
    setNoteTitle(currentNote.title);
    if (currentNote.when) {
      setNoteWhen(currentNote.when);
    } else {
      setNoteWhen(currentDate());
    }
    setId(currentNote.id);
  }, [currentNote]);

  const save = () => {
    updateNote(
      {
        body: noteBody,
        title: noteTitle,
        when: noteWhen,
        id: id,
      },
      noteId
    );
  };

  const tryDelete = () => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      deleteNote(noteId);
    }
  };

  return id ? (
    <>
      <header>
        <div id="note-info">
          {!edit ? (
            <>
              <h2 className="note-title">{noteTitle}</h2>
              <FormattedDate date={noteWhen} />
            </>
          ) : (
            <>
              <input
                className="note-title"
                value={noteTitle}
                onChange={(event) => setNoteTitle(event.target.value)}
                autoFocus
              />
              <input
                type="datetime-local"
                value={noteWhen ? noteWhen : currentDate()}
                onChange={(event) => setNoteWhen(event.target.value)}
              />
            </>
          )}
        </div>
        <div id="note-controls">
          {!edit ? (
            <>
              <Link
                className="button"
                id="edit-button"
                to={`/notes/${noteId + 1}/edit`}
              >
                Edit
              </Link>
              <Link
                className="button"
                id="delete-button"
                to=""
                onClick={tryDelete}
              >
                Delete
              </Link>
            </>
          ) : (
            <>
              <Link className="button" id="save-button" to="" onClick={save}>
                Save
              </Link>
              <Link
                className="button"
                id="delete-button"
                to=""
                onClick={tryDelete}
              >
                Delete
              </Link>
            </>
          )}
        </div>
      </header>
      {!edit ? (
        <div id="note-content" dangerouslySetInnerHTML={{ __html: noteBody }} />
      ) : (
        <ReactQuill
          placeholder="Your Note Here"
          theme="snow"
          value={noteBody}
          onChange={setNoteBody}
        />
      )}
    </>
  ) : (
    <Empty />
  );
}

export default WriteBox;
