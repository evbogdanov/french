import React from 'react';
import Suggestions from '../Suggestions/Suggestions';

/*
 * Props:
 * - relatedWords
 * - addWord
 * - removeWord
 * - suggestionsText
 * - onSuggestionsTextChange
 */
const EditRelatedWords = (props) => {
  const words = props.relatedWords.map(w => (
    <li key={w.id}>
      <span>{w.text}</span>
      <button className="btn btn-sm btn-link"
              onClick={() => props.removeWord(w.id)}>Remove</button>
    </li>
  ));

  return (
    <>
      <ul>
        {words}
      </ul>
      <div className="form-group">
        <input className="form-control form-control-sm"
               type="text"
               placeholder="Search for a related word"
               value={props.suggestionsText}
               onChange={props.onSuggestionsTextChange} />
      </div>
      <Suggestions text={props.suggestionsText}
                   model="words"
                   handleSuggestionClick={props.addWord} />
    </>
  );
};

export default EditRelatedWords;
