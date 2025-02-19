//components/Dashboard.js
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../img/Logo.png';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(fetchTasks());
    }
  }, [userInfo, navigate, dispatch]);

  return (
    <div className="dashboard">
      {/* Header: Flex container splitting the header into two halves */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        {/* Left half: Logo and title */}
        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={logo}
              alt="Company Logo"
              style={{ width: '50px', height: 'auto', marginRight: '10px' }}
            />
            <h1>infoEMPLEADOS</h1>
          </Link>
        </div>
        {/* Right half: Optional login form or additional header content */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
          {/* Include additional header content if needed */}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <h2 className="dashboard__title">Tareas</h2>
      {error && (
        <div className="dashboard__error" role="alert">
          {error}
        </div>
      )}
      {userInfo && userInfo.role === 'admin' && <TaskForm />}
      {loading ? <p>Loading tasks...</p> : <TaskList tasks={tasks} />}
    </div>
  );
};

export default Dashboard;
