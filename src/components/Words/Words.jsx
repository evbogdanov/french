import React, { Component } from 'react';
import { connect } from 'react-redux';
import Heading from '../Heading/Heading';
import SearchBox from '../SearchBox/SearchBox';
import Suggestions from '../Suggestions/Suggestions';
import CardColumns from '../CardColumns/CardColumns';
import WordCard from '../WordCard/WordCard';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import * as api from '../../api';
import { setWords } from '../../store/actions';
import makeTrashable from 'trashable';

class Words extends Component {
  state = {
    searchWordsText: '',
    loading: false,
    hideSuggestions: false
  };

  componentDidMount() {
    this.searchWords();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.searchWords();
    }
  }

  componentWillUnmount() {
    if (this.trashableRequest) this.trashableRequest.trash();
  }

  searchWords = () => {
    const queryString = this.props.location.search;
    const { text } = api.parseQueryString(queryString);
    this.setState({
      loading: true,
      hideSuggestions: true,
      searchWordsText: text
    });
    this.trashableRequest = makeTrashable(
      api.get(`/v1/words/search${queryString}`)
    );
    this.trashableRequest
      .then(response => {
        this.setState({ loading: false });
        this.props.setWords(response.data.data);
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  onSearchChange = event => {
    this.setState({
      hideSuggestions: false,
      searchWordsText: event.target.value
    });
  };

  onSearchStart = () => {
    this.props.history.push({
      search: api.toQueryString({
        text: this.state.searchWordsText,
        offset: 0
      })
    });
  };

  onSearchClear = () => {
    this.setState({ searchWordsText: '' });
  };

  handleSuggestionClick = (wordId, wordText) => {
    this.props.history.push({
      search: api.toQueryString({
        text: wordText,
        offset: 0
      })
    });
  };

  prevPage = () => {
    this.props.history.push({
      search: api.prevQueryString(this.props.location.search)
    });
  };

  nextPage = () => {
    this.props.history.push({
      search: api.nextQueryString(this.props.location.search)
    });
  };

  render() {
    const suggestions = this.state.hideSuggestions ? null : (
      <Suggestions
        text={this.state.searchWordsText}
        model="words"
        handleSuggestionClick={this.handleSuggestionClick}
        extraClassName="Suggestions_search"
      />
    );

    let words;
    if (this.state.loading) {
      words = <Loader />;
    } else if (this.props.words.length > 0) {
      const cards = this.props.words.map(w => (
        <WordCard
          key={w.id}
          word={w}
          isAuthenticated={this.props.isAuthenticated}
        />
      ));
      words = <CardColumns>{cards}</CardColumns>;
    } else {
      words = <p>No words found</p>;
    }

    const { offset } = api.parseQueryString(this.props.location.search);
    const pagination = (
      <Pagination
        loading={this.state.loading}
        onPrevClick={this.prevPage}
        onNextClick={this.nextPage}
        cardsOnPage={this.props.words.length}
        offset={offset}
      />
    );

    return (
      <>
        <Heading>Words</Heading>
        <SearchBox
          placeholder="Search words"
          value={this.state.searchWordsText}
          onChange={this.onSearchChange}
          onSearchStart={this.onSearchStart}
          onClear={this.onSearchClear}
        />
        {suggestions}
        {words}
        {pagination}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    words: state.words
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWords: words => dispatch(setWords(words))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Words);
