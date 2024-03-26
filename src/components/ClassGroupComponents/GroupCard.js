import React, { useState } from 'react';
import './GroupCard.css';

const GroupCard = ({ groupNumber }) => {
    const [groupName, setGroupName] = useState(`Group ${groupNumber}`);
    const [isEditing, setIsEditing] = useState(false);
    const [classCount, setClassCount] = useState('');

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
            setClassCount('');
        } else {
        setClassCount(value);
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
          <span className={groupName === `Group ${groupNumber}` ? 'group-name italic' : 'group-name bold'}>{groupName}</span>
        )}
        </div>
      <div className="group-body">
        {/* CourseCards will be dropped here */}
      </div>
      <div className="group-footer">
        Number of Classes Considered: <input type="text" value={classCount} onChange={handleInputChange} className="class-count-input" />
      </div>
    </div>
  );
};

export default GroupCard;
