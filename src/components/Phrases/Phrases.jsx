import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import CardColumns from '../CardColumns/CardColumns';
import PhraseCard from '../PhraseCard/PhraseCard';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import * as api from '../../api';

class Phrases extends Component {
  state = {
    searchQuery: '',
    phrases: [],
    loading: false,
  }

  componentDidMount() {
    this.setState({loading: true});
    api.get('/v1/phrases/search')
      .then(res => {
        this.setState({
          phrases: res.data.data,
          loading: false,
        });
      })
      .catch(err => {
        console.log('Error!', err);
        this.setState({loading: false});
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
    const loader = this.state.loading ? <Loader/> : null;
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
        {loader}
      </>
    );
  }
}

export default Phrases;
