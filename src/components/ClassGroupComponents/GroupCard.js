import React, { useState, useEffect } from "react";
import "./GroupCard.css";
import CourseCard from "../CourseCard/CourseCard";
import {Droppable} from "react-beautiful-dnd";

const GroupCard = ({
  groupNumber,
  onDelete,
  onCountChange,
  groupCards,
  setGroupCards,
  unassigned_classes,
  setUnassignedClass
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

  return (
    <div className="group-card">
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
        <Droppable droppableId="droppable">
          {/* Render the CourseCards for the dropped courses */}
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {groupClasses.map((course, index) => (
                <CourseCard key={index} courses={course} />
              ))}
            </div>
          )}
        </Droppable>
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
