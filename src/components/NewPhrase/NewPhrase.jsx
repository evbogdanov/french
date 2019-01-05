import React, { Component } from 'react';
import SharedForm from '../SharedForm/SharedForm';
import AddRelatedWords from '../AddRelatedWords/AddRelatedWords';
import * as api from '../../api';
import makeTrashable from 'trashable';
import { getCustomErrorMessage } from '../../utils';

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

  componentWillUnmount() {
    if (this.trashableRequest) this.trashableRequest.trash();
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
    this.trashableRequest = makeTrashable(
      api.post('/v1/phrases', this.state)
    );
    this.trashableRequest
      .then(response => {
        this.setState((prevState, props) => ({
          text: '',
          image: '',
          notes: '',
          createdId: response.data.data.id,
          createdText: prevState.text,
          loading: false,
          successText: 'Phrase created',
        }));
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          dangerText: getCustomErrorMessage(error) || 'Server error'
        });
      });
  }

  render() {
    const addRelatedWords = !this.state.createdId ? null : (
      <AddRelatedWords phraseId={this.state.createdId}
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
        {addRelatedWords}
      </>
    );
  }
}

export default NewPhrase;
