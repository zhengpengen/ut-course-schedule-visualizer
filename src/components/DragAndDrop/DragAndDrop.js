import React from "react";
import "./DragAndDrop.css";
import AllClassesList from "../AllClassesList/AllClassesList";
import ClassGroup from "../ClassGroupComponents/ClassGroup";
import { DragDropContext} from "@hello-pangea/dnd";

const DragAndDrop = ({
  groupCards,
  setGroupCards,
  unassignedClasses,
  setUnassignedClass
}) => {

  const handleDragEnd = (result) => {
    const {source, destination} = result;

    // console.log('woooo', source);
    // console.log('crying', destination);

    if(!destination){
      // console.log('fuck me');
      return;
    }

    //reordering within the list
    if(source.droppableId === destination.droppableId){

      //reordering within the all-classes
      if(source.droppableId === "all-classes"){
        let new_list = [...unassignedClasses];
        let [removed] = new_list.splice(result.source.index, 1);
        new_list.splice(result.destination.index, 0, removed);
        setUnassignedClass(new_list);
      }
      //reordering within the groups
      else{
        let group_num = parseInt(destination.droppableId.slice(-1));
        let new_groupCards = [...groupCards];
        let group = groupCards.find(group => group.id === group_num);

        //adding the new class to the group
        let new_classes = group.classes;
        let [removed] = new_classes.splice(source.index, 1);
        new_classes.splice(destination.index, 0, removed);
        group = new_groupCards.find(group => group.id === group_num);
        group.classes = new_classes;
        setGroupCards(new_groupCards);
      }

      return;
    }  
    
    let class_removed;

    //removing classes from the all classes list
    if(source.droppableId === "all-classes"){
      // console.log("removing from all classes");
      let new_list = [...unassignedClasses];
      [class_removed] = new_list.splice(source.index, 1);
      setUnassignedClass(new_list);
      console.log("1 ", new_list);
    }
    //removing class from one of the groups
    else{
      // console.log("removing from group: ", source.droppableId);
      let group_num = parseInt(source.droppableId.slice(-1));
      // console.log("number is: ", group_num);
      let new_groupCards = [...groupCards];
      let group = groupCards.find(group => group.id === group_num);

      //updating the groupCards to remove the class from the group
      let new_classes = group.classes;
      [class_removed] = new_classes.splice(source.index, 1);
      group = new_groupCards.find(group => group.id === group_num);
      group.classes = new_classes;
      setGroupCards(new_groupCards);
      // console.log("2 ", new_groupCards);
    }


    if(destination.droppableId === "all-classes"){
      // console.log("adding to all classes");
      let new_list = [...unassignedClasses];
      new_list.splice(destination.index, 0, class_removed);
      setUnassignedClass(new_list);
      // console.log("3 ", new_list);
    }
    else{
      // console.log("adding to a group: ", destination.droppableId);
      let group_num = parseInt(destination.droppableId.slice(-1));
      // console.log("lol number is: ", group_num);
      let new_groupCards = [...groupCards]
      // console.log(new_groupCards);
      let group = groupCards.find(group => group.id === group_num);

      //adding the class to the newest group and updating groupCards
      let new_classes = group.classes;
      new_classes.splice(destination.index, 0, class_removed);
      group = new_groupCards.find(group => group.id === group_num);
      group.classes = new_classes;
      setGroupCards(new_groupCards);
      // console.log("4 ", new_groupCards);
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="row">
        <div className="col-2">
          <AllClassesList
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            unassignedClasses={unassignedClasses}
            setUnassignedClass={setUnassignedClass}
          />
        </div>
        <div className="col-10">
          <ClassGroup
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            unassignedClasses={unassignedClasses}
            setUnassignedClass={setUnassignedClass}
          />
          
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;
