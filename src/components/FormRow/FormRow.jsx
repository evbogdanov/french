import React from 'react';

/*
 * Props:
 * - extraClassName (optional)
 */
const FormRow = (props) => {
  const classes = ['form-group', 'row'];
  if (props.extraClassName) {
    classes.push(props.extraClassName);
  }
  const className = classes.join(' ');

  return (
    <div className={className}>
      <div className="col-sm-2"></div>
      <div className="col-sm-10">
        {props.children}
      </div>
    </div>    
  );
};

export default FormRow;
