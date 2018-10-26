import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import CardColumns from '../CardColumns/CardColumns';
import PhraseCard from '../PhraseCard/PhraseCard';
import SearchBox from '../SearchBox/SearchBox';

const phrases = [
  {
    id: 1,
    text: 'Paroles, paroles',
    image: '',
    notes: 'Words, words',
    related_words: null,
    days_ago: 0,
  },
  {
    id: 2,
    text: 'Encore des mots toujours des mots',
    image: '',
    notes: 'Still words always words',
    related_words: null,
    days_ago: 1,
  },
  {
    id: 3,
    text: 'T\'es pas tout neuf, mais pas si vieux',
    image: '',
    notes: 'You\'re not new, but not so old',
    related_words: null,
    days_ago: 2,
  },
  {
    id: 4,
    text: 'Mes dents sont sensible',
    image: '',
    notes: 'My teeth are sensitive',
    related_words: [
      'dent',
    ],
    days_ago: 3,
  },
  {
    id: 5,
    text: 'Quelque chose',
    image: '',
    notes: 'Something',
    related_words: [
      'chose',
      'quelque',
    ],
    days_ago: 4,
  },
];

class Phrases extends Component {
  state = {
    searchQuery: ''
  }

  onSearchChange = (event) => {
    this.setState({searchQuery: event.target.value});
  }

  onSearchStart = () => {
    console.log('Search phrases:', this.state.searchQuery);
  }

  onSearchClear = () => {
    this.setState({searchQuery: ''});
  }

  render() {
    const cards = phrases.map(p => <PhraseCard key={p.id} phrase={p} />);

    return (
      <>
        <Heading>Phrases</Heading>
        <SearchBox placeholder="Search phrases"
                   value={this.state.searchQuery}
                   onChange={this.onSearchChange}
                   onSearchStart={this.onSearchStart}
                   onClear={this.onSearchClear} />
        <CardColumns>
          {cards}
        </CardColumns>
      </>
    );
  }
}

export default Phrases;
