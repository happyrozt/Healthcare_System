import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const doctors = users.filter(user => user.role === 'doctor');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor => 
    `${doctor.username} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Doctors</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search doctors by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{doctor.username} {doctor.lastName}</h5>
                  <p className="card-text">Email: {doctor.email}</p>
                  <p className="card-text">Role: {doctor.role}</p>
                  <Link to={`/profile/${doctor.email}`} className="btn btn-primary">See Profile</Link>
                  <Link to={`/book-appointment/${doctor.email}`} className="btn btn-secondary ms-2">Book Appointment</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
