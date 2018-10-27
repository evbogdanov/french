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
import Secret from '../Secret/Secret';
import NotFound from '../NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Phrases} />
              <Route path="/words" component={Words} />
              <Route path="/about" component={About} />
              <Route path="/secret" component={Secret} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      </Router>
    );
  }
}

export default App;
