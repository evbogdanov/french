import React from 'react';

/*
 * Props:
 * - header
 * - image
 * - body
 * - time
 * - extraClassName (optional)
 */
const Card = (props) => {
  const classes = ['card', 'Card'];
  if (props.extraClassName) {
    classes.push(props.extraClassName);
  }
  const className = classes.join(' ');

  let image = null;
  if (props.image) {
    image = (
      <div className="Card__image">
        <img alt="" src={props.image} />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="card-header Card__header">
        <div className="Card__header-inner">
          {props.header}
        </div>
      </div>
      <div className="card-body Card__body">
        {image}
        {props.body}
        <p className="card-text"><small className="text-muted">{props.time}</small></p>
      </div>
    </div>
  );
};

export default Card;
