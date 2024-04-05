import React from "react";
import "./DragAndDrop.css";
import AllClassesList from "../AllClassesList/AllClassesList";
import ClassGroup from "../ClassGroupComponents/ClassGroup";
import { DragDropContext } from "@hello-pangea/dnd";

const DragAndDrop = ({
  groupCards,
  setGroupCards,
  unassigned_classes,
  setUnassignedClass,
  allClasses,
  setAllClasses
}) => {

  const handleDragEnd = (result) => {
    console.log('woooo', result.destination);

    if(!result.destination){
      console.log('fuck me');
      return;
    }

    //reordering within the list
    let new_list = [...unassigned_classes];
    let [removed] = new_list.splice(result.source.index, 1);
    new_list.splice(result.destination.index, 0, removed);
    setUnassignedClass(new_list);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="row">
        <div className="col-2">
          <AllClassesList
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            unassigned_classes={unassigned_classes}
            setUnassignedClass={setUnassignedClass}
            allClasses={allClasses}
            setAllClasses={setAllClasses}
          />
        </div>
        <div className="col-10">
          <ClassGroup
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            unassigned_classes={unassigned_classes}
            setUnassignedClass={setUnassignedClass}
            allClasses={allClasses}
            setAllClasses={setAllClasses}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;
