import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.description}</h3>
      <p><strong>Início:</strong> {new Date(event.startTime).toLocaleString()}</p>
      <p><strong>Fim:</strong> {new Date(event.endTime).toLocaleString()}</p>
    </div>
  );
};

export default EventCard;
