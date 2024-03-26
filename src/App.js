import './App.css';
import React, {useState} from 'react';
import ClassGroup from './components/ClassGroupComponents/ClassGroup';
import AllClassesList from './components/AllClassesList/AllClassesList'

function App() {
  return (
    <div className='container'>
      good morning bois
      <ClassGroup />
      <AllClassesList />
    </div>
  );
}

export default App;
