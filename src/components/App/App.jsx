import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from '../Header/Header';
import Phrases from '../Phrases/Phrases';
import Words from '../Words/Words';
import About from '../About/About';
import NotFound from '../NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={Phrases} />
            <Route path="/words" component={Words} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
