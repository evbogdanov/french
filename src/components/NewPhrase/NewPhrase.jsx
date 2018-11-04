import React, { Component } from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';
import Alert from '../Alert/Alert';
import * as api from '../../api';

class NewPhrase extends Component {
  state = {
    // Expected by the server
    text: '',
    image: '',
    notes: '',

    // Other
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
      loading: true,
      success: false,
      danger: false,
    });
    api.post('/v1/phrases', this.state)
      .then(res => {
        this.setState({
          text: '',
          image: '',
          notes: '',
          loading: false,
          success: true,
        });
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
      alertSuccess = <Alert type="success" text="Phrase created" />;
    }
    else if (this.state.danger) {
      alertDanger = <Alert type="danger" text="Something wrong" />;
    }

    return (
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
    );
  }
}

export default NewPhrase;
