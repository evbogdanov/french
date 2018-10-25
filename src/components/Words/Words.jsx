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
    time: '1 day ago',
  },
  {
    id: 2,
    text: 'terre',
    image: '',
    notes: 'earth',
    gender: 'f',
    time: '1 day ago',
  },
  {
    id: 3,
    text: 'chat',
    image: 'https://i.imgur.com/piJ4tFql.jpg',
    notes: '',
    gender: 'm',
    time: '1 day ago',
  },
  {
    id: 4,
    text: 'pomme',
    image: 'https://i.imgur.com/tPDcXIXl.jpg',
    notes: '',
    gender: 'f',
    time: '1 day ago',
  },
  {
    id: 5,
    text: 'soleil',
    image: '',
    notes: 'sun',
    gender: 'm',
    time: '1 day ago',
  }
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
