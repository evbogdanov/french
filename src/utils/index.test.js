import { toTimeAgo, debounce } from '.';

describe('utils', () => {
  it('should return days, weeks, months, years ago', () => {
    const tests = [
      [0, 'today'],
      [1, 'yesterday'],
      [2, '2 days ago'],
      [6, '6 days ago'],
      [7, 'a week ago'],
      [13, 'a week ago'],
      [14, '2 weeks ago'],
      [20, '2 weeks ago'],
      [21, '3 weeks ago'],
      [27, '3 weeks ago'],
      [28, '4 weeks ago'],
      [29, '4 weeks ago'],
      [30, 'a month ago'],
      [59, 'a month ago'],
      [60, '2 months ago'],
      [364, '12 months ago'],
      [365, 'a year ago'],
      [729, 'a year ago'],
      [730, '2 years ago'],
    ];
    for (const [days, timeAgo] of tests) {
      expect(toTimeAgo(days)).toBe(timeAgo);
    }
  });

  it('should debounce', done => {
    let counter = 0;
    const incr = () => counter += 1;
    const debouncedIncr = debounce(incr, 32);
    debouncedIncr();
    debouncedIncr();
    setTimeout(() => debouncedIncr(), 16);
    setTimeout(() => {
      expect(counter).toBe(1);
      done();
    }, 96);
  });

  it('should cancel debounce', done => {
    let counter = 0;
    const incr = () => counter += 1;
    const debouncedIncr = debounce(incr, 32);
    debouncedIncr();
    debouncedIncr.cancel();
    setTimeout(() => {
      expect(counter).toBe(0);
      done();
    }, 96);
  });
});
