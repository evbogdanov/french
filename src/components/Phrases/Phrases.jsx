import React from 'react';
import PhraseCard from '../PhraseCard/PhraseCard';

const phrase = {
  text: 'Quelque chose',
  notes: 'Something',
  relatedWords: [
    {id: 1, text: 'chose'},
    {id: 2, text: 'quelque'},
  ],
  time: '1 day ago',
};

const Phrases = (props) => {
  return (
    <>
      <h1 className="display-4">Phrases</h1>
      <div className="Phrases__search-form">
        <input className="form-control form-control-lg"
               type="text"
               placeholder="Search phrases" />
      </div>
      <PhraseCard phrase={phrase} />
    </>
  );
};

export default Phrases;
