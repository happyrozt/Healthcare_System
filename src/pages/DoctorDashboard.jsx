import React from 'react';

const DoctorDashboard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedUser') || 'null');
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  const doctorAppointments = appointments.filter(
    (appointment) => appointment.doctorName === loggedInUser.username
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Appointments</h2>
      {doctorAppointments.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {doctorAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No upcoming appointments found.</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
