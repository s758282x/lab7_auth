import React from 'react';

function EventsList() {
  
  const events = [
    { date: 'Feb 7', name: 'Employee Hack-a-ston' },
    { date: 'Mar 7', name: 'Food Bank Volunteering' },
    { date: 'Apr 4', name: 'Company Retreat' },
    { date: 'May 5', name: 'Annual Picnic' },

  ];

  const eventList = events.map((event, index) => (
    <li key={index}>
      <strong>{event.date}: </strong>{event.name}
    </li>
  ));

  return (
    <section>
      <h3>Upcoming Events</h3>
      <ul>{eventList}</ul>
    </section>
  );
}

export default EventsList;