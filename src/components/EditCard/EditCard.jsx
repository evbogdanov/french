import React from 'react';

/*
 * Props:
 * - onClickCancel
 */
const EditCard = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        {props.children}
      </div>
      <div className="card-footer text-center">
        <button type="button"
                onClick={props.onClickCancel}
                className="btn btn-secondary btn-sm">Cancel</button>
      </div>
    </div>
  );
};

export default EditCard;
