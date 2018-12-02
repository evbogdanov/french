import * as actions from './actions';
import reducer from './reducer';

describe('reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      isAuthenticated: false,
      words: [],
      phrases: [],
      searchPhrasesText: '',
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set auth', () => {
    expect(reducer(
      initialState,
      {type: actions.SET_AUTHENTICATED}
    ).isAuthenticated).toBeTruthy();
  });

  it('should unset auth', () => {
    const state = {...initialState, isAuthenticated: true};
    expect(reducer(
      state,
      {type: actions.UNSET_AUTHENTICATED}
    ).isAuthenticated).toBeFalsy();
  });

  it('should set words', () => {
    const words = [{id: 1}, {id: 2}];
    expect(reducer(
      initialState,
      {type: actions.SET_WORDS, data: {words}}
    ).words).toEqual(words);
  });

  it('should edit a word', () => {
    const word = {
      id: 2,
      text: 'mot',
      image: 'mot.jpg',
      notes: 'word',
      gender: 'm',
    };
    const wordsBefore = [{id: 1}, {id: 2}, {id: 3}];
    const wordsAfter = [{id: 1}, word, {id: 3}];
    const state = {
      ...initialState,
      words: wordsBefore,
    };
    expect(reducer(
      state,
      {type: actions.EDIT_WORD, data: {...word}}
    ).words).toEqual(wordsAfter);
  });

  it('should delete a word', () => {
    const id = 2;
    const word = {id};
    const wordsBefore = [{id: 1}, word, {id: 3}];
    const wordsAfter = [{id: 1}, {id: 3}];
    const state = {
      ...initialState,
      words: wordsBefore,
    };
    expect(reducer(
      state,
      {type: actions.DELETE_WORD, data: {id}}
    ).words).toEqual(wordsAfter);
  });

  it('should set phrases', () => {
    const phrases = [{id: 1}];
    expect(reducer(
      initialState,
      {type: actions.SET_PHRASES, data: {phrases}}
    ).phrases).toEqual(phrases);
  });

  it('should edit a phrase', () => {
    const phrase = {
      id: 2,
      text: 'je suis',
      image: 'chui.jpg',
      notes: 'I am',
    };
    const phrasesBefore = [{id: 1}, {id: 2}, {id: 3}];
    const phrasesAfter = [{id: 1}, phrase, {id: 3}];
    const state = {
      ...initialState,
      phrases: phrasesBefore,
    };
    expect(reducer(
      state,
      {type: actions.EDIT_PHRASE, data: {...phrase}}
    ).phrases).toEqual(phrasesAfter);
  });

  it('should delete a phrase', () => {
    const id = 2;
    const phrase = {id};
    const phrasesBefore = [{id: 1}, phrase, {id: 3}];
    const phrasesAfter = [{id: 1}, {id: 3}];
    const state = {
      ...initialState,
      phrases: phrasesBefore,
    };
    expect(reducer(
      state,
      {type: actions.DELETE_PHRASE, data: {id}}
    ).phrases).toEqual(phrasesAfter);
  });

  it('should add a related word', () => {
    const firstRelatedWord = {id: 1, text: 'un'};
    const [phraseId, wordId, wordText] = [2, 2, 'deux'];
    const relatedWord = {id: wordId, text: wordText};
    const phrasesBefore = [
      {id: 1},
      {id: phraseId, related_words: [firstRelatedWord]},
      {id: 3},
    ];
    const phrasesAfter = [
      {id: 1},
      {id: phraseId, related_words: [firstRelatedWord, relatedWord]},
      {id: 3},
    ];
    const state = {
      ...initialState,
      phrases: phrasesBefore,
    };
    expect(reducer(
      state,
      {type: actions.ADD_RELATED_WORD, data: {phraseId, wordId, wordText}}
    ).phrases).toEqual(phrasesAfter);
  });

  it('should remove a related word', () => {
    const phrasesBefore = [
      {id: 1},
      {id: 2, related_words: [{id: 1}, {id: 2}, {id: 3}]},
      {id: 3},
    ];
    const phrasesAfter = [
      {id: 1},
      {id: 2, related_words: [{id: 1}, {id: 3}]},
      {id: 3},
    ];
    const state = {
      ...initialState,
      phrases: phrasesBefore,
    };
    expect(reducer(
      state,
      {type: actions.REMOVE_RELATED_WORD, data: {phraseId: 2, wordId: 2}}
    ).phrases).toEqual(phrasesAfter);
  });

  it('should set a phrase searching text', () => {
    const searchPhrasesText = 'Cherchez la femme';
    expect(reducer(
      initialState,
      {type: actions.SET_SEARCH_PHRASES_TEXT, data: {searchPhrasesText}}
    ).searchPhrasesText).toBe(searchPhrasesText);
  });
});
