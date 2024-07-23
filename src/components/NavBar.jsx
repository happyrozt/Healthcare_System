import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedUser') || 'null');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Healthcare System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {(!loggedInUser || loggedInUser.role === 'patient') && (
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            )}
            {loggedInUser ? (
              <>
                {loggedInUser.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                  </li>
                )}
                {loggedInUser.role === 'doctor' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctor-dashboard">Doctor Dashboard</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to={`/profile/${loggedInUser.email}`}>Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointments">Appointments</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={() => {
                    localStorage.removeItem('loggedUser');
                  
                  }}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
