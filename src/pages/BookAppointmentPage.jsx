import React from 'react';
import { useParams } from 'react-router-dom';

const BookAppointmentPage = () => {
  const { email } = useParams();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const doctor = users.find(user => user.email === email);

  if (!doctor) {
    return <p className="text-center">Doctor not found.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Book Appointment with {doctor.username} {doctor.lastName}</h2>
      {/* Add appointment booking form here */}
    </div>
  );
};

export default BookAppointmentPage;
