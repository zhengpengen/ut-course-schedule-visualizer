import React, { useMemo, useState, useEffect } from "react";
import "./GeneratedSchedulesPage.css";
import BackButton from "../../components/BackButton/BackButton";
import Modal from "../../components/Modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Grid, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";

const GeneratedSchedulesPage = ({ allSchedules }) => {
  const [selectedCourses1, setSelectedCourses1] = useState([]);
  const [selectedCourses2, setSelectedCourses2] = useState([]);
  const [deepCopyCourseNames, setDeepCopyCourseNames] = useState([]);

  function filteredSchedules() {
    let filtered_schedules = {};
    for (const key of Object.keys(allSchedules)) {
      let key_array = key.split(",");
      let legal = true;
      for (const must_have of selectedCourses1) {
        if (!key_array.includes(must_have.value)) {
          legal = false;
          // console.log(must_have)
          // console.log(key_array)
          break;
        }
      }
      if (legal) {
        let legal_2 = false;
        for (const at_least_one of selectedCourses2) {
          // console.log(at_least_one)
          if (key_array.includes(at_least_one.value)) {
            legal_2 = true;
            break;
          }
        }
        if (legal_2 || selectedCourses2.length === 0)
          filtered_schedules[key] = [...allSchedules[key]];
      }
    }

    return filtered_schedules;
  }

  const filtered_schedules = filteredSchedules();

  // console.log(filtered_schedules)

  useEffect(() => {
    // Extract all unique course names from allSchedules
    const generateColor = (str) => {
      const hash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
      };

      const intToRGB = (i) => {
        const c = (i & 0x00ffffff).toString(16).toUpperCase();
        return "#" + "00000".substring(0, 6 - c.length) + c;
      };

      return intToRGB(hash(str));
    };

    const uniqueNames = new Set();
    Object.keys(allSchedules).forEach((class_combo) => {
      allSchedules[class_combo].forEach((schedule) => {
        schedule.forEach((classEntry) => {
          uniqueNames.add(classEntry.className);
        });
      });
    });
    const courseNames = Array.from(uniqueNames).map((name) => ({
      value: name,
      label: name,
      color: generateColor(name), // Assign color based on course name
    }));

    setDeepCopyCourseNames(
      courseNames.filter(
        (course) =>
          !selectedCourses1.some((selected) => selected.value === course.value)
      )
    );
  }, [allSchedules, selectedCourses1]);

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: "black" }; // Display plain black text
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
        },
      };
    },
  };

  const handleChange1 = (selectedOption, actionMeta) => {
    setSelectedCourses1(selectedOption);
    console.log(selectedOption);
    // Update deepCopyCourseNames based on selected courses
    setDeepCopyCourseNames(
      deepCopyCourseNames.filter(
        (course) =>
          !selectedOption.some((selected) => selected.value === course.value)
      )
    );
  };

  const handleChange2 = (selectedOption, actionMeta) => {
    setSelectedCourses2(selectedOption);
  };

  const handleInputChange = (inputValue, actionMeta) => {
    console.log("handleInputChange", inputValue, actionMeta);
  };

  // console.log("filtered_schedules is ", filtered_schedules);
  // console.log("filtered_schedules keys are ", Object.keys(filtered_schedules));
  // console.log("filered_schedule[0] is ", filtered_schedules[0]);

  {
    Object.keys(filtered_schedules).map((class_combo, index) =>
      console.log(
        "class_combo is ",
        class_combo,
        "first array should be, ",
        filtered_schedules[class_combo],
        "schedule is ",
        filtered_schedules[class_combo][0]
      )
    );
  }
  console.log("filtered_schedules[0] is ", filtered_schedules["M 328K"]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Select
            options={deepCopyCourseNames}
            value={selectedCourses1}
            onChange={handleChange1}
            onInputChange={handleInputChange}
            isMulti
            isCreatable
            styles={colorStyles}
            placeholder="Schedules must have all of..."
          />
        </div>
        <div className="col-6">
          <Select
            options={deepCopyCourseNames}
            value={selectedCourses2}
            onChange={handleChange2}
            onInputChange={handleInputChange}
            isMulti
            isCreatable
            styles={colorStyles}
            placeholder="Schedules must have at least one of..."
          />
        </div>
      </div>

      <div className="generated-schedules">
        <BackButton />
        <h1>Generated Schedules</h1>
        <Grid
          container
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          spacing={0}
          direction="column"
          // justifyContent="flex-start"
          // alignItems="center"
        >
          {Object.keys(filtered_schedules).map((class_combo, index) => (
            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              spacing={0}
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <div>
                {/* <div className="schedule" key={index}> */}
                <h3>{/* {index + 1} {class_combo.replaceAll(",", ", ")} */}</h3>
                {/* {filtered_schedules[class_combo].map((schedule, classIndex) => ( */}
                <div className="schedule">
                  {filtered_schedules[class_combo].map(
                    (classEntry, classIndex) => (
                      <Grid item xs={6} key={`class_combo_${classIndex}`}>
                        <div className="classEntry">
                          <Modal allSchedules={classEntry} index={classIndex} />
                        </div>
                      </Grid>
                    )
                  )}
                </div>
                {/* ))} */}
                {/* </div> */}
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>

    // <div className="generated-schedules">
    //   <BackButton />
    //   <h1>Generated Schedules</h1>
    //   <Grid container spacing={2}>
    //     {allSchedules.map((schedule, index) => (
    //       <Grid item xs={6} key={`allSchedules_schedule_${index}`}>
    //         <Box className="schedule">
    //           <Modal allSchedules={allSchedules} index={index} />
    //         </Box>
    //       </Grid>
    //     ))}
    //   </Grid>
    // </div>
  );
};

export default GeneratedSchedulesPage;
