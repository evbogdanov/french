import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import * as api from '../../api';

class About extends Component {
  state = {
    // Why counters are strings:
    // https://github.com/brianc/node-postgres/issues/378
    countWords: '0',
    countPhrases: '0',
  }

  componentDidMount() {
    api.get('/v1/stats/count')
      .then(res => {
        const count = res.data.data;
        this.setState({
          countWords: count.words,
          countPhrases: count.phrases,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="About">
        <Heading>About</Heading>
        <p className="lead">What happens when a web developer decides to learn a new language? Well, he creates an app for it!</p>
        <p className="lead">My name is Ev. I am a French learner and the author of the app. Sooner or later I'll fill this page up with meaningful stuff.</p>
        <hr />
        <p className="lead">Words: {this.state.countWords}</p>
        <p className="lead">Phrases: {this.state.countPhrases}</p>
      </div>
    );
  }
}

export default About;
