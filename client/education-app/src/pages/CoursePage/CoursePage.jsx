import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUser } from "../../app/features/users/userSlice";
import io from "socket.io-client";

import "./CoursePage.css";
import NoteFormModal from "./components/noteFormModal/NoteFormModal";
import PageHeader from "./components/PageHeader/PageHeader";
import AssignmentListHeader from "./components/AssignmentListHeader/AssignmentListHeader";
import NoteListHeader from "./components/NoteListHeader/NoteListHeader";
import StudentList from "./components/StudentList/StudentList";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import GoogleLogoutButton from "../../components/GoogleLogoutButton/GoogleLogoutButton";
import { gapi } from "gapi-script";
import AssignmentList from "./components/AssignmentList/AssignmentList";
import NotesList from "./components/NotesList/NotesList";

const SCOPES = "https://www.googleapis.com/auth/drive";

const BackendURL = "http://localhost:5000";

export default function Course() {
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDate, setAssignmentDate] = useState("");
  const [expandAssignmentList, setExpandAssignmentList] = useState(true);
  const [noteFormToggle, setNoteFormToggle] = useState(true);
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

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: SCOPES,
      });
    }
    gapi.load("client:auth2", start);
  }, []);

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
      note_title: noteTitle,
      note_description: noteDescription,
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
              note_title: data.note_title,
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

  function handleNewNoteToggle() {
    setNoteFormToggle(!noteFormToggle);
  }

  // function createFile(e) {
  //   e.preventDefault();
  //   const obj = {
  //     teacher_id: userData.id,
  //     course_id: id,
  //     note_title: noteTitle,
  //   };
  //   const accessToken = gapi.auth.getToken().access_token;
  //   fetch("https://5380-76-91-21-90.ngrok-free.app/create-google-doc", {
  //     method: "POST",
  //     headers: new Headers({ Authorization: "Bearer " + accessToken }),
  //     body: JSON.stringify(obj),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }
  function fetchTitle(id) {
    const accessToken = gapi.auth.getToken().access_token;
    fetch(`https://docs.googleapis.com/v1/documents/${id}}`, {
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the fetched document data
        console.log(data);
        data["id"];
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  return (
    <div className="course-page-outer-div">
      {/* Left side of page, assignment + notes lists */}
      <div>
        <PageHeader
          course_title={course_title}
          description={description}
          start_date={start_date}
          end_date={end_date}
        />
        {/* Assignment + notes lists */}
        <div className="course-page-assignment-and-notes-div">
          <AssignmentListHeader
            expandAssignmentList={expandAssignmentList}
            handleAssignmentListToggle={handleAssignmentListToggle}
            assignmentFormDropdown={assignmentFormDropdown}
          />
          <AssignmentList
            assignments={assignments}
            expandAssignmentList={expandAssignmentList}
          />
        </div>
        {/* Note Header */}
        <div className="course-page-assignment-and-notes-div">
          <NoteListHeader
            expandNoteList={expandNoteList}
            handleNewNoteToggle={handleNewNoteToggle}
            handleNoteListToggle={handleNoteListToggle}
          />
          {/* Note List */}
          <NotesList
            teacher_notes={teacher_notes}
            expandNoteList={expandNoteList}
          />
          {noteFormToggle ? (
            <NoteFormModal
              handleNewNoteToggle={handleNewNoteToggle}
              course_id={id}
              userData={userData}
            />
          ) : null}
        </div>
        <div>
          <GoogleLoginButton />
          <GoogleLogoutButton />
          {/* <button onClick={() => createFile("testing")}>Testing</button> */}

          {/* <div>
            <h1>File Name Change Notifier</h1>
            <ul>
              {fileChanges.map((change, index) => (
                <li key={index}>
                  File ID: {change.file_id}, New Name: {change.new_name}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
      <StudentList students={students} />
    </div>
  );
}
