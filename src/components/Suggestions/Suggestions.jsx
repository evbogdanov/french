import React, { Component } from 'react';
import * as api from '../../api';

/*
 * Props:
 * - text (aka query)
 * - model ("words" or "phrases", URL depends on it)
 * - handleSuggestionClick(id, text)
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

    api.get(`/v1/${this.props.model}/suggestions`, {params: {text}})
      .then(res => {
        this.setState({
          suggestions: res.data.data,
        });
      })
      .catch(err => {
        console.log(err);
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

  render() {
    const suggestions = this.state.suggestions.map(s => (
      <li key={s.id}
          onClick={() => this.props.handleSuggestionClick(s.id, s.text)}>
        {s.text}
      </li>
    ));

    return (
      <ul>
        {suggestions}
      </ul>
    );
  }
}

export default Suggestions;
