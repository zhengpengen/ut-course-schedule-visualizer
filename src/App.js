import "./App.css";
import React, { useState } from "react";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import ExampleData from "./ExampleData";

function App() {
  const [groupCards, setGroupCards] = useState([]); // LIFTING STATE HERE SO WE CAN ACCESS THE GLOBAL ARRAY
  const [unassigned_classes, setUnassignedClass] = useState(ExampleData);

  return (
    <div className="container row">
      <DragAndDrop
        groupCards={groupCards}
        setGroupCards={setGroupCards}
        unassigned_classes={unassigned_classes}
        setUnassignedClass={setUnassignedClass}
      />
    </div>
  );
}

export default App;
