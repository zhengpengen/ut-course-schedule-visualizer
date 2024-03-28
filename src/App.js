import './App.css';
import React, {useState} from 'react';
import ClassGroup from './components/ClassGroupComponents/ClassGroup';
import AllClassesList from './components/AllClassesList/AllClassesList'
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import ExampleData from "./ExampleData";
import Schedules from './Schedules';
import Help from './Help'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

function App() {
  const [groupCards, setGroupCards] = useState([]); // LIFTING STATE HERE SO WE CAN ACCESS THE GLOBAL ARRAY
  const [unassigned_classes, setUnassignedClass] = useState(ExampleData);

  return (
    <Router>
      <div className='container row'>
        <Switch>
          {/* the main page */}
          <Route exact path='/'>
            <DragAndDrop
              groupCards={groupCards}
              setGroupCards={setGroupCards}
              unassigned_classes={unassigned_classes}
              setUnassignedClass={setUnassignedClass}
            />
          </Route>
          {/* the schedules page */}
          <Route exact  path='/schedules'>
            <Schedules />
          </Route>
          {/* the help page */}
          <Route exact path='/help'>
            <Help />
          </Route>
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;
