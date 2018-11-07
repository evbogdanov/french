import React from 'react';
import FormRow from '../FormRow/FormRow';
import Alert from '../Alert/Alert';

/*
 * Props:
 * - type ("success" or "danger")
 * - text
 */
const FormAlert = (props) => {
  return (
    <FormRow>
      <Alert type={props.type}
             text={props.text} />
    </FormRow>
  );
};

export default FormAlert;
