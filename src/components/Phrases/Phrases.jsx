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
    this.setState({
      loading: true,
      hideSuggestions: true,
    });
    const queryString = this.props.location.search;
    api.get(`/v1/phrases/search${queryString}`)
      .then(res => {
        const {text} = api.parseQueryString(queryString);
        this.setState({loading: false});
        this.props.setSearchPhrasesText(text);
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
    this.setState({hideSuggestions: true});
    this.props.setSearchPhrasesText(phraseText);
  }

  previousPage = () => {
    const searchQueryString = this.props.location.search,
          {text, offset} = api.parseQueryString(searchQueryString);

    if (offset === 0) return;
    let nextOffset = offset - api.PHRASES_PER_PAGE;
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
        offset: offset + api.PHRASES_PER_PAGE,
      })
    });
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

    const {offset} = api.parseQueryString(this.props.location.search),
          phrasesLen = this.props.phrases.length,
          pagination = (offset === 0 && phrasesLen < api.PHRASES_PER_PAGE) ? null : (
            <Pagination onPreviousClick={this.previousPage}
                        onNextClick={this.nextPage}
                        hasPrevious={offset > 0}
                        hasNext={phrasesLen === api.PHRASES_PER_PAGE}
            />
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
