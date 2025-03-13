import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      <h2>Eventos</h2>
      <ul className="list-group">
        {events.map(event => (
          <li key={event._id} className="list-group-item">
            <strong>{event.description}</strong>
            <p>Data: {event.date}</p>
            <p>Início: {event.startTime}</p>
            <p>Término: {event.endTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
