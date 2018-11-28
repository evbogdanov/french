import React, { Component } from 'react';
import FormRow from '../FormRow/FormRow';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';
import FormAlert from '../FormAlert/FormAlert';
import Suggestions from '../Suggestions/Suggestions';
import * as api from '../../api';
import makeTrashable from 'trashable';

/*
 * Props:
 * - phraseId
 * - phraseText
 */
class AddRelatedWords extends Component {
  state = {
    text: '', // search for related words starting with that text
    loading: false,
    words: [
      // {id, text}
    ],
    successText: '',
    dangerText: '',
  }

  componentWillUnmount() {
    if (this.trashableRequest) this.trashableRequest.trash();
  }

  handleTextChange = (event) => {
    const text = event.target.value;
    this.setState({
      text: text,
      successText: '',
      dangerText: '',
    });
  }

  addWord = (id, text) => {
    this.setState((prevState, props) => {
      const words = prevState.words.filter(w => w.id !== id);
      words.push({id, text});
      return {
        words,
        text: '',
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

    this.trashableRequest = makeTrashable(
      api.post(`/v1/phrases/${this.props.phraseId}/words`, {wordIds})
    );
    this.trashableRequest
      .then(() => {
        this.setState({
          words: [],
          loading: false,
          successText: 'Related words added',
        });
      })
      .catch(error => {
        console.log(error);
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

    const wordsValue = this.state.words.map(w => w.text).join(', ');

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
                 handleChange={this.handleTextChange} />
          <FormRow>
            <Suggestions text={this.state.text}
                         model="words"
                         handleSuggestionClick={this.addWord} />
          </FormRow>
          <InputSubmit text="Add related words"
                       loadingText="Adding"
                       loading={this.state.loading} />
        </fieldset>
        {alertSuccess}
        {alertDanger}
      </form>
    );
  }
}

export default AddRelatedWords;
