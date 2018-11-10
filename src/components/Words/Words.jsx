import React, { Component } from 'react';
import { connect } from 'react-redux';
import Heading from '../Heading/Heading';
import SearchBox from '../SearchBox/SearchBox';
import CardColumns from '../CardColumns/CardColumns';
import WordCard from '../WordCard/WordCard';
import Loader from '../Loader/Loader';
import * as api from '../../api';
import * as actions from '../../store/actions';

class Words extends Component {
  state = {
    searchQuery: '',
    loading: false,
  }

  componentDidMount() {
    this.setState({loading: true});
    api.get('/v1/words/search')
      .then(res => {
        this.setState({loading: false});
        this.props.setWords(res.data.data);
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
    console.log('Search words:', this.state.searchQuery);
  }

  onSearchClear = () => {
    this.setState({searchQuery: ''});
  }

  render() {
    const loader = this.state.loading ? <Loader/> : null;

    const cards = this.props.words.map(
      w => <WordCard key={w.id}
                     word={w}
                     isAuthenticated={this.props.isAuthenticated} />
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
        {loader}
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
