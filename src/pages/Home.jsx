import React from 'react';
import EventsList from '../components/EventsList.jsx'
import LatestEvent from '../components/LatestEvent.jsx'
import Values from '../components/Values.jsx'
import NameInput from '../components/NameInput.jsx';


function HomePage() {
  return (
    <div>
    <Values/>
    <EventsList/>
    <LatestEvent/>
      <NameInput/>
    </div>

  );
}

export default HomePage;
