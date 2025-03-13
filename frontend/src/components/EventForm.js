import React, { useState, useEffect } from 'react';

const EventForm = ({ onSubmit, selectedDate, onDateChange }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(selectedDate);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setDate(selectedDate); // Mantém a data sincronizada com o calendário
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
   const parsedStartTime = new Date(`${date}T${startTime}:00`);
   const parsedEndTime = new Date(`${date}T${endTime}:00`);
  
   if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
     console.error("Erro ao converter horários");
     return;
  }
  
    onSubmit({ 
      description, 
   startTime: parsedStartTime, 
   endTime: parsedEndTime 
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Data</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            onDateChange(e.target.value); // Atualiza o calendário
          }}
        />
      </div>
      <div className="form-group">
        <label>Horário de Início</label>
        <input
          type="time"
          className="form-control"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Horário de Término</label>
        <input
          type="time"
          className="form-control"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Salvar Evento</button>
    </form>
  );
};

export default EventForm;
