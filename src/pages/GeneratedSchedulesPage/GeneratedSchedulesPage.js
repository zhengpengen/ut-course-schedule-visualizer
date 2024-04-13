import React, { useMemo, useState } from "react";
import "./GeneratedSchedulesPage.css";
import BackButton from "../../components/BackButton/BackButton";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const GeneratedSchedulesPage = ({ allSchedules }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Generate unique colors for each course name
  const generateColor = useMemo(() => {
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

    return (str) => intToRGB(hash(str));
  }, []);

  // Extract all unique course names from allSchedules
  const courseNames = useMemo(() => {
    const uniqueNames = new Set();
    allSchedules.forEach((schedule) => {
      schedule.forEach((classEntry) => {
        uniqueNames.add(classEntry.className);
      });
    });
    return Array.from(uniqueNames).map((name) => ({
      value: name,
      label: name,
      color: generateColor(name), // Assign color based on course name
    }));
  }, [allSchedules, generateColor]);

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

  const handleChange = (selectedOption, actionMeta) => {
    setSelectedCourses(selectedOption);
  };

  const handleInputChange = (inputValue, actionMeta) => {
    console.log("handleInputChange", inputValue, actionMeta);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Select
            options={courseNames}
            value={selectedCourses}
            onChange={handleChange}
            onInputChange={handleInputChange}
            isMulti
            isCreatable
            styles={colorStyles}
            placeholder="Schedules must have..."
          />
        </div>
        <div className="col-6">
          <Select
            options={courseNames}
            value={selectedCourses}
            onChange={handleChange}
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
