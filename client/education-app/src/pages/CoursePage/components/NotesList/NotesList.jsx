import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { setUser } from "../../../../app/features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NotesList({ expandNoteList }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.value);
  const teacher_notes = userData.teacher_notes;

  useEffect(() => {
    const interval = setInterval(() => {
      teacher_notes.forEach(({ title, google_id, note_id }) => {
        checkTitle(title, google_id, note_id);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [teacher_notes]);

  function updateNoteTitle(newTitle, note_id) {
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
      .then((data) => {
        const newUser = JSON.parse(JSON.stringify(userData));
        const newTeacherNotes = newUser.teacher_notes;
        const indexOfNoteToUpdate = newTeacherNotes.findIndex(
          (note) => note.note_id === data.note_id
        );
        console.log(indexOfNoteToUpdate);
        if (indexOfNoteToUpdate !== -1) {
          newTeacherNotes[indexOfNoteToUpdate].title = data.title;
        } else {
          console.log("not working");
        }
        newUser.teacher_notes = newTeacherNotes;
        dispatch(setUser(newUser));
      })
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
          updateNoteTitle(data.title, note_id);
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
          {/* <button onClick={() => checkTitle(title, google_id, note_id)}>
            Click me
          </button> */}
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
