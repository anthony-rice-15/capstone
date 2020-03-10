import React from 'react';
import logo from './logo.svg';
import './App.css';

import Toolbar from './components/Toolbar/Toolbar';

function App() {
  return (
    <div className="App">
        <Toolbar/>
      <main style={{marginTop: '64px'}}>
          <p> page content</p>
      </main>

    </div>
  );
}

export default App;
