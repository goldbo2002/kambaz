import React, { useState } from "react";

const initialAssignment = { id: 1, title: "React Assignment", due: "2024-08-15" };
const initialModule = { id: 101, name: "Module 1", description: "Basics" };
const initialTodos = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Practice Lab", completed: true },
  { id: 3, title: "Submit Homework", completed: false },
];

const Lab5: React.FC = () => {
  // For path/query parameter sections (mocked as local state)
  const [result, setResult] = useState<number | string>("");

  // For objects
  const [assignment, setAssignment] = useState(initialAssignment);
  const [module, setModule] = useState(initialModule);
  const [editTitle, setEditTitle] = useState(assignment.title);

  // For todos
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [asyncWelcome, setAsyncWelcome] = useState("");
  const [editTodoId, setEditTodoId] = useState<number>(1);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  // Simulate async fetch for welcome message
  const fetchWelcome = () => {
    setTimeout(() => setAsyncWelcome("Welcome to Lab 5!"), 500);
  };