import React from 'react';

/*
 * Props:
 * - header
 * - image
 * - notes
 * - extraBody (optional)
 * - days_ago
 * - extraClassName (optional)
 * - canEdit (optional)
 * - onClickEdit (optional if !canEdit)
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

  let edit = null;
  if (props.canEdit) {
    edit = (
      <span className="Card__edit-btn"
            onClick={props.onClickEdit}>Edit</span>
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
        {notes}
        {props.extraBody}
        <div className="card-text row Card__footer">
          <div className="col-9 text-muted">{timeAgo}</div>
          <div className="col-3 Card__edit">
            {edit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
