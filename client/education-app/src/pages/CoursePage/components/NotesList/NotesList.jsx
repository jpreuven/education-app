import React, { useState } from "react";
import { gapi } from "gapi-script";

export default function NotesList({ teacher_notes, expandNoteList }) {
  function updateNoteTitle(newTitle, title, note_id) {
    document.querySelector(`#course-page-title-${title}`).textContent =
      newTitle;
    fetch(`http://localhost:5000/teachernotes/${note_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function checkTitle(title, google_id, note_id) {
    const accessToken = gapi.auth.getToken().access_token;
    fetch(`https://docs.googleapis.com/v1/documents/${google_id}`, {
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.title !== title) {
          console.log("different!");
          updateNoteTitle(data.title, title, note_id);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  const teacherNotesList = teacher_notes.map(
    ({ title, description, google_id, note_id }, index) => {
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
            <p
              id={`course-page-title-${title}`}
              style={{ font: "20px", fontWeight: "bold" }}
            >
              {title}{" "}
              <span style={{ font: "15px", fontWeight: "normal" }}>
                {description}
              </span>
            </p>
          </a>
          <button onClick={() => checkTitle(title, google_id, note_id)}>
            Click me
          </button>
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
