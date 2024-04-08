// import ExampleData from "../../ExampleData";

import { computeHeadingLevel } from "@testing-library/react";

// function schedule_generator() {
//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//   const times = [
//     "8:00",
//     "9:00",
//     "10:00",
//     "11:00",
//     "12:00",
//     "13:00",
//     "14:00",
//     "15:00",
//     "16:00",
//     "17:00",
//     "18:00",
//     "19:00",
//     "20:00",
//   ];

//   const allSchedules = [];

//   const GroupCards = [
//     [ExampleData[0], ExampleData[1]],
//     [ExampleData[2], ExampleData[3]],
//     [ExampleData[4], ExampleData[5]],
//   ];

//   const GroupCounts = [1, 2, 1];

//   const getCourseForCell = (day, time) => {
//     for (let course of courses) {
//       if (
//         course.weekday.includes(day) &&
//         time >= course.start_time &&
//         time < course.end_time
//       ) {
//         return course;
//       }
//     }
//     return null;
//   };

//   // Permutate to allow each group to add a class first
//   for (let i = 0; i < GroupCards.length; i++) {
//     // Move the first element of GroupCards to the end
//     const firstElement = GroupCards.shift();
//     GroupCards.push(firstElement);

//     // Call addClassesFromGroups with the updated GroupCards configuration
//     const selectedClasses = addClassesFromGroups(GroupCards, GroupCounts);
//     allSchedules.push(selectedClasses);
//   }
//   // selectedClasses.map(section => section.time_and_locations[0].start_time)
//   console.log(allSchedules);
//   return (
//     <div>
//       {allSchedules.map((schedule, index) => (
//         <div key={index}>
//           <h3>Schedule {index + 1}</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 {days.map((day) => (
//                   <th key={day}>{day}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {times.map((time) => (
//                 <tr key={time}>
//                   <td>{time}</td>
//                   {days.map((day) => {
//                     const course = getCourseForCell(day, time, schedule);
//                     return (
//                       <td
//                         key={day + time}
//                         style={{
//                           backgroundColor: course ? course.color : "#fff",
//                         }}
//                       >
//                         {course
//                           ? `${course.course_number} ${course.course_name}`
//                           : ""}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }

/* original schedule_generator */

export function schedule_generator(groupCardsList, groupCountsDict) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const allSchedules = [];
  const groupCardsandCounts = [];
  // groupCountsList = [];
  // hardcoded groupCounts for now
  // for (let i = 0; i < groupCardsList.length; i++) {
  //   groupCountsList.push(2);
  // }
  // console.log(groupCountsList);

  // 2D array of groupCards and groupCounts to keep them tgt when permutating
  for (let i = 0; i < groupCardsList.length; i++) {
    groupCardsandCounts.push([
      groupCardsList[i],
      groupCountsDict[groupCardsList[i].id],
    ]);
  }
  const groupPermutations = permute(groupCardsandCounts);
  console.log("the groupPermutations is", groupPermutations);

  for (let i = 0; i < groupPermutations.length; i++) {
    const GroupCards = groupPermutations[i].map((groupcards) => groupcards[0]);
    const GroupCounts = groupPermutations[i].map((groupcount) => groupcount[1]);
    const selectedClasses = addClassesFromGroups(GroupCards, GroupCounts);
    let containsArray = allSchedules.some((arr) =>
      hasSameSectionIDs(arr, selectedClasses)
    );
    if (!containsArray) {
      allSchedules.push(selectedClasses);
    }
  }
  // selectedClasses.map(section => section.time_and_locations[0].start_time)
  console.log(allSchedules);
  return allSchedules;
}

function permute(arr) {
  const result = [];

  function generatePermutations(current, remaining) {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const next = current.concat([remaining[i]]);
      const remainingCopy = [
        ...remaining.slice(0, i),
        ...remaining.slice(i + 1),
      ];
      generatePermutations(next, remainingCopy);
    }
  }

  generatePermutations([], arr);
  console.log("TOTAL NUMBER OF PERMUTATIONS IS ", result.length);
  return result;
}

function addClassesFromGroups(GroupCards, GroupCounts) {
  const selectedClasses = [];
  const selectedCourses = new Set();

  // Iterate over each group card
  GroupCards.forEach((groupCard, groupIndex) => {
    let addedCount = 0;

    // Ensure groupCard is iterable
    if (!Array.isArray(GroupCards)) {
      console.error("groupCard is not an array:", GroupCards);
      return; // Skip iteration or handle error accordingly
    }

    // Iterate over each class object in the group
    groupCard.classes.forEach((classObj) => {
      classObj.sections.forEach((section) => {
        // Check if section meets criteria
        if (
          addedCount < GroupCounts[groupIndex] &&
          !selectedCourses.has(section.id)
        ) {
          let overlap = false;
          selectedClasses.forEach((selectedSection) => {
            if (checkOverlap(section, selectedSection)) {
              overlap = true;
            }
          });
          if (!overlap) {
            selectedClasses.push(section);
            selectedCourses.add(section.id);
            addedCount++;
          }
        }
      });
    });

    console.log(`Added ${addedCount} classes from Group ${groupIndex + 1}`);
  });
  return selectedClasses;
}

// Function to compare if two arrays contain the same set of section IDs
function hasSameSectionIDs(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sectionIDs1 = arr1.map((section) => section.id).sort();
  const sectionIDs2 = arr2.map((section) => section.id).sort();

  for (let i = 0; i < sectionIDs1.length; i++) {
    if (sectionIDs1[i] !== sectionIDs2[i]) {
      return false;
    }
  }

  return true;
}

function checkOverlap(section1, section2) {
  // Check if there's any overlap in timings
  for (const timeLoc1 of section1.time_and_locations) {
    for (const timeLoc2 of section2.time_and_locations) {
      if (timeLoc1.weekday.some((day) => timeLoc2.weekday.includes(day))) {
        const start1 = new Date(`2000-01-01T${timeLoc1.start_time}`);
        const end1 = new Date(`2000-01-01T${timeLoc1.end_time}`);
        const start2 = new Date(`2000-01-01T${timeLoc2.start_time}`);
        const end2 = new Date(`2000-01-01T${timeLoc2.end_time}`);
        if (!(end1 <= start2 || end2 <= start1)) {
          return true; // There's overlap
        }
      }
    }
  }
  return false; // No overlap
}

export default schedule_generator;

/* work in progress */

// function addClassesFromGroups(GroupCards, GroupCounts) {
//   const selectedClasses = [];
//   const selectedCourses = new Set();

//   const allZero = GroupCounts.every((count) => count === 0);

//   // GroupCards.forEach((group, groupIndex) => {
//   let groupIndex = 0;
//   while (groupIndex < GroupCards.length) {
//     let addedCount = 0;

//     GroupCards[groupIndex].forEach((classObj) => {
//       // Iterate over each class object in the group
//       classObj.sections.forEach((section) => {
//         // Iterate over each section of the class
//         if (
//           addedCount < GroupCounts[groupIndex] &&
//           !selectedCourses.has(section.id)
//         ) {
//           let overlap = false;
//           selectedClasses.forEach((selectedSection) => {
//             if (checkOverlap(section, selectedSection)) {
//               overlap = true;
//             }
//           });

//           if (!overlap) {
//             selectedClasses.push(section);
//             selectedCourses.add(section.id);
//             addedCount++;
//             groupIndex++;
//           }
//         }
//       });
//     });
//     groupIndex++;
//     console.log(`Added ${addedCount} classes from Group ${groupIndex + 1}`);
//     if (GroupCounts.every((count) => count === 0)) {
//       groupIndex = 0;
//     }
//   }

//   console.log(selectedClasses);
//   return selectedClasses;
// }

// The code below can print one schedule
// function schedule_generator() {
//   // Assume classesArr is structured as described:
//   const classesArr = [
//     [
//       {
//         className: "Math 101",
//         sections: [
//           {
//             startTime: "9:00 AM",
//             endTime: "10:00 AM",
//             sectionName: "Section A",
//             professor: "John Doe",
//           },
//           {
//             startTime: "10:15 AM",
//             endTime: "11:15 AM",
//             sectionName: "Section B",
//             professor: "Jane Smith",
//           },
//           // Add more sections as needed
//         ],
//       },
//       // Add more classes in this group as needed
//     ],
//     // Add more groups as needed
//   ];

//   // Loop through classesArr to access the start and end times of each section
//   classesArr.forEach((group, groupIndex) => {
//     console.log(`Group ${groupIndex + 1}:`);
//     group.forEach((classItem, classIndex) => {
//       console.log(`  Class ${classIndex + 1}: ${classItem.className}`);
//       classItem.sections.forEach((section, sectionIndex) => {
//         console.log(`    Section ${sectionIndex + 1}:`);
//         console.log(`      Start Time: ${section.startTime}`);
//         console.log(`      End Time: ${section.endTime}`);
//         console.log(`      Section Name: ${section.sectionName}`);
//         console.log(`      Professor: ${section.professor}`);
//       });
//     });
//   });

//   return <div></div>;
// }

// export default schedule_generator;

// This code can print each section info

// const section = GroupCards[0][0]; // Accessing the first section of the first group

// console.log("Section details:");
// console.log(`Course Major: ${section.course_major}`);
// console.log(`Course Number: ${section.course_number}`);
// console.log(`Course Name: ${section.course_name}`);
// console.log(`Section ID: ${section.id}`);
// console.log(`Professor: ${section.professor}`);
// console.log(`Weekday: ${section.time_and_locations[0].weekday}`);
// console.log(`Start Time: ${section.time_and_locations[0].start_time}`);
// console.log(`End Time: ${section.time_and_locations[0].end_time}`);
// console.log(`Location: ${section.time_and_locations[0].location}`);
// console.log(`Checked: ${section.checked}`);
