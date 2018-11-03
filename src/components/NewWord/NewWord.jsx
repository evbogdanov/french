import React, { Component } from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';

class NewWord extends Component {
  state = {
    text: '',
    image: '',
    notes: '',
    gender: '',
  }

  handleTextChange = (event) => {
    this.setState({text: event.target.value});
  }

  handleImageChange = (event) => {
    this.setState({image: event.target.value});
  }

  handleNotesChange = (event) => {
    this.setState({notes: event.target.value});
  }

  handleGenderChange = (event) => {
    this.setState({gender: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('Create word:', this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h5>New word</h5>
        <Input id="new-word-text"
               label="Text"
               maxLength="40"
               value={this.state.text}
               handleChange={this.handleTextChange} />
        <Input id="new-word-image"
               label="Image"
               placeholder="Paste image URL"
               maxLength="100"
               value={this.state.image}
               handleChange={this.handleImageChange} />
        <Input id="new-word-notes"
               label="Notes"
               maxLength="500"
               value={this.state.notes}
               handleChange={this.handleNotesChange}
               isTextarea="true" />
        <Input id="new-word-gender"
               label="Gender"
               maxLength="1"
               value={this.state.gender}
               handleChange={this.handleGenderChange} />
        <InputSubmit text="Create word" />
      </form>
    );
  }
}

export default NewWord;
