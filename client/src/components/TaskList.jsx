//components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks available</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
