import React from "react";

export default function NotesList({ teacher_notes, expandNoteList }) {
  const teacherNotesList = teacher_notes.map(
    ({ title, description, google_id }, index) => {
      console.log(teacher_notes);
      return (
        <div
          className={`course-page-list-item-div ${
            index == 0 ? "course-page-list-item-div-first-item" : ""
          }`}
          key={index}
        >
          <a
            href={`https://docs.google.com/document/d/${google_id}/edit`}
            target="_blank"
            style={{ textDecoration: "none", color: "black" }}
          >
            <p style={{ font: "20px", fontWeight: "bold" }}>
              {title}{" "}
              <span style={{ font: "15px", fontWeight: "normal" }}>
                {description}
              </span>
            </p>
          </a>
        </div>
      );
    }
  );

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
