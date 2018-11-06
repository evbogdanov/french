import React from 'react';
import Card from '../Card/Card';

/*
 * Props:
 * - word
 */
const WordCard = (props) => {
  const w = props.word;

  let extraClassName = '';
  if (w.gender) {
    extraClassName = `WordCard_gender_${w.gender}`;
  }

  return <Card extraClassName={extraClassName}
               header={w.text}
               image={w.image}
               notes={w.notes}
               days_ago={w.days_ago} />;
};

export default WordCard;
