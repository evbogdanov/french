import * as api from '../api';
import * as actions from './actions';

const initialState = {
  isAuthenticated: api.isAuthenticated(),
  words: [],
  phrases: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_AUTHENTICATED:
    return {
      ...state,
      isAuthenticated: true
    };

  case actions.UNSET_AUTHENTICATED:
    return {
      ...state,
      isAuthenticated: false
    };

  case actions.SET_WORDS:
    return {
      ...state,
      words: action.data.words
    };

  case actions.EDIT_WORD:
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

  case actions.DELETE_WORD:
    const filteredWords = state.words.filter(w => w.id !== action.data.id);
    return {
      ...state,
      words: filteredWords
    };

  case actions.SET_PHRASES:
    return {
      ...state,
      phrases: action.data.phrases
    };

  case actions.EDIT_PHRASE:
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

  case actions.DELETE_PHRASE:
    const filteredPhrases = state.phrases.filter(p => p.id !== action.data.id);
    return {
      ...state,
      phrases: filteredPhrases
    };

  default:
    return state;
  }
};

export default reducer;
