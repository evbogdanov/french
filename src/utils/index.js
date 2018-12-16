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
