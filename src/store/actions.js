export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const UNSET_AUTHENTICATED = 'UNSET_AUTHENTICATED';

export const SET_WORDS = 'SET_WORDS';
export const EDIT_WORD = 'EDIT_WORD';
export const DELETE_WORD = 'DELETE_WORD';

export const SET_PHRASES = 'SET_PHRASES';
export const EDIT_PHRASE = 'EDIT_PHRASE';
export const DELETE_PHRASE = 'DELETE_PHRASE';

export const ADD_RELATED_WORD = 'ADD_RELATED_WORD';
export const REMOVE_RELATED_WORD = 'REMOVE_RELATED_WORD';

export const SET_SEARCH_PHRASES_TEXT = 'SET_SEARCH_PHRASES_TEXT';

////////////////////////////////////////////////////////////////////////////////
/// Action creators
////////////////////////////////////////////////////////////////////////////////

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED
});

export const unsetAuthenticated = () => ({
  type: UNSET_AUTHENTICATED
});

export const setWords = words => ({
  type: SET_WORDS,
  data: { words }
});

export const editWord = word => ({
  type: EDIT_WORD,
  data: { word }
});

export const deleteWord = id => ({
  type: DELETE_WORD,
  data: { id }
});

// TODO: action creators for phrases
