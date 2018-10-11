import React from 'react';
import Card from '../Card/Card';

/*
 * Props:
 * - phrase
 */
const PhraseCard = (props) => {
  const p = props.phrase;

  let notes = null;
  if (p.notes) {
    notes = <p className="card-text">{p.notes}</p>;
  }

  let relatedWords = null;
  if (p.relatedWords.length) {
    const words = p.relatedWords.map(w => {
      return (
        <a key={w.id}
           href={`/words/link-to-word-with-id-${w.id}`}
           className="card-link">{w.text}</a>
      );
    });
    relatedWords = <p className="card-text">{words}</p>;
  }

  const body = (
    <>
      {notes}
      {relatedWords}
    </>
  );

  return <Card header={p.text}
               image={p.image}
               body={body}
               time={p.time} />;
};

export default PhraseCard;
