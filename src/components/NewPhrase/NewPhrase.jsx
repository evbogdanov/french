import React, { Component } from 'react';
import SharedForm from '../SharedForm/SharedForm';
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
    successText: '',
    dangerText: '',
  }

  handleInputChange = (event, inputName) => {
    const nextState = {
      successText: '',
      dangerText: '',
    };
    nextState[inputName] = event.target.value;
    this.setState(nextState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      createdId: null,
      createdText: '',
      loading: true,
      successText: '',
      dangerText: '',
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
          successText: 'Phrase created',
        }));
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
    const addWords = !this.state.createdId ? null : (
      <AddWords phraseId={this.state.createdId}
                phraseText={this.state.createdText} />
    );

    return (
      <>
        <SharedForm simple={false}
                    model="phrase"
                    text={this.state.text}
                    image={this.state.image}
                    notes={this.state.notes}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmit}
                    headingText="New phrase"
                    submitText="Create phrase"
                    loadingText="Creating"
                    loading={this.state.loading}
                    successText={this.state.successText}
                    dangerText={this.state.dangerText} />
        {addWords}
      </>
    );
  }
}

export default NewPhrase;
