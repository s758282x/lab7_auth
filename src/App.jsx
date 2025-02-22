import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import React from 'react';
import Home from './pages/Home.jsx';
import Values from './components/Values.jsx';
import EventsList from './components/EventsList.jsx';
import LatestEvent from './components/LatestEvent.jsx';
import { NameProvider } from './context/NameContext.jsx';
import EmpMgmt from './pages/EmpMgmt.jsx';

function App() {
  return (
    <NameProvider>
      <Router>
        <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1, paddingBottom: '3rem' }}>
            <Routes>
              <Route path="/" element={<Home/>} /> 
              <Route path="/values" element={<Values />} />
              <Route path="/events" element={<EventsList />} />
              <Route path="/latest-event" element={<LatestEvent />} />
              <Route path="/emp-mgmt" element={<EmpMgmt />} />


            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NameProvider>
  );
}

export default App;