//components/TaskList.js
import 'react';
import PropTypes from 'prop-types'; // Import PropTypes
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

// Define propTypes for TaskList
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Validate that each task has an _id of type string
      // Add other task properties here if needed
    })
  ).isRequired, // Validate that tasks is an array and is required
};

export default TaskList;