import React from 'react';

const DEFAULT_MAX_LENGTH = 1000;

/*
 * Props:
 * - simple (optional)
 * - id (optional if simple===true)
 * - label
 * - value
 * - handleChange
 * - type (optional, default is "text")
 * - placeholder (optional)
 * - maxLength (optional)
 * - isTextarea (optional)
 * - textareaRows (optional, default is 3)
 * - isValid (optional)
 * - isInvalid (optional)
 * - validFeedback (optional)
 * - invalidFeedback (optional)
 * - readOnly (optional)
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
        maxLength = props.maxLength || DEFAULT_MAX_LENGTH,
        readOnly = props.readOnly || false;

  const params = {
    value: props.value,
    onChange: props.handleChange,
    className,
    placeholder,
    maxLength,
    readOnly,
  };
  if (!props.simple) {
    // Need id for clicable label
    params.id = props.id;
  }

  let input = null;
  if (props.isTextarea) {
    const rows = props.textareaRows || 3;
    input = (
      <textarea rows={rows} {...params}></textarea>
    );
  }
  else {
    const type = props.type || 'text';
    input = (
      <input type={type}
             autoComplete="off"
             {...params} />
    );  
  }

  let feedback = null;
  if (props.validFeedback) {
    feedback = <div className="valid-feedback">{props.validFeedback}</div>;
  }
  else if (props.invalidFeedback) {
    feedback = <div className="invalid-feedback">{props.invalidFeedback}</div>;
  }

  if (props.simple) {
    return (
      <div className="form-group">
        {input}
        {feedback}
      </div>
    );
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
