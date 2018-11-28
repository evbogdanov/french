import React, { Component } from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';
import * as api from '../../api';
import makeTrashable from 'trashable';

/*
 * Props:
 * - setAuthenticated
 * - unsetAuthenticated
 */
class Secret extends Component {
  state = {
    secret: api.getSecret(),
    isValid: false,
    isInvalid: false,
  }

  componentWillUnmount() {
    if (this.trashableRequest) this.trashableRequest.trash();
  }

  handleSecretChange = (event) => {
    const secret = event.target.value;
    api.setSecret(secret);
    this.setState({
      isValid: false,
      isInvalid: false,
      secret
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      isValid: false,
      isInvalid: false,
    });

    this.trashableRequest = makeTrashable(
      api.post('/v1/secrets')
    );
    this.trashableRequest
      .then(() => {
        this.setState({isValid: true});
        this.props.setAuthenticated();
        api.setAuthenticated();
      })
      .catch(error => {
        console.log(error);
        this.setState({isInvalid: true});
        this.props.unsetAuthenticated();
        api.unsetAuthenticated();
      });
  }

  render() {
    let [validFeedback, invalidFeedback] = [null, null];
    if (this.state.isValid) {
      validFeedback = 'Yes, you know it';
    }
    else if (this.state.isInvalid) {
      invalidFeedback = 'Hmm, something wrong';
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h5>Do you know the secret?</h5>
        <Input type="password"
               id="secret"
               label="Secret"
               value={this.state.secret}
               handleChange={this.handleSecretChange}
               isValid={this.state.isValid}
               isInvalid={this.state.isInvalid}
               validFeedback={validFeedback}
               invalidFeedback={invalidFeedback} />
        <InputSubmit text="Validate" />
      </form>
    );
  }
}

export default Secret;
