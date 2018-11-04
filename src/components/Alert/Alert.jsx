import React from 'react';

/*
 * Props:
 * - type ("success" or "danger")
 * - text
 */
const Alert = (props) => {
  return (
    <div className={`alert alert-${props.type}`} role="alert">
      {props.text}
    </div>
  );
};

export default Alert;
