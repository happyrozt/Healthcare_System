import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
const inputs = [
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'password', label: 'Password', type: 'password' }
];
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email format is invalid.';
    } else {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === formData.email);
      if (!user) {
        newErrors.email = 'Email not found.';
      } else if (user.password !== formData.password) {
        newErrors.password = 'Password is incorrect.';
      }
    }
    if (!formData.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === formData.email);
    if (user) {
      dispatch({ type: 'SET_CURRENT_USER', payload: user });
      localStorage.setItem('loggedUser', JSON.stringify(user));
      navigate('/');
    }
  };



  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px', overflow: 'hidden' }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {inputs.map(({ id, label, type, required }) => (
            <div key={id} className="mb-3">
              <InputField
                id={id}
                label={label}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                required={required}
              />
              {errors[id] && <div className="text-danger">{errors[id]}</div>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
