import React, { Component } from 'react';
import axios from 'axios';
import Heading from '../Heading/Heading';
import SearchBox from '../SearchBox/SearchBox';
import CardColumns from '../CardColumns/CardColumns';
import WordCard from '../WordCard/WordCard';

class Words extends Component {
  state = {
    searchQuery: '',
    words:  []
  }

  componentDidMount() {
    // TODO: put API URL inside a config file
    axios.get('http://localhost:4000/v1/words/search')
      .then(res => {
        this.setState({words: res.data.data});
      })
      .catch(err => {
        console.log('Error!', err);
      });
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
    const cards = this.state.words.map(
      w => <WordCard key={w.id} word={w} />
    );

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
