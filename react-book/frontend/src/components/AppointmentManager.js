import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentManager.css';

function AppointmentManager() {
  const navigate = useNavigate();

  const mentors = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Programming Fundamentals' },
    { id: '2', name: 'Prof. Mark Williams', specialty: 'Web Development' },
    { id: '3', name: 'Dr. Lisa Chen', specialty: 'Data Structures & Algorithms' },
    { id: '4', name: 'Mr. David Kim', specialty: 'Cloud Computing' },
    { id: '5', name: 'Ms. Emily Rodriguez', specialty: 'Cybersecurity' },
    { id: '6', name: 'Dr. James Wilson', specialty: 'AI & Machine Learning' },
  ];

  const generateMockAppointments = () => {
    const statuses = ['confirmed', 'upcoming', 'completed', 'cancelled'];
    const timeSlots = ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '04:00 PM'];
    const notes = [
      'Discuss course materials',
      'Project review session',
      'Exam preparation',
      'Career guidance',
      'Technical interview practice',
      'Code review',
    ];

    const today = new Date();
    const appointments = [];

    mentors.forEach((mentor, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);

      appointments.push({
        id: `appt-${index}`,
        mentor,
        date: date.toISOString().split('T')[0],
        timeSlot: timeSlots[index % timeSlots.length],
        status: statuses[index % statuses.length],
        meetingLink: '#',
        notes: notes[index % notes.length],
      });
    });

    return appointments;
  };

  const [appointments, setAppointments] = useState(generateMockAppointments());
  const [filter, setFilter] = useState('all');

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  const handleCancel = (id) => {
    setAppointments(appointments.map((appt) => (
      appt.id === id ? { ...appt, status: 'cancelled' } : appt
    )));
  };

  const handleReschedule = (appointment) => {
    navigate('/schedule', { state: { appointmentToReschedule: appointment } });
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="appointment-manager-container">
      <div className="appointment-header">
        <h2>My Mentorship Appointments</h2>
        <div>
          <button
            type="button"
            className="btn new-appointment-btn"
            onClick={() => navigate('/schedule-appointment')}
          >
            + New Appointment
          </button>
        </div>
      </div>

      <div className="filter-controls">
        <button
          type="button"
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Appointments
        </button>
        <button
          type="button"
          className={filter === 'upcoming' ? 'active' : ''}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button
          type="button"
          className={filter === 'confirmed' ? 'active' : ''}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed
        </button>
        <button
          type="button"
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          type="button"
          className={filter === 'cancelled' ? 'active' : ''}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="no-appointments">
          <div className="empty-state">
            <img src="/calendar-empty.svg" alt="No appointments" className="empty-icon" />
            <h3>No appointments found</h3>
            <p>
              You don&apos;t have any
              {' '}
              {filter === 'all' ? '' : filter}
              {' '}
              appointments scheduled
            </p>
            <button
              type="button"
              className="btn schedule-btn"
              onClick={() => navigate('/schedule')}
            >
              Schedule Your First Appointment
            </button>
          </div>
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`appointment-card ${appointment.status}`}
            >
              <div className="card-header">
                <div className="mentor-info">
                  <div className="mentor-avatar">
                    {appointment.mentor.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="mentor-name">{appointment.mentor.name}</h3>
                    <p className="mentor-specialty">{appointment.mentor.specialty}</p>
                  </div>
                </div>
                <span className={`status-badge ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="card-body">
                <div className="appointment-time">
                  <svg className="icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                  </svg>
                  <div>
                    <p className="date">{formatDate(appointment.date)}</p>
                    <p className="time">{appointment.timeSlot}</p>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="appointment-notes">
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                    </svg>
                    <p>{appointment.notes}</p>
                  </div>
                )}
              </div>

              <div className="card-footer">
                {appointment.status === 'confirmed' && (
                  <a
                    href={appointment.meetingLink}
                    className="btn join-btn"
                  >
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
                    </svg>
                    Join Meeting
                  </a>
                )}

                {appointment.status === 'upcoming' && (
                  <button
                    type="button"
                    onClick={() => handleReschedule(appointment)}
                    className="btn reschedule-btn"
                  >
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M12 8v5l4.25 2.52.77-1.28-3.52-2.09V8H12zm6-6H6v16h12V2zm0-2c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2h12z" />
                    </svg>
                    Reschedule
                  </button>
                )}

                {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                  <button
                    type="button"
                    onClick={() => handleCancel(appointment.id)}
                    className="btn cancel-btn"
                  >
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                    {appointment.status === 'upcoming' ? 'Cancel' : 'End Meeting'}
                  </button>
                )}

                {appointment.status === 'completed' && (
                  <button
                    type="button"
                    className="btn feedback-btn"
                  >
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                    </svg>
                    Leave Feedback
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentManager;
