import React from 'react';

const DEFAULT_MAX_LENGTH = 1000;

/*
 * Props:
 * - id
 * - label
 * - value
 * - handleChange
 * - type (optional, default is "text")
 * - placeholder (optional)
 * - maxLength (optional)
 * - isTextarea (optional)
 * - isValid (optional)
 * - isInvalid (optional)
 * - validFeedback (optional)
 * - invalidFeedback (optional)
 */
const Input = (props) => {
  const classes = [
    'form-control',
  ];
  if (props.isValid) {
    classes.push('is-valid');
  }
  if (props.isInvalid) {
    classes.push('is-invalid');
  }
  const className = classes.join(' ');

  const placeholder = props.placeholder || '',
        maxLength = props.maxLength || DEFAULT_MAX_LENGTH;
  
  let input = null;
  if (props.isTextarea) {
    input = (
      <textarea className={className}
                id={props.id}
                placeholder={placeholder}
                maxLength={maxLength}
                value={props.value}
                onChange={props.handleChange}
                rows="3"></textarea>
    );
  }
  else {
    const type = props.type || 'text';
    input = (
      <input type={type}
             className={className}
             id={props.id}
             placeholder={placeholder}
             maxLength={maxLength}
             value={props.value}
             onChange={props.handleChange}
             autoComplete="off" />
    );  
  }

  let feedback = null;
  if (props.validFeedback) {
    feedback = <div className="valid-feedback">{props.validFeedback}</div>;
  }
  else if (props.invalidFeedback) {
    feedback = <div className="invalid-feedback">{props.invalidFeedback}</div>;
  }

  return (
    <div className="form-group row">
      <label htmlFor={props.id}
             className="col-sm-2 col-form-label">{props.label}</label>
      <div className="col-sm-10">
        {input}
        {feedback}
      </div>
    </div>
  );
};

export default Input;
