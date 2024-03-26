import React, { useState, Component } from "react";
import ClassGroup from "../ClassGroupComponents/ClassGroup.js";
import AllClassesList from "../AllClassesList/AllClassesList.js";

class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allClassesList: [
        {
          classID: 1,
          className: "Math",
        },
        {
          classID: 2,
          className: "Science",
        },
        {
          classID: 3,
          className: "History",
        },
      ],
      classGroups: [],
      draggedClass: {},
    };
  }

  onDrag = (event, courseCard) => {
    event.preventDefault();
    this.setState({
      draggedClass: courseCard,
    });
  };

  onDropToClassGroup = () => {
    const { classGroups, draggedClass, allClassesList } = this.state;
    if (draggedClass.classID) {
      const updatedAllClassesList = allClassesList.filter(
        (course) => course.classID !== draggedClass.classID
      );
      this.setState({
        classGroups: [...classGroups, draggedClass],
        allClassesList: updatedAllClassesList,
        draggedClass: {},
      });
    }
  };

  onDropToDifferentClassGroup = () => {
    const { classGroups, draggedClass, allClassesList } = this.state;
    if (draggedClass.classID) {
      const updatedClassGroups = classGroups.filter(
        (course) => course.classID !== draggedClass.classID
      );
      this.setState({
        allClassesList: [...allClassesList, draggedClass],
        classGroups: updatedClassGroups,
        draggedClass: {},
      });
    }
  };

  render() {
    const { allClassesList, classGroups } = this.state;
    return (
      <div className="DragAndDrop">
        <ClassGroup
          classGroups={classGroups}
          onDrag={this.onDrag}
          onDropToDifferentClassGroup={this.onDropToDifferentClassGroup}
        />
        <AllClassesList
          allClasses={allClassesList}
          onDrag={this.onDrag}
          onDropToClassGroup={this.onDropToClassGroup}
        />
      </div>
    );
  }
}

export default DragAndDrop;
