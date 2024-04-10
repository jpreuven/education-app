import React from "react";
import addLogo from "../../../../../assets/add_logo.svg";
import { setAssignmentFormDropdown } from "../../../../../app/features/assignmentFormDropdown/assignmentFormDropdownSlice";
import { useDispatch } from "react-redux";
import "./NewAssignmentButton.css";

export default function NewAssignmentButton({ assignmentFormDropdown }) {
  const dispatch = useDispatch();
  function handleNewAssignmentButton() {
    dispatch(setAssignmentFormDropdown(!assignmentFormDropdown));
  }
  return (
    <button className="course-page-button" onClick={handleNewAssignmentButton}>
      <div className="course-page-assignment-and-notes-button-inner-div">
        <img src={addLogo} />
        <p>Create</p>
      </div>
      {/* Assignment list dropdown */}
      {assignmentFormDropdown ? (
        <div className="course-page-assignment-button-list">
          <div className="course-page-assignment-button-list-item">
            Classwork
          </div>
          <div className="course-page-assignment-button-list-item">
            Homework
          </div>
          <div className="course-page-assignment-button-list-item">Quiz</div>
          <div className="course-page-assignment-button-list-item">Test</div>
        </div>
      ) : null}
    </button>
  );
}
