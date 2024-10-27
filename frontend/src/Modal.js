import React from 'react';
import './App.css'; 

const Modal = ({ show, onClose, event }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{event.name}</h2>
        <p><strong>Date:</strong> {event.Date}</p>
        <p><strong>Start Time:</strong> {event.StartTime}</p>
        <p><strong>End Time:</strong> {event.EndTime}</p>
        <p><strong>Place:</strong> {event.Place}</p>
        <p><strong>Description:</strong> {event.Description}</p>
        <p><strong>Budget:</strong> {event.Budget}</p>
      
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
