import React, { useState } from 'react';
import GroupCard from './GroupCard';
import AddCard from './AddCard';
import './ClassGroup.css';

const ClassGroup = () => {
  const [groupCards, setGroupCards] = useState([]);

  const addGroupCard = () => {
    const newId = groupCards.length + 1;
    setGroupCards([...groupCards, newId]);
  };

  return (
    <div className="class-group">
      <div className="header rounded-top text-center bold">Class Groups</div>
      <div className="main-content d-flex align-items-center">
        {groupCards.map(id => (
          <GroupCard key={id} groupNumber={id} />
        ))}
        <div onClick={addGroupCard} className="add-card-wrapper ms-auto">
          <AddCard />
        </div>
      </div>
      <div className="footer d-flex justify-content-center align-items-center mt-2">
        <button className="btn generate-btn">Generate My Schedule</button>
        <button className="btn help-btn position-absolute">?</button>
      </div>
    </div>
  );
};

export default ClassGroup;
