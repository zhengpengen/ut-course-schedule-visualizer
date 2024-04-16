import React from "react";
import "./DragAndDrop.css";
import AllClassesList from "../AllClassesList/AllClassesList";
import ClassGroup from "../ClassGroupComponents/ClassGroup";
import { DragDropContext } from "@hello-pangea/dnd";
import Box from "@mui/material/Box";

const DragAndDrop = ({
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
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    //reordering within the list
    if (source.droppableId === destination.droppableId) {
      //reordering within the all-classes
      if (source.droppableId === "all-classes") {
        let new_list = [...unassignedClasses];
        let [removed] = new_list.splice(result.source.index, 1);
        new_list.splice(result.destination.index, 0, removed);
        setUnassignedClass(new_list);
      }
      //reordering within the groups
      else {
        let group_num = parseInt(destination.droppableId.slice(-1));
        let new_groupCards = [...groupCards];
        let group = groupCards.find((group) => group.id === group_num);

        //adding the new class to the group
        let new_classes = group.classes;
        let [removed] = new_classes.splice(source.index, 1);
        new_classes.splice(destination.index, 0, removed);
        group = new_groupCards.find((group) => group.id === group_num);
        group.classes = new_classes;
        setGroupCards(new_groupCards);
      }

      return;
    }

    let class_removed;

    //removing classes from the all classes list
    if (source.droppableId === "all-classes") {
      let new_list = [...unassignedClasses];
      [class_removed] = new_list.splice(source.index, 1);
      setUnassignedClass(new_list);
      // console.log("1 ", new_list);
    }
    //removing class from one of the groups
    else {
      let group_num = parseInt(source.droppableId.slice(-1));
      let new_groupCards = [...groupCards];
      let group = groupCards.find((group) => group.id === group_num);

      //updating the groupCards to remove the class from the group
      let new_classes = group.classes;
      [class_removed] = new_classes.splice(source.index, 1);
      group = new_groupCards.find((group) => group.id === group_num);
      group.classes = new_classes;
      setGroupCards(new_groupCards);
    }

    if (destination.droppableId === "all-classes") {
      let new_list = [...unassignedClasses];
      new_list.splice(destination.index, 0, class_removed);
      setUnassignedClass(new_list);
    } else {
      let group_num = parseInt(destination.droppableId.slice(-1));
      let new_groupCards = [...groupCards];
      let group = groupCards.find((group) => group.id === group_num);

      //adding the class to the newest group and updating groupCards
      let new_classes = group.classes;
      new_classes.splice(destination.index, 0, class_removed);
      group = new_groupCards.find((group) => group.id === group_num);
      group.classes = new_classes;
      setGroupCards(new_groupCards);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
        <Box gridColumn="span 3" height="100%">
          <AllClassesList
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            unassignedClasses={unassignedClasses}
            setUnassignedClass={setUnassignedClass}
          />
        </Box>
        <Box gridColumn="span 9" height="100%">
          <ClassGroup
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            unassignedClasses={unassignedClasses}
            setUnassignedClass={setUnassignedClass}
            groupCounts={groupCounts}
            setGroupCounts={setGroupCounts}
            groupNames={groupNames}
            setGroupNames={setGroupNames}
            nextId={nextId}
            setNextId={setNextId}
            allSchedules={allSchedules}
            setAllSchedules={setAllSchedules}
          />
        </Box>
      </Box>
    </DragDropContext>
  );
};

export default DragAndDrop;
