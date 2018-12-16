import React, { Component } from 'react';
import * as api from '../../api';
import makeTrashable from 'trashable';
import { debounce } from '../../utils';

/*
 * Props:
 * - text (aka query)
 * - model ("words" or "phrases", URL depends on it)
 * - handleSuggestionClick(id, text)
 * - extraClassName (optional)
 */
class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [
        // {id, text}
      ]
    };
    this.getSuggestionsEfficiently = debounce(this.getSuggestions, 300);
  }

  getSuggestions = () => {
    this.setState({suggestions: []});
    const text = this.props.text;
    if (!text) return;

    this.trashableRequest = makeTrashable(
      api.get(`/v1/${this.props.model}/suggestions`, {params: {text}})
    );
    this.trashableRequest
      .then(response => {
        this.setState({
          suggestions: response.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getSuggestionsEfficiently();
  }

  componentDidUpdate(prevProps) {
    if (this.props.text === prevProps.text) {
      return;
    }
    this.getSuggestionsEfficiently();
  }

  componentWillUnmount() {
    this.getSuggestionsEfficiently.cancel();
    if (this.trashableRequest) this.trashableRequest.trash();
  }

  render() {
    if (this.state.suggestions.length === 0) {
      return null;
    }

    const classes = ['Suggestions'];
    if (this.props.extraClassName) {
      classes.push(this.props.extraClassName);
    }
    const className = classes.join(' ');

    const suggestions = this.state.suggestions.map(s => (
      <li key={s.id}
          className="Suggestions__item"
          onClick={() => this.props.handleSuggestionClick(s.id, s.text)}>
        {s.text}
      </li>
    ));

    return (
      <ul className={className}>
        {suggestions}
      </ul>
    );
  }
}

export default Suggestions;
