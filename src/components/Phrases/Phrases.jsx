import React, { Component } from 'react';
import { connect } from 'react-redux';
import Heading from '../Heading/Heading';
import Suggestions from '../Suggestions/Suggestions';
import CardColumns from '../CardColumns/CardColumns';
import PhraseCard from '../PhraseCard/PhraseCard';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import * as api from '../../api';
import * as actions from '../../store/actions';

class Phrases extends Component {
  state = {
    loading: false,
    hideSuggestions: false,
  }

  componentDidMount() {
    this.searchPhrases();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.searchPhrases();
    }
  }

  componentWillUnmount() {
    this.props.setSearchPhrasesText('');
  }

  searchPhrases = () => {
    const queryString = this.props.location.search,
          {text} = api.parseQueryString(queryString);
    this.setState({
      loading: true,
      hideSuggestions: true,
    });
    this.props.setSearchPhrasesText(text);
    api.get(`/v1/phrases/search${queryString}`)
      .then(res => {
        this.setState({loading: false});
        this.props.setPhrases(res.data.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  }

  onSearchChange = (event) => {
    this.setState({hideSuggestions: false});
    this.props.setSearchPhrasesText(event.target.value);
  }

  onSearchStart = () => {
    this.props.history.push({
      search: api.toQueryString({
        text: this.props.searchPhrasesText,
        offset: 0,
      })
    });
  }

  onSearchClear = () => {
    this.props.setSearchPhrasesText('');
  }

  handleSuggestionClick = (phraseId, phraseText) => {
    this.props.history.push({
      search: api.toQueryString({
        text: phraseText,
        offset: 0,
      })
    });
  }

  prevPage = () => {
    this.props.history.push({
      search: api.prevQueryString(this.props.location.search)
    });
  }

  nextPage = () => {
    this.props.history.push({
      search: api.nextQueryString(this.props.location.search)
    });
  }

  render() {
    const suggestions = this.state.hideSuggestions ? null : (
      <Suggestions text={this.props.searchPhrasesText}
                   model="phrases"
                   handleSuggestionClick={this.handleSuggestionClick}
                   extraClassName="Suggestions_search" />
    );

    let phrases;
    if (this.state.loading) {
      phrases = <Loader />;
    }
    else if (this.props.phrases.length > 0) {
      const cards = this.props.phrases.map(p => (
        <PhraseCard key={p.id}
                    phrase={p}
                    isAuthenticated={this.props.isAuthenticated}
                    setSearchPhrasesText={this.props.setSearchPhrasesText} />
      ));
      phrases = <CardColumns>{cards}</CardColumns>;
    }
    else {
      phrases = <p>No phrases found</p>;
    }

    const {offset} = api.parseQueryString(this.props.location.search);
    const pagination = (
      <Pagination loading={this.state.loading}
                  onPrevClick={this.prevPage}
                  onNextClick={this.nextPage}
                  cardsOnPage={this.props.phrases.length}
                  offset={offset} />
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
        {phrases}
        {pagination}
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
