import React, { useState } from 'react';
import logo from './logo.svg';
import { SessionState } from './session-state/SessionState';
import './App.css';
import { LandingPage } from './pages/Landing';
import { ViewGuessr } from './pages/ViewGuessr';
import { Result } from './pages/Result';

const gameLength :number = 3;

function App() {
  const state :SessionState = {
    seed : "",
    videoNumber : 0,
    actualViews : [],
    guessedViews : []
  }

  const [appState, setAppState] = useState(state);

  const setParentState = (state: SessionState) =>
  {
    setAppState(state);
  }

  if (appState.seed == "")
  {
    return (
      <div className='App'>
        <LandingPage state={appState} callback={setParentState}/>
      </div>
    );
  }

  if (appState.guessedViews.length >= gameLength)
  {
    return (
      <div className='App'>
        <Result state={appState} callback={setParentState}/>
      </div>
    )
  }

  return (
    <div className="App">
      <ViewGuessr state={appState} callback={setParentState}/>
    </div>
  );
}

export default App;
