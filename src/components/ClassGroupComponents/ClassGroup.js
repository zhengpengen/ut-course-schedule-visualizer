import React, { useState, useRef, useEffect } from "react";
import GroupCard from "./GroupCard";
import AddCard from "./AddCard";
import { Link } from "react-router-dom";
import "./ClassGroup.css";
import { schedule_generator } from "../scheduleGenerator/scheduleGenerator.js";

const ClassGroup = ({
  groupCards,
  setGroupCards,

  unassignedClasses,
  setUnassignedClass,

  groupCounts,
  setGroupCounts,

  groupNames,
  setGroupNames,

  nextId,
  setNextId,

  allSchedules,
  setAllSchedules,
}) => {
  const [showHelpScreen, setShowHelpScreen] = useState(false);
  const helpScreenRef = useRef(null);

  const updateGroupCount = (id, count) => {
    const newCounts = { ...groupCounts, [id]: count };
    setGroupCounts(newCounts);
  };

  const updateGroupNames = (id, name) => {
    const newNames = { ...groupNames, [id]: name };
    console.log(newNames);
    setGroupNames(newNames);
  };

  const addGroupCard = () => {
    updateGroupNames(nextId, `Group ${nextId}`);
    updateGroupCount(nextId, 0);
    let newGroup = {
      // initializes a dictionary of classes
      id: nextId,
      classes: [],
    };

    setGroupCards([...groupCards, newGroup]);

    setNextId(nextId + 1); // Increment the nextId for the next card
  };

  const deleteGroupCard = (id) => {
    //add the cards from the deleted group to the unassigned classes
    let group = groupCards.find((group) => group.id === id);
    let reassign = group.classes;
    let new_unassigned = [...unassignedClasses, ...reassign];

    //update the groups
    setGroupCards(groupCards.filter((group) => group.id !== id));
    setUnassignedClass(new_unassigned);
    const newCounts = { ...groupCounts };
    delete newCounts[id];
    setGroupCounts(newCounts);
    const newNames = { ...groupNames };
    delete newNames[id];
    setGroupNames(newNames);

    console.log(newCounts);
    console.log(newNames);
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

  const handleGenSchedule = () => {
    const adjustedGroupCards = [];
    const adjustedGroupCounts = {};
    for (let group = 0; group < groupCards.length; group++) {
      if (groupCards[group].classes.length === 0) continue; // no class in this group
      if (groupCounts[groupCards[group].id] <= 0) continue; // no class to be added for this group
      adjustedGroupCards.push(groupCards[group]);
      adjustedGroupCounts[groupCards[group].id] = Math.min(
        groupCounts[groupCards[group].id],
        groupCards[group].classes.length
      );
    }
    setAllSchedules(
      schedule_generator(adjustedGroupCards, adjustedGroupCounts)
    ); // Call the schedule_generator function
  };

  return (
    <div className={`class-group ${showHelpScreen ? "blur" : ""}`}>
      <div className="content-wrapper">
        <div className="component-title">Class Groups</div>
        <div className="main-content d-flex align-items-center">
          {groupCards.map((groupCard, id) => (
            <GroupCard
              key={id}
              groupNumber={groupCard.id}
              onDelete={() => deleteGroupCard(groupCard.id)}
              courseCount={groupCounts[groupCard.id]}
              changeCount={(count) => updateGroupCount(groupCard.id, count)}
              groupNames={groupNames}
              setGroupName={(name) => updateGroupNames(groupCard.id, name)}
              groupCards={groupCards}
              setGroupCards={setGroupCards}
              unassignedClasses={unassignedClasses}
              setUnassignedClass={setUnassignedClass}
            />
          ))}
          <div onClick={addGroupCard} className="add-card-wrapper ms-auto">
            <AddCard />
          </div>
        </div>
        <div className="footer">
          <Link to="/ut-course-schedule-visualizer/schedules">
            <button className="btn generate-btn" onClick={handleGenSchedule}>
              Generate My Schedule
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassGroup;
