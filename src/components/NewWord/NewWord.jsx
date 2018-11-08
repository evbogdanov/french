import React, { Component } from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';
import FormAlert from '../FormAlert/FormAlert';
import * as api from '../../api';

const GENDERS = ['f', 'm', ''];

class NewWord extends Component {
  state = {
    // Expected by the server
    text: '',
    image: '',
    notes: '',
    gender: '',

    // Other
    loading: false,
    success: false,
    danger: false,
  }

  handleInputChange = (event, inputName) => {
    const nextState = {
      success: false,
      danger: false,
    };
    nextState[inputName] = event.target.value;
    this.setState(nextState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      success: false,
      danger: false,
    });
    api.post('/v1/words', this.state)
      .then(res => {
        this.setState({
          text: '',
          image: '',
          notes: '',
          gender: '',
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
      alertSuccess = <FormAlert type="success" text="Word created" />;
    }
    else if (this.state.danger) {
      alertDanger = <FormAlert type="danger" text="Something wrong" />;
    }

    let [isInvalidGender, invalidGenderFeedback] = [false, null];
    if (!GENDERS.includes(this.state.gender)) {
      isInvalidGender = true;
      invalidGenderFeedback = "Invalid gender! Valid genders are 'f' or 'm'";
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset disabled={this.state.loading}>
          <h5>New word</h5>
          <Input id="new-word-text"
                 label="Text"
                 maxLength="40"
                 value={this.state.text}
                 handleChange={ev => this.handleInputChange(ev, 'text')} />
          <Input id="new-word-notes"
                 label="Notes"
                 maxLength="500"
                 value={this.state.notes}
                 handleChange={ev => this.handleInputChange(ev, 'notes')}
                 isTextarea="true" />
          <Input id="new-word-gender"
                 label="Gender"
                 maxLength="1"
                 value={this.state.gender}
                 handleChange={ev => this.handleInputChange(ev, 'gender')}
                 isInvalid={isInvalidGender}
                 invalidFeedback={invalidGenderFeedback} />
          <Input id="new-word-image"
                 label="Image"
                 placeholder="Paste image URL"
                 maxLength="100"
                 value={this.state.image}
                 handleChange={ev => this.handleInputChange(ev, 'image')} />
          <InputSubmit text="Create word"
                       loadingText="Creating"
                       loading={this.state.loading} />
        </fieldset>
        {alertSuccess}
        {alertDanger}
      </form>
    );
  }
}

export default NewWord;
