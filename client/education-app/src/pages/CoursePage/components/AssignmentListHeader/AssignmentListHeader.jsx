import React from "react";
import arrowRightLogo from "../../../../assets/arrow_right_logo.svg";
import arrowDropLogo from "../../../../assets/arrow_drop_logo.svg";
import NewAssignmentButton from "./NewAssignmentButton/NewAssignmentButton";

export default function AssignmentListHeader({
  expandAssignmentList,
  handleAssignmentListToggle,
  assignmentFormDropdown,
}) {
  return (
    <div
      className={`course-page-assignment-and-notes-list-header ${
        expandAssignmentList
          ? "course-page-assignment-and-notes-list-header-expanded"
          : ""
      }`}
    >
      <div
        className="course-page-assignment-and-notes-list-inner-div"
        onClick={handleAssignmentListToggle}
      >
        <img src={expandAssignmentList ? arrowDropLogo : arrowRightLogo} />
        <h3>Assignments</h3>
      </div>
      {/* Create new assignment button */}
      <NewAssignmentButton assignmentFormDropdown={assignmentFormDropdown} />
    </div>
  );
}
