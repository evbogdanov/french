import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import * as api from '../../api';

class Secret extends Component {
  state = {
    secret: api.getSecret(),
    validFeedback: false,
    invalidFeedback: false,
  }

  onSecretChange = (event) => {
    const secret = event.target.value;
    api.setSecret(secret);
    this.setState({
      validFeedback: false,
      invalidFeedback: false,
      secret
    });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.validateSecret();
    }
  }

  validateSecret = () => {
    this.setState({
      validFeedback: false,
      invalidFeedback: false,
    });
    api.post('/v1/secrets')
      .then(res => {
        this.setState({validFeedback: true});
      })
      .catch(err => {
        console.log(err);
        this.setState({invalidFeedback: true});
      });
  }

  render() {
    let feedback = null;
    const inputClasses = [
      'form-control',
    ];
    if (this.state.validFeedback) {
      feedback = <div className="valid-feedback">Secret looks good!</div>;
      inputClasses.push('is-valid');
    }
    if (this.state.invalidFeedback) {
      feedback = <div className="invalid-feedback">Invalid secret :(</div>;
      inputClasses.push('is-invalid');
    }
    const inputClassName = inputClasses.join(' ');
    
    return (
      <>
        <Heading>Secret</Heading>
        <div className="form-group">
          <input className={inputClassName}
                 type="text"
                 placeholder="Secret"
                 value={this.state.secret}
                 onKeyPress={this.onKeyPress}
                 onChange={this.onSecretChange} />
          {feedback}
        </div>
        <button className="btn btn-primary" onClick={this.validateSecret}>
          Validate
        </button>
      </>
    );
  }
}

export default Secret;
