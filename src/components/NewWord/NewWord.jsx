import React, { Component } from 'react';
import SharedForm from '../SharedForm/SharedForm';
import * as api from '../../api';
import makeTrashable from 'trashable';
import { getCustomErrorMessage } from '../../utils';

class NewWord extends Component {
  state = {
    text: '',
    image: '',
    notes: '',
    gender: '',

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
      loading: true,
      successText: '',
      dangerText: '',
    });
    this.trashableRequest = makeTrashable(
      api.post('/v1/words', this.state)
    );
    this.trashableRequest
      .then(() => {
        this.setState({
          text: '',
          image: '',
          notes: '',
          gender: '',
          loading: false,
          successText: 'Word created',
        });
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
    return (
      <SharedForm simple={false}
                  model="word"
                  text={this.state.text}
                  image={this.state.image}
                  notes={this.state.notes}
                  gender={this.state.gender}
                  handleInputChange={this.handleInputChange}
                  handleSubmit={this.handleSubmit}
                  headingText="New word"
                  submitText="Create word"
                  loadingText="Creating"
                  loading={this.state.loading}
                  successText={this.state.successText}
                  dangerText={this.state.dangerText} />
    );
  }
}

export default NewWord;
