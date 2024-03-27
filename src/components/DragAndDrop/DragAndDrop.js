import React, { useState } from "react";
import ClassGroup from "../ClassGroupComponents/ClassGroup.js";
import AllClassesList from "../AllClassesList/AllClassesList.js";
import "./DragAndDrop.css";

const DragAndDrop = () => {
  const [groupCards, setGroupCards] = useState([]);

  // const draggables = document.querySelectorAll(".course-card");
  // const droppables = document.querySelectorAll(".group-card");

  // draggables.forEach((course) => {
  //   course.addEventListener("dragstart", () => {
  //     course.classList.add("is-dragging");
  //     console.log("courseName is ", groupCards.map());
  //   });
  //   course.addEventListener("dragend", () => {
  //     course.classList.remove("is-dragging");
  //   });
  // });

  // droppables.forEach((group) => {
  //   group.addEventListener("dragend", (e) => {
  //     e.preventDefault();
  //     const belowCourse = insertAboveTask(group, e.clientY);
  //   });
  // });

  return (
    <div className="row">
      <div className="col-2">
        <AllClassesList />
      </div>
      <div className="col-10">
        <ClassGroup groupCards={groupCards} setGroupCards={setGroupCards} />
      </div>
    </div>
  );
};

export default DragAndDrop;
