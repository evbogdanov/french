import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import SearchBox from '../SearchBox/SearchBox';
import CardColumns from '../CardColumns/CardColumns';
import WordCard from '../WordCard/WordCard';

const words = [
  {
    id: 1,
    text: 'je',
    image: '',
    notes: 'I',
    gender: '',
    days_ago: 0,
  },
  {
    id: 2,
    text: 'mère',
    image: '',
    notes: 'mother',
    gender: 'f',
    days_ago: 1,
  },
  {
    id: 3,
    text: 'père',
    image: '',
    notes: 'father',
    gender: 'm',
    days_ago: 2,
  },
  {
    id: 4,
    text: 'frère',
    image: '',
    notes: 'brother',
    gender: 'm',
    days_ago: 3,
  },
];

class Words extends Component {
  state = {
    searchQuery: ''
  }

  onSearchChange = (event) => {
    this.setState({searchQuery: event.target.value});
  }

  onSearchStart = () => {
    console.log('Search words:', this.state.searchQuery);
  }

  onSearchClear = () => {
    this.setState({searchQuery: ''});
  }

  render() {
    const cards = words.map(w => <WordCard key={w.id} word={w} />);

    return (
      <>
        <Heading>Words</Heading>
        <SearchBox placeholder="Search words"
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

export default Words;
