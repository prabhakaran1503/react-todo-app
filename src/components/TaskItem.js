import React from 'react';

function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <li style={{ margin: '10px 0' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task._id, !task.completed)}
      />
      <span style={{
        textDecoration: task.completed ? 'line-through' : 'none',
        marginLeft: '10px'
      }}>
        {task.title} {task.category && `(${task.category})`} {task.dueDate && `- Due: ${new Date(task.dueDate).toLocaleDateString()}`}
      </span>
      <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '10px' }}>Delete</button>
    </li>
  );
}

export default TaskItem;
