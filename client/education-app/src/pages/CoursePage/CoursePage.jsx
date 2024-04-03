import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Course() {
  const { id } = useParams();
  const userData = useSelector((state) => state.user.value);
  const {
    assignments,
    course_title,
    description,
    start_date,
    end_date,
    students,
  } = userData.courses.filter((course) => {
    return course.course_id == id;
  })[0];

  const studentList = students.map(
    ({ email, first_name, last_name }, index) => {
      return (
        <h3 key={index}>
          {first_name} {last_name}
        </h3>
      );
    }
  );

  const assignmentList = assignments.map(
    ({ description, title, due_date }, index) => {
      return (
        <div key={index}>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Due date: {due_date}</p>
        </div>
      );
    }
  );

  return (
    <div>
      <h1>{course_title}</h1>
      <p>{description}</p>
      <p>
        Start Date: {start_date} - End Date: {end_date}
      </p>
      <div>{studentList}</div>
      <div>Assignments here:</div>
      <div>{assignmentList}</div>
    </div>
  );
}
