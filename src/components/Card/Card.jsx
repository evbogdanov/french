import React from 'react';

/*
 * Props:
 * - header
 * - image
 * - notes
 * - extraBody (optional)
 * - days_ago
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

  let notes = null;
  if (props.notes) {
    notes = <p className="card-text Card__notes">{props.notes}</p>;
  }

  // TODO: handle weeks, months, years
  const daysAgo = props.days_ago;
  let timeAgo = 'today';
  if (daysAgo === 1) timeAgo = 'yesterday';
  if (daysAgo > 1) timeAgo = `${daysAgo} days ago`;

  return (
    <div className={className}>
      <div className="card-header Card__header">
        <div className="Card__header-inner">
          {props.header}
        </div>
      </div>
      <div className="card-body Card__body">
        {image}
        {notes}
        {props.extraBody}
        <p className="card-text"><small className="text-muted">{timeAgo}</small></p>
      </div>
    </div>
  );
};

export default Card;
