import React from 'react';
import Heading from '../Heading/Heading';
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
      <Heading>Phrases</Heading>
      <div className="Phrases__form">
        <input className="form-control Phrases__form-control"
               type="text"
               placeholder="Search phrases" />
      </div>
      <PhraseCard phrase={phrase} />
    </>
  );
};

export default Phrases;
