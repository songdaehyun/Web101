import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";

import { signout } from "./ApiService";

function CalendarPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date) => {
    const formattedDate = formatDate(date);
    navigate(`/todo/${formattedDate}`);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">할일 달력</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="calendar-container">
        <Paper className="calendar-paper">
          <Typography variant="h4" align="center" gutterBottom>
            날짜를 선택하세요
          </Typography>

          <Calendar
            onChange={setValue}
            value={value}
            onClickDay={handleDateClick}
            calendarType="gregory"
            formatDay={(locale, date) => date.getDate()}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default CalendarPage;