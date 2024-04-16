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
  const groupPermutations = permute(groupCardsList);

  for (let i = 0; i < groupPermutations.length; i++) {
    const GroupCards = groupPermutations[i];
    let overallResults = [];
    addClassesFromGroups(overallResults, GroupCards, { ...groupCountsDict });
    // console.log('all sch', allSchedules)
    // console.log('or',overallResults)
    for (let c = 0; c < overallResults.length; c++) {
      // console.log('s', overallResults[c])
      let duplicateDetected = allSchedules.some((arr) =>
        hasSameSectionIDs(arr, overallResults[c])
      );
      // console.log(duplicateDetected)
      if (!duplicateDetected) {
        allSchedules.push(overallResults[c]);
      }
    }
  }
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

function addClassesFromGroups(
  overallResults,
  GroupCards,
  GroupCounts,
  selectedClasses = [],
  groupIndex = 0
) {
  if (groupIndex >= GroupCards.length) {
    // If we've reached the end of GroupCards, add the current selectedClasses to the result
    overallResults.push([...selectedClasses]); // Make a copy of selectedClasses to avoid reference issues
    // console.log([...selectedClasses])
    return;
  }

  const groupCard = GroupCards[groupIndex];
  const classCount = groupCard.classes.length;

  // Recursively explore each class in the current group
  for (let classIndex = 0; classIndex < classCount; classIndex++) {
    const classObj = groupCard.classes[classIndex];
    const sectionCount = classObj.sections.length;

    // Recursively explore each section in the current class
    for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++) {
      const section = classObj.sections[sectionIndex];
      if (!section.checked) {
        // ignore this section
        continue;
      }
      section.className = classObj.course_major + " " + classObj.course_number;
      // +
      // " " +
      // classObj.course_name; // CONCATENATE CLASS PROPERTIES TO FORM CLASS NAME
      let overlap = false;

      // Check if the section overlaps with any previously selected section
      for (const selectedSection of selectedClasses) {
        if (checkOverlap(section, selectedSection)) {
          overlap = true;
          break;
        }
      }

      // If no overlap, add the section to selectedClasses and continue exploring recursively
      if (!overlap && section.checked === true) {
        selectedClasses.push(section);
        GroupCounts[groupCard.id] -= 1;

        const subResult = addClassesFromGroups(
          overallResults,
          GroupCards,
          GroupCounts,
          selectedClasses,
          groupIndex + (GroupCounts[groupCard.id] === 0 ? 1 : 0)
        );
        // overallResults.push(subResult); // Merge sub-results into the result
        GroupCounts[groupCard.id] += 1; // Backtrack
        selectedClasses.pop(); // Backtrack: remove the last section added
      }
    }
  }

  return;
}

// Function to compare if two arrays contain the same set of section IDs
function hasSameSectionIDs(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sectionIDs1 = arr1.map((section) => section.id).sort();
  const sectionIDs2 = arr2.map((section) => section.id).sort();

  for (let i = 0; i < sectionIDs1.length; i++) {
    // console.log(sectionIDs1[i], sectionIDs2[i])
    if (sectionIDs1[i] !== sectionIDs2[i]) {
      return false;
    }
  }

  return true;
}

function checkOverlap(section1, section2) {
  // Check if there's any overlap in timings
  if (section1.className === section2.className) return true; // from the same class
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
