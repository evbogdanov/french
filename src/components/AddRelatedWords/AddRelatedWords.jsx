import React, { Component } from 'react';
import FormRow from '../FormRow/FormRow';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';
import FormAlert from '../FormAlert/FormAlert';
import * as api from '../../api';

/*
 * Props:
 * - phraseId
 * - phraseText
 */
class AddRelatedWords extends Component {
  state = {
    text: '', // search for words starting with that text
    loading: false,
    loadingSuggestions: false,
    words: [
      // {id, text}
    ],
    suggestions: [],
    noSuggestions: false,
    successText: '',
    dangerText: '',
  }

  handleTextChange = (event) => {
    const text = event.target.value;
    this.setState({
      text: text,
      suggestions: [],
      noSuggestions: false,
      loadingSuggestions: true,
      successText: '',
      dangerText: '',
    });

    if (text === '') {
      this.setState({loadingSuggestions: false});
      return;
    }

    api.get('/v1/words/suggestions', {params: {text}})
      .then(res => {
        const suggestions = res.data.data;
        this.setState({
          suggestions,
          noSuggestions: suggestions.length === 0,
          loadingSuggestions: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({loadingSuggestions: false});
      });
  }

  addWord = (id, text) => {
    this.setState((prevState, props) => {
      const words = prevState.words.filter(w => w.id !== id);
      words.push({id, text});
      return {
        words,
        text: '',
        suggestions: []
      };
    });
  }

  removeLastWord = () => {
    this.setState((prevState, props) => {
      const words = [...prevState.words];
      words.pop();
      return {words};
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      successText: '',
      dangerText: '',
    });

    if (this.state.words.length === 0) {
      this.setState({dangerText: 'No words to add'});
      return;
    }

    const wordIds = this.state.words.map(w => w.id);
    this.setState({loading: true});
    api.post(`/v1/phrases/${this.props.phraseId}/words`, {wordIds})
      .then(res => {
        this.setState({
          words: [],
          loading: false,
          successText: 'Related words added',
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          dangerText: 'Server error',
        });
      });
  }

  render() {
    let buttonRemoveLast = null;
    if (this.state.words.length) {
      buttonRemoveLast = (
        <FormRow>
          <button type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={this.removeLastWord}>
            Remove last word
          </button>
        </FormRow>
      );
    }

    let suggestions = null,
        invalidTextFeedback = '';
    if (this.state.noSuggestions) {
      invalidTextFeedback = "Your search doesn't match any words";
    }
    else if (this.state.suggestions.length) {
      const items = this.state.suggestions.map(s => (
        <li key={s.id} onClick={() => this.addWord(s.id, s.text)}>{s.text}</li>
      ));
      suggestions = (
        <FormRow>
          <ul className="col-sm-10">
            {items}
          </ul>
        </FormRow>
      );
    }

    const wordsValue = this.state.words.map(w => w.text).join(', ');

    let [loading, loadingText] = [false, ''];
    if (this.state.loading) {
      [loading, loadingText] = [true, 'Adding'];
    }
    else if (this.state.loadingSuggestions) {
      [loading, loadingText] = [true, 'Searching'];
    }

    let [alertSuccess, alertDanger] = [null, null];
    const [successText, dangerText] = [this.state.successText, this.state.dangerText];
    if (successText) {
      alertSuccess = <FormAlert type="success" text={successText} />;
    }
    else if (dangerText) {
      alertDanger = <FormAlert type="danger" text={dangerText} />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset disabled={this.state.loading}>
          <h5>Related words</h5>
          <Input id="add-words-phrase"
                 label="Phrase"
                 value={this.props.phraseText}
                 handleChange={() => console.log('Read only')}
                 readOnly={true} />
          <Input id="add-words-words"
                 label="Words"
                 value={wordsValue}
                 handleChange={() => console.log('Read only')}
                 isTextarea={true}
                 textareaRows="2"
                 readOnly={true} />
          {buttonRemoveLast}
          <Input id="add-words-search-word"
                 label="Search"
                 placeholder="Search for related words"
                 value={this.state.text}
                 handleChange={this.handleTextChange}
                 isInvalid={this.state.noSuggestions}
                 invalidFeedback={invalidTextFeedback} />
          {suggestions}
          <InputSubmit text="Add related words"
                       loadingText={loadingText}
                       loading={loading} />
        </fieldset>
        {alertSuccess}
        {alertDanger}
      </form>
    );
  }
}

export default AddRelatedWords;
