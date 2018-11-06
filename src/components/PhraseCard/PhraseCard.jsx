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
        <a key={w}
           href={`/no-link`} // TODO: no link; select this word as search query
           className="card-link">{w}</a>
      );
    });
    relatedWords = <p className="card-text">{words}</p>;
  }

  return <Card header={p.text}
               image={p.image}
               notes={p.notes}
               extraBody={relatedWords}
               days_ago={p.days_ago} />;
};

export default PhraseCard;
