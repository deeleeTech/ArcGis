import React, { useState, useEffect, useRef } from 'react';
import Home from './components/Home';
import './App.css';
import TwoDMap from './components/TwoDMap';
import ThreeDMap from './components/ThreeDMap';

function App() {
  const [ myScreen, setMyScreen ] = useState('home')

  const handleScreenChange = (newScreen) => {
    setMyScreen(newScreen)
  }

  return (
    <div className="App">
       {myScreen == 'home' ? <Home changeScreen={handleScreenChange} /> :
          myScreen == '2Dmap' ? <TwoDMap /> :
            myScreen == '3Dmap' ? <ThreeDMap /> :
           null 
          }
    </div>
  );
}

export default App;
