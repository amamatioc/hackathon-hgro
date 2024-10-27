import React, { useState } from 'react';

const EventModal = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [date, setDate]=useState('');
  const [startTime, setStartTime]=useState('');
  const [endTime, setEndTime]=useState('');
  const [place, setPlace]=useState('');
  const [description, setDescription]=useState('');
  const [budget, setBudget]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      name,
      date,
      startTime,
      endTime,
      place,
      description,
      budget
    };
    onSubmit(newEvent);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-cont">
        <h2>Plan an event</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <input type="text" placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <button onClick={handleSubmit}>Done</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EventModal;
