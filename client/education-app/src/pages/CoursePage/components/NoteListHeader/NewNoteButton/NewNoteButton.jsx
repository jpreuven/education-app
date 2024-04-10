import React from "react";
import addLogo from "../../../../../assets/add_logo.svg";

export default function NewNoteButton({ handleNewNoteToggle }) {
  return (
    <button className="course-page-button" onClick={handleNewNoteToggle}>
      <div className="course-page-assignment-and-notes-button-inner-div">
        <img src={addLogo} />
        Create
      </div>
    </button>
  );
}
