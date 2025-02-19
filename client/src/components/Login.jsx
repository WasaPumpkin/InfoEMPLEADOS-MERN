//components/Login.js
import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth">
      <form
        className="auth__form"
        onSubmit={handleSubmit}
        aria-label="Login Form"
      >
        <h2 className="auth__title">Login</h2>
        {error && (
          <div className="auth__error" role="alert">
            {error}
          </div>
        )}
        <div className="auth__group">
          <label htmlFor="email" className="auth__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="auth__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="auth__group">
          <label htmlFor="password" className="auth__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="auth__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <button type="submit" className="auth__button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="auth__text">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
