import React, { useState, useRef, useEffect } from "react";
import GroupCard from "./GroupCard";
import AddCard from "./AddCard";
import HelpScreen from "./HelpScreen";
import { Link } from 'react-router-dom';
import "./ClassGroup.css";
import {Droppable} from "@hello-pangea/dnd"


const ClassGroup = ({
  groupCards,
  setGroupCards,
  unassignedClasses,
  setUnassignedClass
}) => {
  const [groupCounts, setGroupCounts] = useState({});
  const [nextId, setNextId] = useState(1);
  const [showHelpScreen, setShowHelpScreen] = useState(false);
  const helpScreenRef = useRef(null);

  const addGroupCard = () => {
    let newGroup = {
      // initializes a dictionary of classes
      id: nextId,
      classes: [],
    };

    setGroupCards([...groupCards, newGroup]); 
    setNextId(nextId + 1); // Increment the nextId for the next card
  };

  const deleteGroupCard = (id) => {
    setGroupCards(groupCards.filter((group) => group.id !== id));
    const newCounts = { ...groupCounts };
    delete newCounts[id];
    setGroupCounts(newCounts);
  };

  const updateGroupCount = (id, count) => {
    const newCounts = { ...groupCounts, [id]: count };
    setGroupCounts(newCounts);
    // console.log(`Group ${id} count updated to: ${count}`);
    // console.log("Current group counts:", newCounts);
  };

  const toggleHelpScreen = () => {
    setShowHelpScreen(!showHelpScreen);
  };

  const handleClickOutside = (event) => {
    if (
      helpScreenRef.current &&
      !helpScreenRef.current.contains(event.target)
    ) {
      setShowHelpScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`class-group ${showHelpScreen ? "blur" : ""}`}>
      <div className="content-wrapper">
        <div className="header rounded-top text-center bold">Class Groups</div>
        <div className="main-content d-flex align-items-center">
          {groupCards.map((groupCard, id) => (
            <GroupCard
              key={id}
              groupNumber={groupCard.id}
              onDelete={() => deleteGroupCard(groupCard.id)}
              onCountChange={(count) => updateGroupCount(id, count)}
              groupCards={groupCards}
              setGroupCards={setGroupCards}
              unassigned_classes={unassignedClasses}
              setUnassignedClass={setUnassignedClass}
            />
          ))}
          <div onClick={addGroupCard} className="add-card-wrapper ms-auto">
            <AddCard />
          </div>
        </div>
        <div className="footer d-flex justify-content-center align-items-center">
          <Link to='/ut-course-schedule-visualizer/help'>
            {/* <button className="btn help-btn" onClick={toggleHelpScreen}> */}
            <button className="btn help-btn">
              ?
            </button>
          </Link>
          <Link to='/ut-course-schedule-visualizer/schedules'>
            <button className="btn generate-btn">Generate My Schedule</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassGroup;
