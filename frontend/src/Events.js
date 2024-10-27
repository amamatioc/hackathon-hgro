import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import EventModal from './EventModal';
import './App.css'; 
import axios from 'axios';

function Events() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await axios.post('http://localhost:3001/recommend', newEvent);

      if (response.status !== 200) {
        throw new Error('Failed to add event');
      }

      fetchEvents();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEventClick = (id) => {
    navigate(`/event/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div>
      <Navbar />
      <button className="button-make" onClick={handleOpenModal}>Add an event</button>
      <div className="event-container">
        {events.map((event, index) => (
          <div key={index} className="mov-card">
            <h2>{event.name}</h2>
            <p><strong>Date:</strong> {formatDate(event.date)}</p>
            <p><strong>Place:</strong> { event.place}</p>  
            <button onClick={() => handleEventClick(event.id)}>Details</button>
          </div>
        ))}
      </div>
      <EventModal show={showModal} onClose={handleCloseModal} onSubmit={handleAddEvent} />
    </div>
  );
}

export default Events;