import React from 'react';
import Card from '../Card/Card';

/*
 * Props:
 * - word
 */
const WordCard = (props) => {
  const w = props.word;

  let notes = null;
  if (w.notes) {
    notes = <p className="card-text">{w.notes}</p>;
  }

  let extraClassName = '';
  if (w.gender) {
    extraClassName = `WordCard_gender_${w.gender}`;
  }

  return <Card extraClassName={extraClassName}
               header={w.text}
               image={w.image}
               body={notes}
               days_ago={w.days_ago} />;
};

export default WordCard;
