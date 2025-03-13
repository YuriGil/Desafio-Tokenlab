import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
       if (!token) {
         console.error('Token não encontrado no localStorage');
         return;
       }
        const res = await axios.get("http://localhost:5000/api/events", {
         headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.error(err.response?.data?.msg || 'Erro ao buscar eventos');
      }
    };
    fetchEvents();
  }, []);
  

  const handleCreateEvent = async (eventData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado no localStorage');
      }
      const res = await axios.post("http://localhost:5000/api/events", eventData, {
      headers: { Authorization: `Bearer ${token}` }, // Correção no envio do token
      });
  
      setEvents([...events, res.data]);
      setShowForm(false);
      setSelectedDate(eventData.date);
    } catch (err) {
      console.error(err.response?.data?.msg || 'Erro ao adicionar evento');
    }
  };
  
  return (
    <div className="container">
      <h1>Calendário</h1>
      <Calendar
        onChange={(date) => {
          const formattedDate = date.toISOString().split('T')[0];
          setSelectedDate(formattedDate);
          setShowForm(true);
        }}
        value={new Date(selectedDate)}
        tileClassName={({ date }) => {
          const formattedDate = date.toISOString().split('T')[0];
          return formattedDate === selectedDate ? 'selected-day' : '';
        }}
      />
      
      {showForm && (
        <EventForm 
          onSubmit={handleCreateEvent} 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      )}

      <EventList events={events} />
    </div>
  );
};

export default CalendarPage;
