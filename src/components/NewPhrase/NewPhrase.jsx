import React, { Component } from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';
import FormAlert from '../FormAlert/FormAlert';
import AddWords from '../AddWords/AddWords';
import * as api from '../../api';

class NewPhrase extends Component {
  state = {
    // Create phrase
    text: '',
    image: '',
    notes: '',

    // Add words (after the phrase was created)
    createdId: null,
    createdText: '',

    // UI
    loading: false,
    success: false,
    danger: false,
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value,
      success: false,
      danger: false,
    });
  }

  handleImageChange = (event) => {
    this.setState({
      image: event.target.value,
      success: false,
      danger: false,
    });
  }

  handleNotesChange = (event) => {
    this.setState({
      notes: event.target.value,
      success: false,
      danger: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      createdId: null,
      createdText: '',
      loading: true,
      success: false,
      danger: false,
    });
    api.post('/v1/phrases', this.state)
      .then(res => {
        this.setState((prevState, props) => ({
          text: '',
          image: '',
          notes: '',
          createdId: res.data.data.id,
          createdText: prevState.text,
          loading: false,
          success: true,
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          danger: true,
        });
      });
  }

  render() {
    let [alertSuccess, alertDanger] = [null, null];
    if (this.state.success) {
      alertSuccess = <FormAlert type="success" text="Phrase created" />;
    }
    else if (this.state.danger) {
      alertDanger = <FormAlert type="danger" text="Something wrong" />;
    }

    let addWords = null;
    if (this.state.createdId) {
      addWords = (
        <AddWords phraseId={this.state.createdId}
                  phraseText={this.state.createdText} />
      );
    }

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={this.state.loading}>
            <h5>New phrase</h5>
            <Input id="new-phrase-text"
                   label="Text"
                   maxLength="150"
                   value={this.state.text}
                   handleChange={this.handleTextChange} />
            <Input id="new-phrase-image"
                   label="Image"
                   placeholder="Paste image URL"
                   maxLength="100"
                   value={this.state.image}
                   handleChange={this.handleImageChange} />
            <Input id="new-phrase-notes"
                   label="Notes"
                   maxLength="500"
                   value={this.state.notes}
                   handleChange={this.handleNotesChange}
                   isTextarea="true" />
            <InputSubmit text="Create phrase"
                         loadingText="Creating"
                         loading={this.state.loading} />
          </fieldset>
          {alertSuccess}
          {alertDanger}
        </form>
        {addWords}
      </>
    );
  }
}

export default NewPhrase;
