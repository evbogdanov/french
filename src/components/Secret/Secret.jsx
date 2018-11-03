import React, { Component } from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';

import * as api from '../../api';

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

    api.post('/v1/secrets')
      .then(res => {
        this.setState({isValid: true});
        this.props.setAuthenticated();
        api.setAuthenticated();
      })
      .catch(err => {
        console.log(err);
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
