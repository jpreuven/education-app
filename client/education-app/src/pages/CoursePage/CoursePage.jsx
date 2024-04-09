import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUser } from "../../app/features/users/userSlice";
import accountLogo from "../../assets/account-logo.svg";
import arrowRightLogo from "../../assets/arrow_right_logo.svg";
import arrowDropLogo from "../../assets/arrow_drop_logo.svg";
import addLogo from "../../assets/add_logo.svg";

import "./CoursePage.css";

export default function Course() {
  const [assignmentFormToggle, setAssignmentFormToggle] = useState(true);
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
          className="course-page-list-item-div"
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: ".5em",
            borderTop: index == 0 ? "none" : "1px solid rgb(224, 224, 224)",
          }}
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
        className="course-page-list-item-div"
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: ".5em",
          borderTop: index == 0 ? "none" : "1px solid rgb(224, 224, 224)",
        }}
      >
        <p style={{ font: "20px", fontWeight: "bold" }}>{note_text}</p>
      </div>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "30px",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* Heading */}
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <h1>{course_title}</h1>
          <p>{description}</p>
          <p>
            Start Date: {start_date} - End Date: {end_date}
          </p>
        </div>
        {/* Assignment + notes lists */}
        <div
          style={{
            border: "2px solid rgb(224, 224, 224)",
            marginBottom: "10px",
          }}
        >
          {/* Assignment Header */}
          <div
            style={{
              borderBottom: expandAssignmentList
                ? "2px solid rgb(224, 224, 224)"
                : "none ",
              padding: "0.5em",
              backgroundColor: "#F5F5F5",
              display: "flex",
              justifyContent: "space-between",
              userSelect: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
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
              onClick={() => {
                setAssignmentFormToggle(!assignmentFormToggle);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "85px",
                }}
              >
                <img src={addLogo} />
                Create
              </div>
            </button>
            {/* {assignmentFormToggle ? (
              <div>
                <form onSubmit={handleNewAssignment}>
                  <label htmlFor="assignment-form-description">
                    Description
                  </label>
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
            ) : null} */}
          </div>
          {/* Assignment List */}
          <div
            style={{
              display: expandAssignmentList ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            {assignmentList}
          </div>
        </div>
        {/* Note Header */}
        <div
          style={{
            border: "2px solid rgb(224, 224, 224)",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              borderBottom: expandNoteList
                ? "2px solid rgb(224, 224, 224)"
                : "none ",
              padding: "0.5em",
              backgroundColor: "#F5F5F5",
              display: "flex",
              userSelect: "none",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", cursor: "pointer" }}
              onClick={handleNoteListToggle}
            >
              <img src={expandNoteList ? arrowDropLogo : arrowRightLogo} />
              <h3>Notes</h3>
            </div>
            {/* Note Button */}
            <button
              className="course-page-button"
              onClick={() => {
                setNoteFormToggle(!noteFormToggle);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "85px",
                }}
              >
                <img src={addLogo} />
                Create
              </div>
            </button>
          </div>
          {/* Note List */}
          <div
            style={{
              display: expandNoteList ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            {teacherNotesList}
          </div>
          {/* {noteFormToggle ? (
            <div>
              <form onSubmit={handleNewNote}>
                <label htmlFor="note-form-description">Description</label>
                <textarea
                  type="text"
                  id="note-form-description"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : null} */}
        </div>
      </div>
      <div
        style={{
          maxWidth: "300px",
          width: "100%",
          maxHeight: "400px",
        }}
      >
        <h3>Students:</h3>
        <div
          style={{
            height: "100%",
            border: "2px solid rgb(224, 224, 224)",
            overflow: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {studentList}
          {studentList}
        </div>
      </div>
    </div>
  );
}
