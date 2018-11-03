import React from 'react';

/*
 * Props
 * - text (optional)
 */
const InputSubmit = (props) => {
  const text = props.text || 'Submit';

  return (
    <div className="form-group row">
      <div className="col-sm-2"></div>
      <div className="col-sm-10">
        <button type="submit" className="btn btn-primary">{text}</button>
      </div>
    </div>
  );
};

export default InputSubmit;
