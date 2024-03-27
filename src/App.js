import './App.css';
import React, {useState} from 'react';
import Schedules from './Schedules';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <h1>this is the main page where you drag and drop classes</h1>
            <Link to='/schedules'>jump to schedules page</Link>
          </Route>
          <Route path='/schedules'>
            <Schedules />
          </Route>
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;
