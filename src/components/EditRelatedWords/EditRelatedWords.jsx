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
  let relatedWords = null;
  if (props.relatedWords.length > 0) {
    const words = props.relatedWords.map(w => (
      <li key={w.id}>
        <span>{w.text}</span>
        <button className="btn btn-sm btn-link"
                onClick={() => props.removeWord(w.id)}>Remove</button>
      </li>
    ));
    relatedWords = <ul>{words}</ul>;
  }

  return (
    <>
      {relatedWords}
      <div className="form-group">
        <input className="form-control form-control-sm"
               type="text"
               placeholder="Search for related words"
               value={props.suggestionsText}
               onChange={props.onSuggestionsTextChange} />
      </div>
      <Suggestions text={props.suggestionsText}
                   model="words"
                   handleSuggestionClick={props.addWord}
                   extraClassName="Suggestions_sm" />
    </>
  );
};

export default EditRelatedWords;
