/* data format:
{
  course_major: string,
  course_number: string,
  course_name: string,
  sections: {
    id: int,
    professor: string[],
    time_and_locations:{
      weekday: string[],
      start_time: string,
      end_time: string,
      location: string
    } [],
    checked: bool
  } []np
}
*/

const ExampleData = [
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
        ],
        checked: true
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
        ],
        checked: true
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
        ], 
        checked: true
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
        ],
        checked: true
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
        ],
        checked: true
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
        ],
        checked: true
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
        ],
        checked: true
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
        ],
        checked: true
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
        ],
        checked: true
      }
    ]
  },
  {
    course_major: 'M ',
    course_number: '340L',
    course_name: 'Matrices And Matrix Calculatns',
    sections:[
      {
        id: 53910,
        professor: ['Koch, Hans A'],
        time_and_locations:[
          {
            weekday:['T','Th'],
            start_time:'12:30',
            end_time:'14:00',
            location:'PMA 4.102',
          }
        ],
        checked: true
      },
      {
        id: 53915,
        professor: [''],
        time_and_locations:[
          {
            weekday:['M','W','F'],
            start_time:'13:00',
            end_time:'14:00',
            location:'PHR 2.108',
          }
        ],
        checked: true
      },
      {
        id: 53920,
        professor: [''],
        time_and_locations:[
          {
            weekday:['T','Th'],
            start_time:'14:00',
            end_time:'15:30',
            location:'EER 1.510',
          }
        ],
        checked: true
      },
      {
        id: 53925,
        professor: [''],
        time_and_locations:[
          {
            weekday:['T','Th'],
            start_time:'15:30',
            end_time:'17:00',
            location:'EER 1.510',
          }
        ],
        checked: true
      },
    ]
  },
  {
    course_major: 'M ',
    course_number: '343K',
    course_name: 'Intro To Algebraic Structures',
    sections:[
      {
        id: 53965,
        professor: [''],
        time_and_locations:[
          {
            weekday:['M','W','F'],
            start_time:'13:00',
            end_time:'14:00',
            location:'PMA 5.116',
          }
        ],
        checked: true
      }
    ]
  },
  {
    course_major: 'M ',
    course_number: '361',
    course_name: 'Theory Of Func Of Complx Variable',
    sections:[
      {
        id: 54005,
        professor: ['Radin, Charles L'],
        time_and_locations:[
          {
            weekday:['T','Th'],
            start_time:'9:30',
            end_time:'11:00',
            location:'PMA 5.118',
          }
        ],
        checked: true
      }
    ]
  },
  {
    course_major: 'GOV',
    course_number: '310L',
    course_name: 'American Government-wb',
    sections:[
      {
        id: 37175,
        professor: ['O\'Brien, Shannon B'],
        time_and_locations:[
          {
            weekday:[''],
            start_time:'',
            end_time:'',
            location:'Internet',
          }
        ],
        checked: true
      }
    ]
  },
  {
    course_major: 'GOV',
    course_number: '312L',
    course_name: 'Iss & Policies In Amer Gove-WB',
    sections:[
      {
        id: 37180,
        professor: ['Brownlee, Jason M'],
        time_and_locations:[
          {
            weekday:[''],
            start_time:'',
            end_time:'',
            location:'Internet',
          }
        ],
        checked: true
      },
      {
        id: 37185,
        professor: ['Theriault, Sean M', 'Albertson, Bethany L'],
        time_and_locations:[
          {
            weekday:['M','W'],
            start_time:'14:30',
            end_time:'16:00',
            location:'Internet',
          }
        ],
        checked: true
      }
    ]
  },
  {
    course_major: 'MUS',
    course_number: '311G',
    course_name: 'German For Musicians',
    sections:[
      {
        id: 22265,
        professor: ['Morrow, Cynthia C'],
        time_and_locations:[
          {
            weekday:['M','W','F'],
            start_time:'11:00',
            end_time:'12:00',
            location:'MRH 4.116',
          }
        ],
        checked: true
      }
    ]
  }
];

export default ExampleData;