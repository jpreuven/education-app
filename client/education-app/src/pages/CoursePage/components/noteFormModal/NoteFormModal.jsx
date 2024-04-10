import React, { useState } from "react";
import "./NoteFormModal.css";
import closeLogo from "../../../../assets/close_logo.svg";

export default function NoteFormModal({ handleNewNoteToggle }) {
  const [noteText, setNoteText] = useState("");
  function handleNewNoteToggleForModal(e) {
    if (e.target.className == "note-form-modal-outer-div") {
      handleNewNoteToggle();
    }
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
          value={noteText}
          placeholder="Untitled Document"
          onChange={(e) => setNoteText(e.target.value)}
        ></input>
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
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
