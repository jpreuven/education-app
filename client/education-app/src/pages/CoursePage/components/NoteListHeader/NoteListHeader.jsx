import React from "react";
import arrowDropLogo from "../../../../assets/arrow_right_logo.svg";
import arrowRightLogo from "../../../../assets/arrow_drop_logo.svg";
import NewNoteButton from "./NewNoteButton/NewNoteButton";

export default function NoteListHeader({
  expandNoteList,
  handleNewNoteToggle,
  handleNoteListToggle,
}) {
  return (
    <div
      className={`course-page-assignment-and-notes-list-header ${
        expandNoteList
          ? "course-page-assignment-and-notes-list-header-expanded"
          : ""
      }`}
    >
      <div
        className="course-page-assignment-and-notes-list-inner-div"
        onClick={handleNoteListToggle}
      >
        <img src={expandNoteList ? arrowRightLogo : arrowDropLogo} />
        <h3>Notes</h3>
      </div>
      <NewNoteButton handleNewNoteToggle={handleNewNoteToggle} />
    </div>
  );
}
