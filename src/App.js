import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import React, {useState} from 'react';

const selected_courses = [
  {
    course_major: 'C S',
    course_number: '331',
    course_name: 'Algorithms And Complexity',
    sections:[
      {
        id: 50395,
        professor: ['Plaxton, C Greg'],
        time_and_locations:[
          {
            weekday:['M','W','F'],
            start_time:'10:00',
            end_time:'11:00',
            location:'RLP 0.128',
          },
          {
            weekday:['M'],
            start_time:'13:00',
            end_time:'14:00',
            location:'GAR 3.116',
          }
        ]
      },
      {
        id: 50400,
        professor: ['Plaxton, C Greg'],
        time_and_locations:[
          {
            weekday:['M','W','F'],
            start_time:'10:00',
            end_time:'11:00',
            location:'RLP 0.128',
          },
          {
            weekday:['M'],
            start_time:'14:00',
            end_time:'15:00',
            location:'SZB 3.508',
          }
        ]
      },
      {
        id: 50405,
        professor: ['Moshkovitz Aaronson, Dana'],
        time_and_locations:[
          {
            weekday:['T','Th'],
            start_time:'12:30',
            end_time:'14:00',
            location:'GDC 1.304',
          },
          {
            weekday:['F'],
            start_time:'10:00',
            end_time:'11:00',
            location:'UTC 1.116',
          }
        ]
      },
      {
        id: 50410,
        professor: ['Moshkovitz Aaronson, Dana'],
        time_and_locations:[
          {
            weekday:['T','Th'],
            start_time:'12:30',
            end_time:'14:00',
            location:'GDC 1.304',
          },
          {
            weekday:['F'],
            start_time:'13:00',
            end_time:'14:00',
            location:'SZB 3.508',
          }
        ]
      },
      {
        id: 50415,
        professor: ['Tian, Kevin'],
        time_and_locations:[
          {
            weekday:['M','W'],
            start_time:'14:00',
            end_time:'15:30',
            location:'GDC 1.304',
          },
          {
            weekday:['F'],
            start_time:'12:00',
            end_time:'13:00',
            location:'CBA 4.330',
          }
        ]
      },
      {
        id: 50420,
        professor: ['Tian, Kevin'],
        time_and_locations:[
          {
            weekday:['M','W'],
            start_time:'14:00',
            end_time:'15:30',
            location:'GDC 1.304',
          },
          {
            weekday:['F'],
            start_time:'13:00',
            end_time:'14:00',
            location:'CBA 4.344',
          }
        ]
      },
    ]
  },
  {
    course_major: 'C S',
    course_number: '346',
    course_name: 'Cryptography',
    sections:[
      {
        id: 50505,
        professor: ['Wu, David Junzi'],
        time_and_locations:[
          {
            weekday:['M','F'],
            start_time:'14:00',
            end_time:'15:30',
            location:'GDC 4.302',
          }
        ]
      }
    ]
  },
  {
    course_major: 'C S',
    course_number: '347',
    course_name: 'Data Management',
    sections:[
      {
        id: 50510,
        professor: ['Tang, Dixin'],
        time_and_locations:[
          {
            weekday:['T','Th'],
            start_time:'14:00',
            end_time:'15:30',
            location:'RLP 0.112',
          }
        ]
      }
    ]
  },{
    course_major: 'C S',
    course_number: '375',
    course_name: 'Compilers',
    sections:[
      {
        id: 50625,
        professor: ['Novak, Gordon S Jr'],
        time_and_locations:[
          {
            weekday:['T','Th'],
            start_time:'12:30',
            end_time:'14:00',
            location:'GDC 5.302',
          }
        ]
      }
    ]
  },
];


function App() {
  return (
    <div className='container'>
      good morning bois
    </div>
  );
}

export default App;
