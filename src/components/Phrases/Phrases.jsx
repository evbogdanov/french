import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import CardColumns from '../CardColumns/CardColumns';
import PhraseCard from '../PhraseCard/PhraseCard';
import SearchBox from '../SearchBox/SearchBox';
import * as api from '../../api';

class Phrases extends Component {
  state = {
    searchQuery: '',
    phrases: [],
  }

  componentDidMount() {
    api.get('/v1/phrases/search')
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
