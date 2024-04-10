import React from "react";
import accountLogo from "../../../../assets/account-logo.svg";

export default function StudentList({ students }) {
  const studentList = students.map(
    ({ email, first_name, last_name }, index) => {
      return (
        <div
          key={index}
          style={{
            paddingBlock: ".65em",
            border: "1px solid rgb(224,224,224)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={accountLogo}
            style={{
              paddingRight: "15px",
            }}
          />
          <p>
            {first_name} {last_name}
          </p>
        </div>
      );
    }
  );
  return (
    <div className="course-page-student-list-outer-div">
      <h3>Students:</h3>
      <div className="course-page-student-list-inner-div">
        {studentList}
        {studentList}
      </div>
    </div>
  );
}
