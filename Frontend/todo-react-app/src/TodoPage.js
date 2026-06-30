import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  List,
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import AddTodo from "./AddTodo";
import { call, signout } from "./ApiService";

function TodoPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { date } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    call(`/todo?date=${date}`, "GET", null)
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // 에러 처리 로직 추가
      });
  }, [date]);

  const addItem = (item) => {
    const newItem = {...item,todoDate: date,};
    call("/todo", "POST", newItem).then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        ))}
      </List>
    </Paper>
  );

  //navigationBar
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised="ture" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
  /* 로딩중 아닐때 렌더링 할 부분 */
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  /* 로딩중일때 렌더링 할 부분 */
  let loadingPage = <h1> 로딩중...</h1>;
  let content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  return <div className="TodoPage">{content}</div>;
}

export default TodoPage;
