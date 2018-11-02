import React, { Component } from 'react';

import * as api from '../../api';

/*
 * Props:
 * - setAuthenticated
 * - unsetAuthenticated
 */
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
        this.props.setAuthenticated();
        api.setAuthenticated();
      })
      .catch(err => {
        console.log(err);
        this.setState({invalidFeedback: true});
        this.props.unsetAuthenticated();
        api.unsetAuthenticated();
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
        <h5>Secret</h5>
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
