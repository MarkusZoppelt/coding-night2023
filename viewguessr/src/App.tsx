import React, { useState } from 'react';
import logo from './logo.svg';
import { SessionState } from './session-state/SessionState';
import './App.css';
import { LandingPage } from './pages/Landing';
import { ViewGuessr } from './pages/ViewGuessr';
import { Result } from './pages/Result';

function App() {
  const state :SessionState = {
    seed : "",
    videoNumber : 0,
    actualViews : [],
    guessedViews : []
  }

  const [appState, setAppState] = useState(state);

  return (
    <div className="App">
      <LandingPage/>
      <ViewGuessr/>
      <Result/>
    </div>
  );
}

export default App;
