import { toTimeAgo } from '.';

describe('utils', () => {
  it('should return days ago', () => {
    expect(toTimeAgo(0)).toBe('today');
    expect(toTimeAgo(1)).toBe('yesterday');
    expect(toTimeAgo(2)).toBe('2 days ago');
    expect(toTimeAgo(6)).toBe('6 days ago');
  });

  it('should return weeks ago', () => {
    expect(toTimeAgo(7)).toBe('a week ago');
    expect(toTimeAgo(13)).toBe('a week ago');
    expect(toTimeAgo(14)).toBe('2 weeks ago');
    expect(toTimeAgo(20)).toBe('2 weeks ago');
    expect(toTimeAgo(21)).toBe('3 weeks ago');
    expect(toTimeAgo(27)).toBe('3 weeks ago');
    expect(toTimeAgo(28)).toBe('4 weeks ago');
    expect(toTimeAgo(29)).toBe('4 weeks ago');
  });

  it('should return months ago', () => {
    expect(toTimeAgo(30)).toBe('a month ago');
    expect(toTimeAgo(59)).toBe('a month ago');
    expect(toTimeAgo(60)).toBe('2 months ago');
    expect(toTimeAgo(364)).toBe('12 months ago');
  });

  it('should return years ago', () => {
    expect(toTimeAgo(365)).toBe('a year ago');
    expect(toTimeAgo(729)).toBe('a year ago');
    expect(toTimeAgo(730)).toBe('2 years ago');
  });
});
