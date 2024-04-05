import './App.css';
import React, {useState} from 'react';
import ClassGroup from './components/ClassGroupComponents/ClassGroup';
import AllClassesList from './components/AllClassesList/AllClassesList'
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import ExampleData from "./ExampleData";
import Schedules from './Schedules';
import Help from './Help'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import GeneratedSchedules from './components/SchedulePageComponents/GeneratedSchedules';

function App() {
  const [groupCards, setGroupCards] = useState([]); // LIFTING STATE HERE SO WE CAN ACCESS THE GLOBAL ARRAY
  const [unassigned_classes, setUnassignedClass] = useState(ExampleData);
  const [allClasses, setAllClasses] = useState([...unassigned_classes, ...groupCards]);

  return (
    <Router>
      <div className='container row'>
        <Switch>
          {/* the main page */}
          <Route exact path='/ut-course-schedule-visualizer'>
            <DragAndDrop
              groupCards={groupCards}
              setGroupCards={setGroupCards}
              unassigned_classes={unassigned_classes}
              setUnassignedClass={setUnassignedClass}
              allClasses={allClasses}
              setAllClasses={setAllClasses}
            />
          </Route>
          {/* the schedules page
          <GeneratedSchedules /> */}
          <Route exact path='/ut-course-schedule-visualizer/schedules'>
            <GeneratedSchedules />
          </Route>
          {/* the help page */}
          <Route exact path='/ut-course-schedule-visualizer/help'>
            <Help />
          </Route>
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;
