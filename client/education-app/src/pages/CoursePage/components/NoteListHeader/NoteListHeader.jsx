import React from "react";
import arrowDropLogo from "../../../../assets/arrow_right_logo.svg";
import arrowRightLogo from "../../../../assets/arrow_drop_logo.svg";
import NewNoteButton from "./NewNoteButton/NewNoteButton";

export default function NoteListHeader({
  expandNoteList,
  handleNewNoteToggle,
  handleNoteListToggle,
}) {
  async function getDocumentMetadata(documentId) {
    const accessToken = gapi.auth.getToken().access_token;
    const url = `https://docs.googleapis.com/v1/documents/${documentId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch document metadata");
      }

      const metadata = await response.json();
      return metadata;
    } catch (error) {
      console.error("Error fetching document metadata:", error);
      return null;
    }
  }
  function updateTitle() {
    const documentMetadata = getDocumentMetadata(
      "1zTcEIKxbzqiYjsrrLWV0vVtTe6uinmN3G77eZ2CMDB0"
    );
    console.log(documentMetadata);
    // Compare the current title with the title displayed in your web app
    // const currentTitle = document.getElementById("docTitle").textContent;
    // const newTitle = documentMetadata.title;
    // if (currentTitle !== newTitle) {
    // Update the title displayed in your web app
    // document.getElementById("docTitle").textContent = newTitle;
    // }
  }
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
      <div>
        <button onClick={updateTitle}>Refresh button</button>
        <NewNoteButton handleNewNoteToggle={handleNewNoteToggle} />
      </div>
    </div>
  );
}
