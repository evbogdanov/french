import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import { Link } from 'react-router-dom';
import * as api from '../../api';
import makeTrashable from 'trashable';

class About extends Component {
  state = {
    // Why counters are strings:
    // https://github.com/brianc/node-postgres/issues/378
    countWords: '0',
    countPhrases: '0',
  }

  componentDidMount() {
    this.trashableRequest = makeTrashable(
      api.get('/v1/stats/count')
    );
    this.trashableRequest
      .then(response => {
        const count = response.data.data;
        this.setState({
          countWords: count.words,
          countPhrases: count.phrases,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    if (this.trashableRequest) this.trashableRequest.trash();
  }

  render() {
    const wordsLink = (
      <Link to="/words">
        {this.state.countWords} words
      </Link>
    );

    const phrasesLink = (
      <Link to="/">
        {this.state.countPhrases} phrases
      </Link>
    );

    return (
      <div className="About">
        <div className="row">
          <div className="col-md-8">
            <Heading>Bonjour!</Heading>
            <p>
              I'm <a href="https://github.com/evbogdanov">Ev</a>.
              And this is the app I've been working on recently.
              It helps me to learn the French language.
            </p>
            <p>
              How does it work? Well, it's kind of my own dictionary.
              I just write down new words and phrases.
            </p>
            <p>
              I tried to use <a href="https://medium.com/@evguenie">Medium</a> for this
              purpose but quickly discovered its limitations. I wanted something
              better, something I can fully customize to my needs. Et voilà!
            </p>
            <p>
              Right now in my dictionary {wordsLink} and {phrasesLink}.
            </p>
          </div>
          <div className="col-md-4 About__image">
            <img alt="Eiffel Tower" className="img-fluid" src="/img/eiffel.png" />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
