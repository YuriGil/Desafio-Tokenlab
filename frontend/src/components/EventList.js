import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      <h2>Events</h2>
      <ul className="list-group">
        {events.map(event => (
          <li key={event._id} className="list-group-item">
            <strong>{event.description}</strong>
            <p>Start: {new Date(event.startTime).toLocaleString()}</p>
            <p>End: {new Date(event.endTime).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;