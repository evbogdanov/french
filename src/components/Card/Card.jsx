import React from 'react';

/*
 * Props:
 * - header
 * - body
 * - time
 */
const Card = (props) => {
  return (
    <div className="card Card">
      <div className="card-header Card__header">
        {props.header}
      </div>
      <div className="card-body">
        {props.body}
        <p className="card-text Card__time">{props.time}</p>
      </div>
    </div>
  );
};

export default Card;
