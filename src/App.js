import React, { Component } from "react";
import "./App.css";

export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
      { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
      { name: "React", category: "wip", bgcolor: "pink" },
      { name: "Vue", category: "complete", bgcolor: "skyblue" },
    ],
  };

  onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };

  render() {
    var tasks = {
      wip: [],
      complete: [],
    };

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });

    return (
      <div className="container-drag">
        <h2 className="header">DRAG & DROP DEMO</h2>
        <div className="row">
          <div
            className="wip col"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, "wip");
            }}
          >
            <span className="task-header">WIP</span>
            {tasks.wip}
          </div>
          <div
            className="droppable col"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, "complete")}
          >
            <span className="task-header">COMPLETED</span>
            {tasks.complete}
          </div>
        </div>
      </div>
    );
  }
}

// import "./App.css";
// import React, { useState } from "react";
// import DragAndDrop from "./components/DragAndDrop/DragAndDrop";

// function App() {
//   const [groupCards, setGroupCards] = useState([]); // LIFTING STATE HERE SO WE CAN ACCESS THE GLOBAL ARRAY BUT IT SHOULD BE INITIALIZED IN APP!

//   return (
//     <div className="container row">
//       {/* good morning bois */}
//       {/* <DragAndDrop groupCards={groupCards} setGroupCards={setGroupCards} /> */}
//       <div className="col container box">idji</div>
//       <div className="col container box">kshdbjh</div>
//     </div>
//   );
// }

// export default App;
