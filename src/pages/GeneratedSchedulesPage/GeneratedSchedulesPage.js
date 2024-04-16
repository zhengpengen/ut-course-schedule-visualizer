import React from "react";
import Schedule from "../../components/SchedulePageComponents/Schedule";
import "./GeneratedSchedulesPage.css";
import BackButton from "../../components/BackButton/BackButton";
import Modal from "../../components/Modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Grid, Box } from "@mui/material";

const GeneratedSchedulesPage = ({ allSchedules }) => {
  return (
    <div className="generated-schedules">
      <BackButton />
      <h1>Generated Schedules</h1>
      <Grid container spacing={2}>
        {allSchedules.map((schedule, index) => (
          <Grid item xs={6} key={`allSchedules_schedule_${index}`}>
            <Box className="schedule">
              <Modal allSchedules={allSchedules} index={index} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GeneratedSchedulesPage;
