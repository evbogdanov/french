import React, { Component } from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';

class NewPhrase extends Component {
  state = {
    text: '',
    image: '',
    notes: '',
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

  handleSubmit = (event) => {
    console.log('Create phrase:', this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <InputSubmit text="Create phrase" />
      </form>
    );
  }
}

export default NewPhrase;
