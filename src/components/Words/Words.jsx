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
import * as actions from '../../store/actions';

class Words extends Component {
  state = {
    searchWordsText: '',
    loading: false,
    hideSuggestions: false,
  }

  componentDidMount() {
    this.searchWords();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.searchWords();
    }
  }

  searchWords = () => {
    this.setState({
      loading: true,
      hideSuggestions: true,
    });
    const queryString = this.props.location.search;
    api.get(`/v1/words/search${queryString}`)
      .then(res => {
        const {text} = api.parseQueryString(queryString);
        this.setState({
          loading: false,
          searchWordsText: text,
        });
        this.props.setWords(res.data.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  }

  onSearchChange = (event) => {
    this.setState({
      hideSuggestions: false,
      searchWordsText: event.target.value,
    });
  }

  onSearchStart = () => {
    this.props.history.push({
      search: api.toQueryString({
        text: this.state.searchWordsText,
        offset: 0,
      })
    });
  }

  onSearchClear = () => {
    this.setState({searchWordsText: ''});
  }

  handleSuggestionClick = (wordId, wordText) => {
    this.setState({
      hideSuggestions: true,
      searchWordsText: wordText,
    });
  }

  previousPage = () => {
    const searchQueryString = this.props.location.search,
          {text, offset} = api.parseQueryString(searchQueryString);

    if (offset === 0) return;
    let nextOffset = offset - api.WORDS_PER_PAGE;
    if (nextOffset < 0) nextOffset = 0;

    this.props.history.push({
      search: api.toQueryString({
        text,
        offset: nextOffset,
      })
    });
  }

  nextPage = () => {
    const searchQueryString = this.props.location.search,
          {text, offset} = api.parseQueryString(searchQueryString);
    this.props.history.push({
      search: api.toQueryString({
        text,
        offset: offset + api.WORDS_PER_PAGE,
      })
    });
  }

  render() {
    const loader = this.state.loading ? <Loader/> : null;

    const cards = this.props.words.map(w => (
      <WordCard key={w.id}
                word={w}
                isAuthenticated={this.props.isAuthenticated} />
    ));

    const suggestions = this.state.hideSuggestions ? null : (
      <Suggestions text={this.state.searchWordsText}
                   model="words"
                   handleSuggestionClick={this.handleSuggestionClick}
                   extraClassName="Suggestions_search" />
    );

    return (
      <>
        <Heading>Words</Heading>
        <SearchBox placeholder="Search words"
                   value={this.state.searchWordsText}
                   onChange={this.onSearchChange}
                   onSearchStart={this.onSearchStart}
                   onClear={this.onSearchClear} />
        {suggestions}
        <CardColumns>
          {cards}
        </CardColumns>
        {loader}
        <Pagination onPreviousClick={this.previousPage}
                    onNextClick={this.nextPage} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    words: state.words,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWords: words => dispatch({
      type: actions.SET_WORDS,
      data: {words}
    })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: false}
)(Words);
