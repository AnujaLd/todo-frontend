import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { getTodos, createTodo,toggleTodo } from "../REST_URLs/rest_url"; 

const TodoApp = () => {
  interface Task {
    id: number;
    title: string;
    description: string;
  }
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await getTodos();
      setTasks(result.data.filter((task: any) => !task.completed));
    };
  
    fetchTodos();
  }, []);
  

  const handleAddTask = async () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      const result = await createTodo(newTask.title, newTask.description);

      if (result.success) {
        setTasks(prev => [result.data, ...prev.slice(0, 4)]);
        setNewTask({ title: "", description: "" });
      }
    }
  };

  const handleCompleteTask = async (id: number) => {
    await toggleTodo(id);
    setTasks(tasks.filter(task => task.id !== id));
  };
  

  return (
    <Container maxWidth="md" style={{ padding: 20, backgroundColor: "#f5f5f5", borderRadius: 10 }}>
      <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: "bold", color: "#3f51b5" }}>
        To-Do List
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} style={{ backgroundColor: "#ffffff", padding: 20, borderRadius: 10 }}>
          <Typography variant="h6" gutterBottom style={{ color: "#3f51b5" }}>Add a Task</Typography>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            variant="outlined"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddTask} style={{ marginTop: 10 }}>
            Add Task
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          {tasks.map((task: any) => (
            <Card key={task.id} style={{ marginBottom: 10, backgroundColor: "#e3f2fd", borderLeft: "5px solid #3f51b5" }}>
              <CardContent>
                <Typography variant="h6" style={{ color: "#3f51b5", fontWeight: "bold" }}>{task.task}</Typography>
                <Typography style={{ marginBottom: 10 }}>{task.description}</Typography>
                <Button variant="contained" color="secondary" onClick={() => handleCompleteTask(task.id)}>
                  Done
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TodoApp;