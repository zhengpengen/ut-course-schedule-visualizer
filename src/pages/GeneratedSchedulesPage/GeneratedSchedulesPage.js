import React, { useMemo, useState, useEffect } from "react";
import "./GeneratedSchedulesPage.css";
import BackButton from "../../components/BackButton/BackButton";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const GeneratedSchedulesPage = ({ allSchedules }) => {
  const [selectedCourses1, setSelectedCourses1] = useState([]);
  const [selectedCourses2, setSelectedCourses2] = useState([]);
  const [deepCopyCourseNames, setDeepCopyCourseNames] = useState([]);

  function filteredSchedules() {
    let filtered_schedules = {};
    for(const key of Object.keys(allSchedules)){
      let key_array = key.split(',');
      let legal = true;
      for(const must_have of selectedCourses1){
        if(!key_array.includes(must_have.value)){
          legal = false;
          // console.log(must_have)
          // console.log(key_array)
          break;
        }
      }
      if(legal){
        let legal_2 = false
        for(const at_least_one of selectedCourses2){
          // console.log(at_least_one)
          if(key_array.includes(at_least_one.value)){
            legal_2 = true;
            break;
          }
        }
        if(legal_2 || selectedCourses2.length === 0) filtered_schedules[key] = [...allSchedules[key]];
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
    console.log(selectedOption)
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

        {Object.keys(filtered_schedules).map((class_combo, index) => (
          <div>
            {/* <div className="schedule" key={index}> */}
              <h3>{index + 1}. {class_combo.replaceAll(',',', ')}</h3>
              {filtered_schedules[class_combo].map((schedule, classIndex) => (
                <div className="schedule">
                  {schedule.map((classEntry, classIndex) => (
                    <div className="classEntry" key={classIndex}>
                      <div className="class-name">{classEntry.className}</div>
                      <div>
                        {classEntry.id} {classEntry.professor}
                      </div>
                      {classEntry.time_and_locations.map((time_and_locations, timeIndex) => (
                        <div key={timeIndex}>
                          {time_and_locations.location} |{" "}
                          {time_and_locations.weekday
                            ?.toString()
                            .replaceAll(",", " ")}{" "}
                          | {time_and_locations.start_time}
                          {time_and_locations.start_time === "" ? "" : "-"}
                          {time_and_locations.end_time}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedSchedulesPage;
