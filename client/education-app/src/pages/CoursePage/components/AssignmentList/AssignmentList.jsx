import React from "react";

export default function AssignmentList({ assignments, expandAssignmentList }) {
  const assignmentList = assignments.map(
    ({ description, title, due_date }, index) => {
      return (
        <div
          className={`course-page-list-item-div ${
            index == 0 ? "course-page-list-item-div-first-item" : ""
          }`}
          key={index}
        >
          <p style={{ font: "20px", fontWeight: "bold" }}>{title}</p>
          <p style={{ font: "12px" }}>{due_date}</p>
        </div>
      );
    }
  );
  return (
    <div
      className={`course-page-assignment-and-notes-list${
        expandAssignmentList ? "-expanded" : ""
      }`}
    >
      {assignmentList}
    </div>
  );
}
