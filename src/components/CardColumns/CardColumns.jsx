import React from 'react';

const CardColumns = (props) => {
  return (
    <div className="card-columns">
      {props.children}
    </div>
  );
};

export default CardColumns;
