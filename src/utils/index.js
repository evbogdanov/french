import { WORD_PROPS } from '../models/word';
import { PHRASE_PROPS } from '../models/phrase';

////////////////////////////////////////////////////////////////////////////////
/// Convert days ago to time ago
////////////////////////////////////////////////////////////////////////////////

// Note: scientific precision is not required

const singularOrPlural = (unit, count) => {
  return (count === 1 ? `a ${unit}` : `${count} ${unit}s`) + ' ago';
};

export const toTimeAgo = days => {
  // Days
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days > 1 && days < 7) return `${days} days ago`;

  // Weeks
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return singularOrPlural('week', weeks);
  }

  // Months
  if (days < 365) {
    const months = Math.floor(days / 30);
    return singularOrPlural('month', months);
  }

  // Years
  const years = Math.floor(days / 365);
  return singularOrPlural('year', years);
};

////////////////////////////////////////////////////////////////////////////////
/// Debounce
////////////////////////////////////////////////////////////////////////////////

// https://css-tricks.com/debouncing-throttling-explained-examples/
//
// This is a simplified debounce function. Its primary use case is waiting for
// the last letter typed in Suggestions component.
//
// TODO: switch to underscore / lodash in the future

export const debounce = (func, wait) => {
  let timeout = null;

  const debounced = (...args) => {
    const callMeLater = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(callMeLater, wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

////////////////////////////////////////////////////////////////////////////////
/// Helper: did the server return a custom error?
////////////////////////////////////////////////////////////////////////////////

// This should match `ERROR_OTHER` const in `french-api` repo
const CUSTOM_ERROR_CODE = 418;

export const getCustomErrorMessage = error => {
  if (
    error.hasOwnProperty('response') &&
    error.response.hasOwnProperty('status') &&
    error.response.status === CUSTOM_ERROR_CODE
  ) {
    return error.response.data.message;
  }
  return '';
};

////////////////////////////////////////////////////////////////////////////////
/// Helper: next state for a changed input
////////////////////////////////////////////////////////////////////////////////

export const getNextStateForChangedInput = (event, inputName) => {
  const nextState = {
    successText: '',
    dangerText: ''
  };
  nextState[inputName] = event.target.value;
  return nextState;
};

////////////////////////////////////////////////////////////////////////////////
/// Get slice of properties from a given object
////////////////////////////////////////////////////////////////////////////////

export const selectProps = (obj, props) => {
  const selected = {};
  for (const prop of props) {
    if (obj.hasOwnProperty(prop)) selected[prop] = obj[prop];
  }
  return selected;
};

export const selectWordProps = obj => selectProps(obj, WORD_PROPS);
export const selectPhraseProps = obj => selectProps(obj, PHRASE_PROPS);
