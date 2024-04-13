import React, { useMemo, useState, useEffect } from "react";
import "./GeneratedSchedulesPage.css";
import BackButton from "../../components/BackButton/BackButton";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const GeneratedSchedulesPage = ({ allSchedules }) => {
  const [selectedCourses1, setSelectedCourses1] = useState([]);
  const [selectedCourses2, setSelectedCourses2] = useState([]);
  const [deepCopyCourseNames, setDeepCopyCourseNames] = useState([]);

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
    allSchedules.forEach((schedule) => {
      schedule.forEach((classEntry) => {
        uniqueNames.add(classEntry.className);
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
            placeholder="Schedules must have..."
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
            placeholder="Schedules can have..."
          />
        </div>
      </div>

      <div className="generated-schedules">
        <BackButton />
        <h1>Generated Schedules</h1>
        {allSchedules.map((schedule, index) => (
          <div className="schedule" key={index}>
            <h3>{index + 1}</h3>
            {schedule.map((classEntry, classIndex) => (
              <div className="classEntry" key={classIndex}>
                <div className="class-name">{classEntry.className}</div>
                <div>
                  {classEntry.id} {classEntry.professor}
                </div>
                {classEntry.time_and_locations.map(
                  (time_and_locations, timeIndex) => (
                    <div key={timeIndex}>
                      {time_and_locations.location} |{" "}
                      {time_and_locations.weekday
                        ?.toString()
                        .replaceAll(",", " ")}{" "}
                      | {time_and_locations.start_time}
                      {time_and_locations.start_time === "" ? "" : "-"}
                      {time_and_locations.end_time}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedSchedulesPage;
