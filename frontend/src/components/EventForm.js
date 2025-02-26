import React, { useState } from 'react';

const EventForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ description, startTime, endTime });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Start Time</label>
        <input
          type="datetime-local"
          className="form-control"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>End Time</label>
        <input
          type="datetime-local"
          className="form-control"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default EventForm;