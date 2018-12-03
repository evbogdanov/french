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
