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
}) => {

  const onDragEnd = (result) => {
    if(!result.destination){
      return;
    }

    let new_list = [...unassigned_classes];
    let [removed] = new_list.splice(result.source.index, 1);
    new_list.splice(result.destination.index, 0, removed);
    setUnassignedClass(new_list);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="row">
        <div className="col-2">
          <AllClassesList
            unassigned_classes={unassigned_classes}
            setUnassignedClass={setUnassignedClass}
          />
        </div>
        <div className="col-10">
          <ClassGroup
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            unassigned_classes={unassigned_classes}
            setUnassignedClass={setUnassignedClass}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;
