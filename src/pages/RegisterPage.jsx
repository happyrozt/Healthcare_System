import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import 'bootstrap/dist/css/bootstrap.min.css';
const formFields = [
    { label: 'Username', id: 'username', type: 'text', },
    { label: 'Last Name', id: 'lastName', type: 'text',  },
    { label: 'Email', id: 'email', type: 'email',},
    { label: 'Password', id: 'password', type: 'password', }
  ];
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    lastName: '',
    email: '',
    password: '',
    role: 'patient'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.find(user => user.email === formData.email);
      if (userExists) newErrors.email = 'Email already exists. Please use a different email.';
    }
    if (!formData.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-95">
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="card-title mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          {formFields.map((field) => (
            <div key={field.id} className="mb-3">
              <InputField
                label={field.label}
                id={field.id}
                type={field.type}
                value={formData[field.id]}
                onChange={handleChange}
                required={field.required}
              />
              {errors[field.id] && <div className="text-danger">{errors[field.id]}</div>}
            </div>
          ))}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
