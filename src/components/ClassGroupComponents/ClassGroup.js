import React, { useState, useRef, useEffect } from "react";
import GroupCard from "./GroupCard";
import AddCard from "./AddCard";
import HelpScreen from "./HelpScreen";
import "./ClassGroup.css";

const ClassGroup = ({ groupCards, setGroupCards }) => {
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

    setGroupCards([...groupCards, newGroup]); // appends groups
    setNextId(nextId + 1); // Increment the nextId for the next card
  };

  const deleteGroupCard = (id) => {
    setGroupCards(groupCards.filter((cardId) => cardId !== id));
    const newCounts = { ...groupCounts };
    delete newCounts[id];
    setGroupCounts(newCounts);
  };

  const updateGroupCount = (id, count) => {
    const newCounts = { ...groupCounts, [id]: count };
    setGroupCounts(newCounts);
    console.log(`Group ${id} count updated to: ${count}`);
    console.log("Current group counts:", newCounts);
  };

  useEffect(() => {
    console.log("groupCards course cards:", groupCards);
  }, [groupCards]); // Run this effect whenever groupCards changes [PRINTING GROUP CONTENT HERE but it's printing ID instead]

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
          {groupCards.map((id) => (
            <GroupCard
              key={id}
              groupNumber={id}
              onDelete={() => deleteGroupCard(id)}
              onCountChange={(count) => updateGroupCount(id, count)}
            />
          ))}
          <div onClick={addGroupCard} className="add-card-wrapper ms-auto">
            <AddCard />
          </div>
        </div>
        <div className="footer d-flex justify-content-center align-items-center">
          <button className="btn help-btn" onClick={toggleHelpScreen}>
            ?
          </button>
          <button className="btn generate-btn">Generate My Schedule</button>
        </div>
      </div>
      {showHelpScreen && (
        <div className="overlay" onClick={handleClickOutside}>
          <HelpScreen ref={helpScreenRef} />
        </div>
      )}
    </div>
  );
};

export default ClassGroup;
