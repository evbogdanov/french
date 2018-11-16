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

export const get = axios.get;

export const post = (url, data=null) => {
  return axios.post(
    url,
    data,
    {
      headers: {'FR_SECRET': getSecret()},
    }
  );
};

export const put = (url, data=null) => {
  return axios.put(
    url,
    data,
    {
      headers: {'FR_SECRET': getSecret()},
    }
  );
};

export const del = (url) => {
  return axios.delete(
    url,
    {
      headers: {'FR_SECRET': getSecret()},
    }
  );
};
