import React, { useState, useEffect } from "react";
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

import { call, signout } from "./ApiService";

function CalendarPage() {
  const navigate = useNavigate();

  // 현재 선택된 날짜
  const [value, setValue] = useState(new Date());

  // 현재 달력 화면이 보여주는 월의 시작 날짜
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // 날짜별 Todo 상태 저장
  // 예: { "2026-06-30": "COMPLETE", "2026-07-01": "INCOMPLETE" }
  const [todoStatusMap, setTodoStatusMap] = useState({});

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // 현재 보고 있는 월이 바뀔 때마다 백엔드에서 달력 상태 조회
  useEffect(() => {
    const year = activeStartDate.getFullYear();
    const month = activeStartDate.getMonth() + 1;

    call(`/api/todo/calendar?year=${year}&month=${month}`, "GET", null)
      .then((response) => {
        const statusMap = {};

        response.data.forEach((item) => {
          statusMap[item.todoDate] = item.status;
        });

        setTodoStatusMap(statusMap);
      })
      .catch((error) => {
        console.error("Error fetching calendar status:", error);
      });
  }, [activeStartDate]);

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
            value={value}
            onChange={setValue}
            onClickDay={handleDateClick}
            calendarType="gregory"
            formatDay={(locale, date) => date.getDate()}
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate)
            }
            tileClassName={({ date, view }) => {
              if (view !== "month") {
                return null;
              }

              const formattedDate = formatDate(date);
              const status = todoStatusMap[formattedDate];

              if (status === "COMPLETE") {
                return "todo-complete";
              }

              if (status === "INCOMPLETE") {
                return "todo-incomplete";
              }

              return null;
            }}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default CalendarPage;