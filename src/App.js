import React, { useEffect, useState } from 'react';
import TaskItem from './components/TaskItem';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title) return alert('Enter task title');
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, dueDate })
    });
    setTitle('');
    setCategory('');
    setDueDate('');
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>To-Do List App</h2>
      <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task =>
          <TaskItem
            key={task._id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        )}
      </ul>
    </div>
  );
}

export default App;
