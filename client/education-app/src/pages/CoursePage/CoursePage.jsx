import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUser } from "../../app/features/users/userSlice";

export default function Course() {
  const [assignmentFormToggle, setAssignmentFormToggle] = useState(true);
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDate, setAssignmentDate] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
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

  function handleNewAssignment(e) {
    e.preventDefault();
    const obj = {
      description: assignmentDescription,
      title: assignmentTitle,
      due_date: assignmentDate,
      course_id: id,
    };
    fetch("http://localhost:5000/assignments", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          const new_user = JSON.parse(JSON.stringify(userData));
          new_user.courses
            .filter((course) => {
              return course.course_id == id;
            })[0]
            .assignments.push({
              assignment_id: data.assignment_id,
              course_id: id,
              description: data.description,
              description: data.title,
              due_date: data.due_date,
            });
          dispatch(setUser(new_user));
        });
      }
    });
  }

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
      <button
        onClick={() => {
          setAssignmentFormToggle(!assignmentFormToggle);
        }}
      >
        Make a new assignment
      </button>
      {assignmentFormToggle ? (
        <div>
          {" "}
          <form onSubmit={handleNewAssignment}>
            <label htmlFor="assignment-form-description">Description</label>
            <input
              type="text"
              id="assignment-form-description"
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
            ></input>
            <label htmlFor="assignment-form-title">Title</label>
            <input
              type="text"
              id="assignment-form-title"
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
            ></input>
            <label htmlFor="assignment-form-date">Due Date</label>
            <input
              type="date"
              id="assignment-form-date"
              value={assignmentDate}
              onChange={(e) => setAssignmentDate(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
