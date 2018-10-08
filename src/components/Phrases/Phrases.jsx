import React from 'react';
import Heading from '../Heading/Heading';
import CardColumns from '../CardColumns/CardColumns';
import PhraseCard from '../PhraseCard/PhraseCard';

const phrases = [
  {
    id: 1,
    text: 'Paroles, paroles',
    notes: 'Words, words',
    relatedWords: [],
    time: '1 day ago',
  },
  {
    id: 2,
    text: 'Encore des mots toujours des mots',
    notes: 'Still words always words',
    relatedWords: [],
    time: '1 day ago',
  },
  {
    id: 3,
    text: 'T\'es pas tout neuf, mais pas si vieux',
    notes: 'You\'re not new, but not so old',
    relatedWords: [],
    time: '1 day ago',
  },
  {
    id: 4,
    text: 'Mes dents sont sensible',
    notes: 'My teeth are sensitive',
    relatedWords: [
      {id: 1, text: 'dent'},
    ],
    time: '1 day ago',
  },
  {
    id: 5,
    text: 'Quelque chose',
    notes: 'Something',
    relatedWords: [
      {id: 1, text: 'chose'},
      {id: 2, text: 'quelque'},
    ],
    time: '1 day ago',
  },
];

const Phrases = (props) => {
  const phraseCards = phrases.map(p => <PhraseCard key={p.id} phrase={p} />);

  return (
    <>
      <Heading>Phrases</Heading>
      <div className="Phrases__form">
        <input className="form-control Phrases__form-control"
               type="text"
               placeholder="Search for a phrase..." />
      </div>
      <CardColumns>
        {phraseCards}
      </CardColumns>
    </>
  );
};

export default Phrases;
