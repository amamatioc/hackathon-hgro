import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './App.css'; // Ensure this file contains the CSS

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [friends, setFriends] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/event/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tasks/${id}`);
        setTasks(response.data);
        console.log('Fetched tasks:', response.data); // Debugging log
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchEvent();
    fetchFriends();
    fetchTasks();
  }, [id]);

  const handleAddTask = async () => {
    if (!selectedFriend || !taskDescription) {
      setMessage('Please select a friend and enter a task description.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/add-task', { eventId: id, friendId: selectedFriend, taskDescription });
      if (response.status === 200) {
        setTasks([...tasks, response.data]);
        setMessage('Task added successfully!');
        setTaskDescription(''); // Clear the task description input
        console.log('Added task:', response.data); // Debugging log
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('Failed to add task.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const getTasksForFriend = (friendId) => {
    const friendTasks = tasks.filter(task => task.friendId === friendId);
    console.log(`Tasks for friend ${friendId}:`, friendTasks); // Debugging log
    return friendTasks;
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="event-details-container">
        <div className="event-details-card">
          <h2>{event.name}</h2>
          <p><strong>Date:</strong> {formatDate(event.date)}</p>
          <p><strong>Start Time:</strong> {formatTime(event.startTime)}</p>
          <p><strong>End Time:</strong> {formatTime(event.endTime)}</p>
          <p><strong>Place:</strong> {event.place}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Budget:</strong> {event.budget}</p>
        </div>
        <div className="event-details-buttons">
          <select value={selectedFriend} onChange={(e) => setSelectedFriend(e.target.value)}>
            <option value="">Select your name</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.id}>
                {friend.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        {message && <p>{message}</p>}
      </div>
      <div className="task-list">
        <h3>Task List</h3>
        {friends.map((friend) => (
          <div key={friend.id} className="friend-task-list">
            <h4>{friend.name}</h4>
            {getTasksForFriend(friend.id).map((task) => (
              <div key={task.id} className="task-item">
                <p><strong>Task:</strong> {task.taskDescription}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventDetails;