import React from 'react';
import Card from '../Card/Card';

/*
 * Props:
 * - phrase
 */
const PhraseCard = (props) => {
  const p = props.phrase;

  let relatedWords = null;
  if (Array.isArray(p.related_words)) {
    const words = p.related_words.map(w => {
      return (
        <span key={w.id}
              className="card-link PhraseCard__related-word">{w.text}</span>
      );
    });
    relatedWords = <p className="card-text">{words}</p>;
  }

  return <Card extraClassName="PhraseCard"
               header={p.text}
               image={p.image}
               notes={p.notes}
               extraBody={relatedWords}
               days_ago={p.days_ago} />;
};

export default PhraseCard;
