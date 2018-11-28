import React, { Component } from 'react';
import * as api from '../../api';
import makeTrashable from 'trashable';

/*
 * Props:
 * - text (aka query)
 * - model ("words" or "phrases", URL depends on it)
 * - handleSuggestionClick(id, text)
 * - extraClassName (optional)
 */
class Suggestions extends Component {
  state = {
    suggestions: [
      // {id, text}
    ]
  }

  getSuggestions = () => {
    const text = this.props.text;
    this.setState({suggestions: []});

    if (!text) {
      return;
    }

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
    this.getSuggestions();
  }

  componentDidUpdate(prevProps) {
    if (this.props.text === prevProps.text) {
      return;
    }
    this.getSuggestions();
  }

  componentWillUnmount() {
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
