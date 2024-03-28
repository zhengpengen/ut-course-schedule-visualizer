import React from "react";
import "./DragAndDrop.css";
import AllClassesList from "../AllClassesList/AllClassesList";
import ClassGroup from "../ClassGroupComponents/ClassGroup";

const DragAndDrop = ({
  groupCards,
  setGroupCards,
  unassigned_classes,
  setUnassignedClass,
}) => {
  //   const onDrop = (ev, cat) => {
  //     let id = ev.dataTransfer.getData("id");

  //     let updatedGroupCards = groupCards.map((card) => {
  //       if (card.name === id) {
  //         return { ...card, category: cat };
  //       }
  //       return card;
  //     });

  //     setGroupCards(updatedGroupCards);
  //   };

  //   const renderCourseList = () => {
  //     const categorizedCourses = {
  //       unassigned: [],
  //       complete: [],
  //     };

  //     courseList.forEach((t) => {
  //       console.log("BITCH WHAT IS T: ", t);
  //       categorizedCourses[t.category].push(
  //         <div
  //           key={t.name}
  //           onDragStart={(e) => onDragStart(e, t.name)}
  //           draggable
  //           className="draggable"
  //           style={{ backgroundColor: t.bgcolor }}
  //         >
  //           {t.name}
  //         </div>
  //       );
  //     });

  //     return categorizedCourses;
  //   };

  // const { unassigned, complete } = renderCourseList();

  // const onDrop = (course, groupNumber) => {
  //   console.log("number? %d", groupNumber);
  //   let u_groupCards = [...groupCards];
  //   console.log("what is the fucking groupCards look like: ", u_groupCards[0]);
  //   let u_classes = u_groupCards[groupNumber].classes;
  //   console.log("are u sure its not iterable? u_classes: ", u_classes);

  //   if (u_classes.length === 0) {
  //     u_classes = [course];
  //   } else {
  //     u_classes = [...u_classes, course];
  //   }

  //   u_groupCards.classes = u_classes;
  //   // setGroupCards(u_groupCards);
  // };

  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="row">
      <div className="col-2">
        <AllClassesList
          unassigned_classes={unassigned_classes}
          setUnassignedClass={setUnassignedClass}
          onDragOver={onDragOver}
          // onDrop={onDrop}
        />
      </div>
      <div className="col-10">
        <ClassGroup
          groupCards={groupCards}
          setGroupCards={setGroupCards}
          unassigned_classes={unassigned_classes}
          setUnassignedClass={setUnassignedClass}
          onDragOver={onDragOver}
          // onDrop={onDrop}
        />
      </div>
    </div>
  );
};

export default DragAndDrop;

// return (
//   <div className="row">
//     <div className="col-2">
//       <AllClassesList />
//     </div>
//     <div className="col-10">
//       <ClassGroup
//         groupCards={groupCards}
//         setGroupCards={setGroupCards}
//         onDragStart={onDragStart}
//         onDragOver={onDragOver}
//         onDrop={onDrop}
//       />
//     </div>
//   </div>
// );
// }

// export default DragAndDrop;
