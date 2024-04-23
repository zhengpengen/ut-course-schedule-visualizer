import "./App.css";
import React, { useState } from "react";
import ExampleData from "./ExampleData";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import GeneratedSchedulesPage from "./pages/GeneratedSchedulesPage/GeneratedSchedulesPage";
import GroupingPage from "./pages/GroupingPage/GroupingPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [groupCards, setGroupCards] = useState([]); // LIFTING STATE HERE SO WE CAN ACCESS THE GLOBAL ARRAY
  const [groupCounts, setGroupCounts] = useState({});
  const [groupNames, setGroupNames] = useState({});
  // const [unassignedClasses, setUnassignedClass] = useState([ExampleData]);
  const [unassignedClasses, setUnassignedClass] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [allSchedules, setAllSchedules] = useState({});

  const classInputChange = (e) => {
    // parses the input as a class + section copied from schedules website
    const value = e.target.value;
    console.log(value);
    const input = value.split(/\.-|\s/);

    const new_course = {};

    // parse course major, number, name
    let index = 0;
    console.log(input);
    if (input[1].length >= 3) {
      new_course["course_major"] = input[0];
      index += 1;
    } else {
      new_course["course_major"] = input[0] + " " + input[1];
      index += 2;
    }

    new_course["course_number"] = input[index];
    index += 1;

    let title = "";
    while (isNaN(parseInt(input[index])) || input[index].length < 5) {
      title += input[index] + " ";
      index += 1;
    }

    new_course["course_name"] = title.trim();
    new_course["sections"] = [];

    // iterate through each section

    section_loop: while (true) {
      console.log(input[index]);
      while (input[index] === "" || isNaN(parseInt(input[index]))) {
        //get to the beginning of the next section
        if (index >= input.length) {
          break section_loop;
        } else {
          index += 1;
        }
      }

      const section = { checked: true };

      // populate section id
      section["id"] = parseInt(input[index]);
      index += 1;
      section["time_and_locations"] = [];
      let date_count = 0; // number of diff tiem_and_location instances

      // reads all dates
      // console.log(index, input[index]);
      while (
        input[index] === input[index].toUpperCase() &&
        !input[index].includes(":")
      ) {
        if (input[index] === "") {
          index += 1;
          continue;
        }
        section["time_and_locations"].push({
          weekday: input[index]
            .match(/M|TH|W|T|F/g)
            .map((item) => (item === "TH" ? "Th" : item)),
        });
        date_count += 1;
        index += 1;
        // console.log(index, input[index]);
      }

      // get all start and end time
      for (let t = 0; t < date_count; t++) {
        if (input[index].includes(":")) {
          // check if there is a section time
          // start time
          var [hour, minute] = input[index].split(":");
          index += 1;
          if (input[index].includes("p.m")) {
            hour = (parseInt(hour) % 12) + 12 + "";
          }
          section["time_and_locations"][t]["start_time"] = hour + ":" + minute;
          index += 1;

          // end time
          [hour, minute] = input[index].split(":");
          index += 1;
          if (input[index].includes("p.m")) {
            hour = (parseInt(hour) % 12) + 12 + "";
          }
          section["time_and_locations"][t]["end_time"] = hour + ":" + minute;
          index += 1;
        } else {
          // no time, just put empty
          section["time_and_locations"][t]["start_time"] = "";
          section["time_and_locations"][t]["end_time"] = "";
        }
      }

      // get all location
      for (let t = 0; t < date_count; t++) {
        if (input[index] === input[index].toUpperCase()) {
          // check if there is a location
          section["time_and_locations"][t]["location"] =
            input[index] + " " + input[index + 1];
          index += 2;
        } else {
          // if not just put empty
          section["time_and_locations"][t]["location"] = "";
        }
      }

      // get to professors
      section["professor"] = [];

      while (
        input[index] !== input[index].toUpperCase() ||
        input[index] === ""
      ) {
        index += 1;
        if (index >= input.length) {
          // last section and no professor
          new_course["sections"].push(section);
          break section_loop;
        }
      }

      if (!input[index].includes(",") && !input[index+1].includes(",")) {
        // no professor, go to next section
        new_course["sections"].push(section);
        continue section_loop;
      }

      let professor_name = "";
      while (input[index] === input[index].toUpperCase()) {
        if (input[index].includes(",")) {
          // found a professor
          professor_name += input[index] + " " + input[index+1];
          section["professor"].push(professor_name.trim());
          professor_name = "";
          index += 2;
        } else {
          index += 1;
        }
      }
      // section["professor"].push(professor_name.trim());

      // push sections to general course
      new_course["sections"].push(section);
    }

    // add the course
    console.log(new_course);
    const newUnassigned = [...unassignedClasses];
    newUnassigned.push(new_course);
    setUnassignedClass(newUnassigned);
    console.log(newUnassigned);
  };

  return (
    <Router>
      {/* <div className="container row"> */}
      <Switch>
        {/* the main page */}
        <Route exact path="/ut-course-schedule-visualizer">
          <div className="main-page" style={{ backgroundColor: "white" }}>
            <GroupingPage
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
            <div className="row mt-3">
              {/* <div className="col-3">
                <div className="add-text">Add class</div>
              </div> */}
              <div className="class-paste col mb-5 mt-2">
                <input
                  type="text"
                  placeholder="Paste copied classes here"
                  value=""
                  onChange={classInputChange}
                  className="class-count-input"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </Route>

        {/* the schedules page*/}
        <Route exact path="/ut-course-schedule-visualizer/schedules">
          <GeneratedSchedulesPage allSchedules={allSchedules} />
        </Route>

        {/* the help page */}
        <Route exact path="/ut-course-schedule-visualizer/help">
          <HelpPage />
        </Route>
      </Switch>
      {/* </div> */}
    </Router>
  );
}

export default App;