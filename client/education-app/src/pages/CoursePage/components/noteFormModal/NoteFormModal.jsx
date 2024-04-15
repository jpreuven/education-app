import React, { useState } from "react";
import "./NoteFormModal.css";
import closeLogo from "../../../../assets/close_logo.svg";
import { setUser } from "../../../../app/features/users/userSlice";
import { useDispatch } from "react-redux";

export default function NoteFormModal({
  handleNewNoteToggle,
  userData,
  course_id,
}) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const dispatch = useDispatch();
  function handleNewNoteToggleForModal(e) {
    if (e.target.className == "note-form-modal-outer-div") {
      handleNewNoteToggle();
    }
  }

  function createFile(e) {
    console.log("Creating");
    e.preventDefault();
    const obj = {
      teacher_id: userData.id,
      course_id: course_id,
      note_title: noteTitle,
      note_description: noteDescription,
    };
    const accessToken = gapi.auth.getToken().access_token;
    fetch("https://5380-76-91-21-90.ngrok-free.app/create-google-doc", {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(obj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const new_user = JSON.parse(JSON.stringify(userData));
        new_user.courses
          .filter((course) => {
            return course.course_id == course_id;
          })[0]
          .teacher_notes.push({
            note_id: data.note_id,
            teacher_id: data.teacher_id,
            course_id: course_id,
            note_title: data.note_title,
          });
        dispatch(setUser(new_user));
      });
  }

  return (
    <div
      className="note-form-modal-outer-div"
      onClick={handleNewNoteToggleForModal}
    >
      <div className="note-form-modal-inner-div">
        <header className="note-form-modal-header">
          <p>Create a New Set of Notes</p>
          <div className="note-form-modal-cancel" onClick={handleNewNoteToggle}>
            <img src={closeLogo} />
          </div>
        </header>
        <input
          id="note-form-title-input"
          className="note-form-input"
          value={noteTitle}
          placeholder="Untitled Document"
          onChange={(e) => setNoteTitle(e.target.value)}
        ></input>
        <textarea
          id="note-form-description-input"
          className="note-form-input"
          value={noteDescription}
          placeholder="Description (optional)"
          onChange={(e) => setNoteDescription(e.target.value)}
          rows="5"
        ></textarea>

        <div className="note-form-bottom-buttons-div">
          <button
            className="note-form-bottom-buttons"
            id="note-form-bottom-cancel-button"
            onClick={handleNewNoteToggle}
          >
            Cancel
          </button>
          <button
            className="note-form-bottom-buttons"
            id="note-form-bottom-submit-button"
            type="submit"
            onClick={createFile}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
