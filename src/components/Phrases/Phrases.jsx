import React, { Component } from 'react';
import { connect } from 'react-redux';
import Heading from '../Heading/Heading';
import Suggestions from '../Suggestions/Suggestions';
import CardColumns from '../CardColumns/CardColumns';
import PhraseCard from '../PhraseCard/PhraseCard';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import * as api from '../../api';
import * as actions from '../../store/actions';

class Phrases extends Component {
  state = {
    loading: false,
    hideSuggestions: false,
  }

  componentDidMount() {
    this.setState({loading: true});
    api.get('/v1/phrases/search')
      .then(res => {
        this.setState({loading: false});
        this.props.setPhrases(res.data.data);
      })
      .catch(err => {
        console.log('Error!', err);
        this.setState({loading: false});
      });
  }

  componentWillUnmount() {
    this.props.setSearchPhrasesText('');
  }

  onSearchChange = (event) => {
    this.setState({hideSuggestions: false});
    this.props.setSearchPhrasesText(event.target.value);
  }

  onSearchStart = () => {
    this.setState({hideSuggestions: true});
    console.log('Search phrases:', this.props.searchPhrasesText);
  }

  onSearchClear = () => {
    this.props.setSearchPhrasesText('');
  }

  handleSuggestionClick = (phraseId, phraseText) => {
    this.props.setSearchPhrasesText(phraseText);
    this.setState({hideSuggestions: true});
  }

  render() {
    const loader = this.state.loading ? <Loader/> : null;

    const cards = this.props.phrases.map(p => (
      <PhraseCard key={p.id}
                  phrase={p}
                  isAuthenticated={this.props.isAuthenticated}
                  setSearchPhrasesText={this.props.setSearchPhrasesText} />
    ));

    const suggestions = this.state.hideSuggestions ? null : (
      <Suggestions text={this.props.searchPhrasesText}
                   model="phrases"
                   handleSuggestionClick={this.handleSuggestionClick}
                   extraClassName="Suggestions_search" />
    );

    return (
      <>
        <Heading>Phrases</Heading>
        <SearchBox placeholder="Search phrases"
                   value={this.props.searchPhrasesText}
                   onChange={this.onSearchChange}
                   onSearchStart={this.onSearchStart}
                   onClear={this.onSearchClear} />
        {suggestions}
        <CardColumns>
          {cards}
        </CardColumns>
        {loader}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    phrases: state.phrases,
    searchPhrasesText: state.searchPhrasesText,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhrases: phrases => dispatch({
      type: actions.SET_PHRASES,
      data: {phrases}
    }),
    setSearchPhrasesText: searchPhrasesText => dispatch({
      type: actions.SET_SEARCH_PHRASES_TEXT,
      data: {searchPhrasesText}
    })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: false}
)(Phrases);
