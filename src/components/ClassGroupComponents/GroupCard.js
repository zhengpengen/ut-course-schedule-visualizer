import React, { useState, useEffect } from "react";
import "./GroupCard.css";
import CourseCard from "../CourseCard/CourseCard";

const GroupCard = ({
  groupNumber,
  onDelete,
  onCountChange,
  groupCards,
  setGroupCards,
  unassigned_classes,
  setUnassignedClass,
  onDragOver,
  onDrop,
}) => {
  const [groupName, setGroupName] = useState(`Group ${groupNumber}`);
  const [isEditing, setIsEditing] = useState(false);
  const [classCount, setClassCount] = useState("");
  const [groupClasses, setGroupClasses] = useState([]);

  useEffect(() => {
    const group = groupCards.find((group) => group.id === groupNumber);
    if (group) {
      setGroupClasses(group.classes);
    }
  }, [groupCards, groupNumber]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupNameClick = () => {
    setIsEditing(true);
  };

  const handleGroupNameBlur = () => {
    setIsEditing(false);
    if (!groupName.trim()) {
      setGroupName(`Group ${groupNumber}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!value || isNaN(value)) {
      alert(`Please enter a number. '${value}' is not a number.`);
      setClassCount("");
    } else {
      setClassCount(value);
      onCountChange(value);
      console.log(
        `Group ${groupNumber} count updated to: ${value} inside of GroupCard`
      );
    }
  };

  const handleDragOver = (event) => {
    console.log("DRAGGED OVER!!");
    event.preventDefault();
  };

  // const handleDrop = (event) => {
  //   console.log("DROPPED");
  //   event.preventDefault();
  //   const course = JSON.parse(event.dataTransfer.getData("text/plain"));

  //   let index = groupCards.findIndex((item) => item.id === groupNumber);
  //   let u_classes = groupCards[index].classes;
  //   u_classes = [...u_classes, course];

  //   let u_cards = [...groupCards];
  //   u_cards[index].classes = u_classes;

  //   console.log("what is u_cards: ", u_cards);

  //   setGroupCards(u_cards);
  // };

  const handleDrop = (event) => {
    event.preventDefault();
    const course = JSON.parse(event.dataTransfer.getData("text/plain")); // Update groupClasses with the dropped course
    setGroupClasses([...groupClasses, course]); // Update the groupCards state with the updated classes
    const updatedGroupCards = groupCards.map((group) => {
      if (group.id === groupNumber) {
        return {
          ...group,
          classes: [...group.classes, course],
        };
      }
      return group;
    });
    setGroupCards(updatedGroupCards);
  };

  return (
    <div className="group-card" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="group-header" onClick={handleGroupNameClick}>
        {isEditing ? (
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
            onBlur={handleGroupNameBlur}
            autoFocus
            className="group-name-input"
          />
        ) : (
          <span
            className={
              groupName === `Group ${groupNumber}`
                ? "group-name italic"
                : "group-name bold"
            }
          >
            {groupName}
          </span>
        )}
      </div>
      <div className="group-body">
        {/* Render the CourseCards for the dropped courses */}
        {groupClasses.map((course, index) => (
          <CourseCard key={index} courses={course} />
        ))}
      </div>{" "}
      <div className="group-delete">
        <button onClick={onDelete} className="delete-btn">
          Delete Group
        </button>
      </div>
      <div className="group-footer">
        Number of Classes Considered:{" "}
        <input
          type="text"
          value={classCount}
          onChange={handleInputChange}
          className="class-count-input"
        />
      </div>
    </div>
  );
};

export default GroupCard;
