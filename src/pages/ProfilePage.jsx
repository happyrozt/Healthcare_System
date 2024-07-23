import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { email } = useParams();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const doctor = users.find(user => user.email === email);

  if (!doctor) {
    return <p className="text-center">Doctor not found.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>{doctor.username} {doctor.lastName}</h2>
      <p>Email: {doctor.email}</p>
      <p>Role: {doctor.role}</p>
    </div>
  );
};

export default ProfilePage;
