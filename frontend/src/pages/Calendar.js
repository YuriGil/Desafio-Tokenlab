import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events", {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setEvents(res.data);
      } catch (err) {
        console.error(err.response?.data?.msg || 'Erro ao buscar eventos');
      }
    };
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(events.filter(event => event._id !== eventId));
    } catch (err) {
      console.error(err.response?.data?.msg || 'Erro ao deletar evento');
    }
  };

  return (
    <div className="container">
      <h1>Calendar</h1>
      <EventForm onSubmit={handleCreateEvent} />
      <EventList events={events} />
    </div>
  );
};

export default Calendar;