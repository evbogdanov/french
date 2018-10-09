import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import CardColumns from '../CardColumns/CardColumns';
import PhraseCard from '../PhraseCard/PhraseCard';
import SearchBox from '../SearchBox/SearchBox';

const phrases = [
  {
    id: 1,
    text: 'Paroles, paroles',
    notes: 'Words, words',
    relatedWords: [],
    time: '1 day ago',
  },
  {
    id: 2,
    text: 'Encore des mots toujours des mots',
    notes: 'Still words always words',
    relatedWords: [],
    time: '1 day ago',
  },
  {
    id: 3,
    text: 'T\'es pas tout neuf, mais pas si vieux',
    notes: 'You\'re not new, but not so old',
    relatedWords: [],
    time: '1 day ago',
  },
  {
    id: 4,
    text: 'Mes dents sont sensible',
    notes: 'My teeth are sensitive',
    relatedWords: [
      {id: 1, text: 'dent'},
    ],
    time: '1 day ago',
  },
  {
    id: 5,
    text: 'Quelque chose',
    notes: 'Something',
    relatedWords: [
      {id: 1, text: 'chose'},
      {id: 2, text: 'quelque'},
    ],
    time: '1 day ago',
  },
];

class Phrases extends Component {
  state = {
    searchQuery: ''
  }

  onSearchChange = (event) => {
    this.setState({searchQuery: event.target.value});
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
                   onClear={this.onSearchClear} />
        <CardColumns>
          {cards}
        </CardColumns>
      </>
    );
  }
}

export default Phrases;
