import React, { useState } from 'react';
import logo from './logo.svg';
import { SessionState } from './session-state/SessionState';
import './App.css';
import { LandingPage } from './pages/Landing';
import { ViewGuessr } from './pages/ViewGuessr';
import { Result } from './pages/Result';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const gameLength :number = 5;

function App() {
  const state :SessionState = {
    seed : "",
    videoNumber : 0,
    actualViews : [],
    guessedViews : [],
    videoData: []
  }

  const [appState, setAppState] = useState(state);

  const setParentState = (state: SessionState) =>
  {
    setAppState(state);
  }

  let page = <ViewGuessr state={appState} callback={setParentState}/>

  if (appState.seed == "")
  {
    page = <LandingPage state={appState} callback={setParentState}/>
  }

  if (appState.guessedViews.length >= gameLength)
  {
    let page = <Result/>
  }

  return (
    <Layout className='App'>
        <Header>
          <div className='Logo'>ViewGuessr</div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {page}
        </Content>
      </Layout>
  );
}

export default App;
