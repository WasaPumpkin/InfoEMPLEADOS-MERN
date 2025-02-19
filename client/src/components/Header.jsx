//components/Header.js
import 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import logo from '../img/Logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">
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
                style={{ width: '16px', height: 'auto', marginRight: '5px' }}
              />
              <h1 style={{ fontSize: '1rem', margin: 0 }}>infoEMPLEADOS</h1>
            </Link>
          </div>
        </h1>
        <nav className="header__nav">
          {userInfo ? (
            <>
              <span className="header__user">
                Hello, {userInfo.name} (
                {userInfo.role === 'admin' ? 'Admin' : 'Employee'})
              </span>
              <button onClick={handleLogout} className="header__logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__link">
                Login
              </Link>
              <Link to="/register" className="header__link">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
