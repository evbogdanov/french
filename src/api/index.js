import axios from 'axios';
import qs from 'query-string';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;


////////////////////////////////////////////////////////////////////////////////
/// Handle query strings
////////////////////////////////////////////////////////////////////////////////

export const parseQueryString = (queryString) => {
  const parsed = qs.parse(queryString),
        text = parsed.text || '',
        offset = parseInt(parsed.offset, 10) || 0;
  return {text, offset};
};

export const toQueryString = qs.stringify;


////////////////////////////////////////////////////////////////////////////////
/// Pagination
////////////////////////////////////////////////////////////////////////////////

export const CARDS_PER_PAGE = 30;

export const prevQueryString = currentQueryString => {
  const {text, offset} = parseQueryString(currentQueryString);

  let nextOffset = offset - CARDS_PER_PAGE;
  if (nextOffset < 0) {
    nextOffset = 0;
  };

  return toQueryString({
    text,
    offset: nextOffset,
  });
};

export const nextQueryString = currentQueryString => {
  const {text, offset} = parseQueryString(currentQueryString);
  return toQueryString({
    text,
    offset: offset + CARDS_PER_PAGE,
  });
};


////////////////////////////////////////////////////////////////////////////////
/// Handle secret
////////////////////////////////////////////////////////////////////////////////

export const getSecret = () => {
  return localStorage.getItem('secret') || '';
};

export const setSecret = (secret) => {
  localStorage.setItem('secret', secret);
};


////////////////////////////////////////////////////////////////////////////////
/// Handle authentication
////////////////////////////////////////////////////////////////////////////////

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem('authenticated'));
};

export const setAuthenticated = () => {
  localStorage.setItem('authenticated', true);
};

export const unsetAuthenticated = () => {
  localStorage.removeItem('authenticated');
};


////////////////////////////////////////////////////////////////////////////////
/// Wrapper around axios
////////////////////////////////////////////////////////////////////////////////

const doRequest = (method, url, data) => {
  const args = [url];

  if (method === 'post' || method === 'put') {
    args.push(data);
  }

  args.push({
    headers: {'FR_SECRET': getSecret()},
  });

  return axios[method](...args);
};

export const get = axios.get;
export const post = (url, data=null) => doRequest('post', url, data);
export const put = (url, data=null) => doRequest('put', url, data);
export const del = url => doRequest('delete', url, null);
