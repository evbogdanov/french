import React, { Component } from 'react';
import axios from 'axios';
import Heading from '../Heading/Heading';
import CardColumns from '../CardColumns/CardColumns';
import PhraseCard from '../PhraseCard/PhraseCard';
import SearchBox from '../SearchBox/SearchBox';

class Phrases extends Component {
  state = {
    searchQuery: '',
    phrases: [],
  }

  componentDidMount() {
    // TODO: put API URL inside a config file
    axios.get('http://localhost:4000/v1/phrases/search')
      .then(res => {
        this.setState({phrases: res.data.data});
      })
      .catch(err => {
        console.log('Error!', err);
      });
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
    const cards = this.state.phrases.map(
      p => <PhraseCard key={p.id} phrase={p} />
    );

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
