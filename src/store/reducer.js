import * as api from '../api';
import * as actions from './actions';

////////////////////////////////////////////////////////////////////////////////
/// Initial state
////////////////////////////////////////////////////////////////////////////////

const initialState = {
  isAuthenticated: api.isAuthenticated(),
  words: [],
  phrases: [],
  searchPhrasesText: '',
};


////////////////////////////////////////////////////////////////////////////////
/// Auth
////////////////////////////////////////////////////////////////////////////////

const setAuthenticated = (state, action) => ({
  ...state,
  isAuthenticated: true
});

const unsetAuthenticated = (state, action) => ({
  ...state,
  isAuthenticated: false
});


////////////////////////////////////////////////////////////////////////////////
/// Words
////////////////////////////////////////////////////////////////////////////////

const setWords = (state, action) => ({
  ...state,
  words: action.data.words
});

const editWord = (state, action) => {
  const words = state.words.map(w => {
    if (w.id === action.data.id) {
      w.text = action.data.text;
      w.image = action.data.image;
      w.notes = action.data.notes;
      w.gender = action.data.gender;
    }
    return w;
  });
  return {
    ...state,
    words
  };
};

const deleteWord = (state, action) => {
  const words = state.words.filter(w => w.id !== action.data.id);
  return {
    ...state,
    words
  };
};


////////////////////////////////////////////////////////////////////////////////
/// Phrases
////////////////////////////////////////////////////////////////////////////////

const setPhrases = (state, action) => ({
  ...state,
  phrases: action.data.phrases
});

const editPhrase = (state, action) => {
  const phrases = state.phrases.map(p => {
    if (p.id === action.data.id) {
      p.text = action.data.text;
      p.image = action.data.image;
      p.notes = action.data.notes;
    }
    return p;
  });
  return {
    ...state,
    phrases
  };
};

const deletePhrase = (state, action) => {
  const phrases = state.phrases.filter(p => p.id !== action.data.id);
  return {
    ...state,
    phrases
  };
};

const addRelatedWord = (state, action) => {
  const phrases = state.phrases.map(p => {
    if (p.id === action.data.phraseId) {
      const word = {
        id: action.data.wordId,
        text: action.data.wordText,
      };
      if (Array.isArray(p.related_words)) {
        const words = p.related_words.filter(w => w.id !== action.data.wordId);
        words.push(word);
        p.related_words = words;
      }
      else {
        p.related_words = [word];
      }
    }
    return p;
  });
  return {
    ...state,
    phrases
  };
};

const removeRelatedWord = (state, action) => {
  const phrases = state.phrases.map(p => {
    if (p.id === action.data.phraseId && Array.isArray(p.related_words)) {
      const words = p.related_words.filter(w => w.id !== action.data.wordId);
      p.related_words = words;
    }
    return p;
  });
  return {
    ...state,
    phrases
  };
};

const setSearchPhrasesText = (state, action) => {
  return {
    ...state,
    searchPhrasesText: action.data.searchPhrasesText
  };
};


////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_AUTHENTICATED:
    return setAuthenticated(state, action);
  case actions.UNSET_AUTHENTICATED:
    return unsetAuthenticated(state, action);
  case actions.SET_WORDS:
    return setWords(state, action);
  case actions.EDIT_WORD:
    return editWord(state, action);
  case actions.DELETE_WORD:
    return deleteWord(state, action);
  case actions.SET_PHRASES:
    return setPhrases(state, action);
  case actions.EDIT_PHRASE:
    return editPhrase(state, action);
  case actions.DELETE_PHRASE:
    return deletePhrase(state, action);
  case actions.ADD_RELATED_WORD:
    return addRelatedWord(state, action);
  case actions.REMOVE_RELATED_WORD:
    return removeRelatedWord(state, action);
  case actions.SET_SEARCH_PHRASES_TEXT:
    return setSearchPhrasesText(state, action);
  default:
    return state;
  }
};

export default reducer;
