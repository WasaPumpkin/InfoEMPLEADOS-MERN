// //components/TaskForm.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { createTask } from '../features/tasks/taskSlice';

// const TaskForm = () => {
//   const [text, setText] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [error, setError] = useState('');
//   const [employees, setEmployees] = useState([]);

//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (!userInfo) return; // Avoid running if userInfo is null
//       try {
//         const config = {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         };
//         // Fetch employees using the environment variable
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/api/users/employees`,
//         config
//       );

//         setEmployees(data);
//       } catch (err) {
//         console.error('Error fetching employees:', err);
//         setError('Failed to fetch employees. Please try again.');
//       }
//     };
//     fetchEmployees();
//   }, [userInfo]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text || !assignedTo) {
//       setError('Please fill in all fields');
//       return;
//     }
//     dispatch(createTask({ text, assignedTo }));
//     setText('');
//     setAssignedTo('');
//     setError('');
//   };

//   return (
//     <form className="task-form" onSubmit={handleSubmit} aria-label="Task Form">
//       <h3 className="task-form__title">Assign New Task</h3>
//       {error && (
//         <div className="task-form__error" role="alert">
//           {error}
//         </div>
//       )}
//       <div className="task-form__group">
//         <label htmlFor="taskText" className="task-form__label">
//           Task
//         </label>
//         <input
//           type="text"
//           id="taskText"
//           className="task-form__input"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           required
//           aria-required="true"
//         />
//       </div>
//       <div className="task-form__group">
//         <label htmlFor="assignedTo" className="task-form__label">
//           Assign To
//         </label>
//         <select
//           id="assignedTo"
//           className="task-form__input"
//           value={assignedTo}
//           onChange={(e) => setAssignedTo(e.target.value)}
//           required
//           aria-required="true"
//         >
//           <option value="">Select Employee</option>
//           {employees.map((emp) => (
//             <option key={emp._id} value={emp._id}>
//               {emp.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button type="submit" className="task-form__button">
//         Create Task
//       </button>
//     </form>
//   );
// };

// export default TaskForm;

// components/TaskForm.js
import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createTask } from '../features/tasks/taskSlice';

// Hardcoded production backend URL
const BASE_URL = 'http://localhost:4000';

const TaskForm = () => {
  const [text, setText] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!userInfo) return; // Avoid running if userInfo is null
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        // Fetch employees using the hardcoded production URL
        const { data } = await axios.get(
          `${BASE_URL}/api/users/employees`,
          config
        );
        setEmployees(data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees. Please try again.');
      }
    };
    fetchEmployees();
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !assignedTo) {
      setError('Please fill in all fields');
      return;
    }
    dispatch(createTask({ text, assignedTo }));
    setText('');
    setAssignedTo('');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} aria-label="Task Form">
      <h3 className="task-form__title">Assign New Task</h3>
      {error && (
        <div className="task-form__error" role="alert">
          {error}
        </div>
      )}
      <div className="task-form__group">
        <label htmlFor="taskText" className="task-form__label">
          Task
        </label>
        <input
          type="text"
          id="taskText"
          className="task-form__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div className="task-form__group">
        <label htmlFor="assignedTo" className="task-form__label">
          Assign To
        </label>
        <select
          id="assignedTo"
          className="task-form__input"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          aria-required="true"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="task-form__button">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
