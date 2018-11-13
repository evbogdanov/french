import React from 'react';

const EditCard = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        {props.children}
      </div>
    </div>
  );
};

export default EditCard;
