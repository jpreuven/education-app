import React from "react";

export default function NotesList({ teacher_notes, expandNoteList }) {
  const teacherNotesList = teacher_notes.map(({ note_text }, index) => {
    return (
      <div
        className={`course-page-list-item-div ${
          index == 0 ? "course-page-list-item-div-first-item" : ""
        }`}
        key={index}
      >
        <p style={{ font: "20px", fontWeight: "bold" }}>{note_text}</p>
      </div>
    );
  });

  return (
    <div
      className={`course-page-assignment-and-notes-list${
        expandNoteList ? "-expanded" : ""
      }`}
    >
      {teacherNotesList}
    </div>
  );
}
