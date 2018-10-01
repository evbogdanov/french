import React, { Component } from 'react';
import Phrases from '../Phrases/Phrases';
import Words from '../Words/Words';
import About from '../About/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Phrases />
        <Words />
        <About />
      </div>
    );
  }
}

export default App;
