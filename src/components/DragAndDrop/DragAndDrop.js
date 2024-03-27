import React, { useState } from "react";
import ClassGroup from "../ClassGroupComponents/ClassGroup.js";
import AllClassesList from "../AllClassesList/AllClassesList.js";
import "./DragAndDrop.css";

const DragAndDrop = ( {groupCards, setGroupCards}) => {
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

// const draggables = document.querySelectorAll(".course-card");
  // const droppables = document.querySelectorAll(".group-card");

  // droppables.forEach((group) => {
  //   group.addEventListener("dragover", (e) => {
  //     e.preventDefault();
  //     const bottomClass = insertAboveClass(group, e.clientY);
  //     const curClass = document.querySelector(".is-dragging");
  //     if (!curClass) {
  //       group.appendChild(curClass);
  //     } else {
  //       group.insertBefore(curClass, bottomClass);
  //     }
  //   });
  // });

  // droppables.forEach((group) => {
  //   group.addEventListener("dragend", (e) => {
  //     e.preventDefault();
  //     const bottomClass = insertAboveClass(group, e.clientY);
  //     const curClass = document.querySelector(".is-dragging");

  //     if (!bottomClass) {
  //       group.appendChild(curClass);
  //     } else {
  //       group.insertBefore(curClass, bottomClass);
  //     }
  //   });
  // });

  // const insertAboveClass = (zone, mouseY) => {
  //   const els = zone.querySelectorAll(".course-card:not(.is-dragging)"); // Change ".task" to ".course-card"

  //   let closestTask = null;
  //   let closestOffset = Number.NEGATIVE_INFINITY;

  //   els.forEach((task) => {
  //     const { top } = task.getBoundingClientRect();
  //     const offset = mouseY - top;

  //     if (offset < 0 && offset > closestOffset) {
  //       closestOffset = offset;
  //       closestTask = task;
  //     }
  //   });

  //   return closestTask;
  // };
