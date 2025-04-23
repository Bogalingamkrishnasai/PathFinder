import React, { useState } from 'react';
import './AppointmentScheduler.css';

function AppointmentScheduler() {
  const mentors = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Programming Fundamentals' },
    { id: '2', name: 'Prof. Mark Williams', specialty: 'Web Development' },
    { id: '3', name: 'Dr. Lisa Chen', specialty: 'Data Structures & Algorithms' },
    { id: '4', name: 'Mr. David Kim', specialty: 'Cloud Computing' },
    { id: '5', name: 'Ms. Emily Rodriguez', specialty: 'Cybersecurity' },
    { id: '6', name: 'Dr. James Wilson', specialty: 'AI & Machine Learning' },
  ];

  const standardTimeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM',
  ];

  const [selectedMentor, setSelectedMentor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMentor || !appointmentDate || !selectedSlot) {
      // eslint-disable-next-line
      alert('Please select a mentor, date, and time slot');
      return;
    }
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setSelectedMentor('');
    setAppointmentDate('');
    setSelectedSlot('');
    setAppointmentNotes('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    const mentor = mentors.find((m) => m.id === selectedMentor);
    return (
      <div className="confirmation-container">
        <h2>Appointment Scheduled Successfully!</h2>
        <div className="confirmation-details">
          <p>
            <strong>Mentor:</strong>
            {' '}
            {mentor?.name}
          </p>
          <p>
            <strong>Specialty:</strong>
            {' '}
            {mentor?.specialty}
          </p>
          <p>
            <strong>Date:</strong>
            {' '}
            {new Date(appointmentDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong>
            {' '}
            {selectedSlot}
          </p>
          {appointmentNotes && (
            <p>
              <strong>Notes:</strong>
              {' '}
              {appointmentNotes}
            </p>
          )}
        </div>
        <button type="button" onClick={resetForm} className="btn btn-primary">
          Schedule Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="appointment-container">
      <h2>Schedule Appointment with Mentor</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mentor-select">
            Select Mentor:
            <select
              id="mentor-select"
              className="form-control"
              value={selectedMentor}
              onChange={(e) => setSelectedMentor(e.target.value)}
              required
            >
              <option value="">-- Select a Mentor --</option>
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name}
                  {' '}
                  -
                  {' '}
                  {mentor.specialty}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="appointment-date">
            Appointment Date:
            <input
              type="date"
              id="appointment-date"
              className="form-control"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </label>
        </div>

        {appointmentDate && (
          <div className="form-group">
            <label htmlFor="time-slots">
              Available Time Slots:
              <div className="time-slots">
                {standardTimeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedSlot(slot);
                      }
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </label>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="appointment-notes">
            Notes (Optional):
            <textarea
              id="appointment-notes"
              className="form-control"
              rows="3"
              value={appointmentNotes}
              onChange={(e) => setAppointmentNotes(e.target.value)}
              placeholder="Any specific topics you'd like to discuss..."
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}

export default AppointmentScheduler;
