import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUser } from "../../app/features/users/userSlice";
import { setAssignmentFormDropdown } from "../../app/features/assignmentFormDropdown/assignmentFormDropdownSlice";
import accountLogo from "../../assets/account-logo.svg";
import arrowRightLogo from "../../assets/arrow_right_logo.svg";
import arrowDropLogo from "../../assets/arrow_drop_logo.svg";
import addLogo from "../../assets/add_logo.svg";

import "./CoursePage.css";
import NoteFormModal from "./components/noteFormModal/NoteFormModal";

export default function Course() {
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDate, setAssignmentDate] = useState("");
  const [noteFormToggle, setNoteFormToggle] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [expandAssignmentList, setExpandAssignmentList] = useState(true);
  const [expandNoteList, setExpandNoteList] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.value);
  const assignmentFormDropdown = useSelector(
    (state) => state.assignmentFormDropdown.value
  );
  const {
    assignments,
    course_title,
    description,
    start_date,
    end_date,
    students,
    teacher_notes,
  } = userData.courses.filter((course) => {
    return course.course_id == id;
  })[0];

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
              title: data.title,
              due_date: data.due_date,
            });
          dispatch(setUser(new_user));
        });
      }
    });
  }
  function handleNewNote(e) {
    e.preventDefault();
    const obj = {
      teacher_id: userData.id,
      course_id: id,
      note_text: noteText,
    };
    fetch("http://localhost:5000/teachernotes", {
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
            .teacher_notes.push({
              note_id: data.note_id,
              teacher_id: data.teacher_id,
              course_id: id,
              note_text: data.note_text,
            });
          console.log(new_user);
          dispatch(setUser(new_user));
        });
      }
    });
  }
  function handleAssignmentListToggle() {
    setExpandAssignmentList(!expandAssignmentList);
  }
  function handleNoteListToggle() {
    setExpandNoteList(!expandNoteList);
  }
  function handleNewAssignmentButton() {
    dispatch(setAssignmentFormDropdown(!assignmentFormDropdown));
  }
  function handleNewNoteToggle() {
    setNoteFormToggle(!noteFormToggle);
  }

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
  const teacherNotesList = teacher_notes.map(({ note_text }, index) => {
    return (
      <div
        className={`course-page-list-item-div ${
          index == 0 ? "course-page-list-item-div-first-item" : ""
        }`}
        key={index}
      >
        <p style={{ font: "20px", fontWeight: "bold" }}>{note_text}</p>
      </div>
    );
  });

  return (
    <div className="course-page-outer-div">
      {/* Left side of page, assignment + notes lists */}
      <div>
        {/* Heading */}
        <header className="course-page-header">
          <h1>{course_title}</h1>
          <p>{description}</p>
          <p>
            Start Date: {start_date} - End Date: {end_date}
          </p>
        </header>
        {/* Assignment + notes lists */}
        <div className="course-page-assignment-and-notes-div">
          {/* Assignment List Header */}
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
              <img
                src={expandAssignmentList ? arrowDropLogo : arrowRightLogo}
              />
              <h3>Assignments</h3>
            </div>
            {/* Create new assignment button */}
            <button
              className="course-page-button"
              onClick={handleNewAssignmentButton}
            >
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
                  <div className="course-page-assignment-button-list-item">
                    Quiz
                  </div>
                  <div className="course-page-assignment-button-list-item">
                    Test
                  </div>
                </div>
              ) : null}
            </button>
          </div>
          {/* Assignment List */}
          <div
            className={`course-page-assignment-and-notes-list${
              expandAssignmentList ? "-expanded" : ""
            }`}
          >
            {assignmentList}
          </div>
        </div>
        {/* Note Header */}
        <div className="course-page-assignment-and-notes-div">
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
              <img src={expandNoteList ? arrowDropLogo : arrowRightLogo} />
              <h3>Notes</h3>
            </div>
            {/* Note Button */}
            <button
              className="course-page-button"
              onClick={handleNewNoteToggle}
            >
              <div className="course-page-assignment-and-notes-button-inner-div">
                <img src={addLogo} />
                Create
              </div>
            </button>
          </div>
          {/* Note List */}
          <div
            className={`course-page-assignment-and-notes-list${
              expandNoteList ? "-expanded" : ""
            }`}
          >
            {teacherNotesList}
          </div>
          {noteFormToggle ? (
            <NoteFormModal handleNewNoteToggle={handleNewNoteToggle} />
          ) : null}
        </div>
      </div>
      <div className="course-page-student-list-outer-div">
        <h3>Students:</h3>
        <div className="course-page-student-list-inner-div">
          {studentList}
          {studentList}
        </div>
      </div>
    </div>
  );
}
