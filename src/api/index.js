import axios from 'axios';
import qs from 'query-string';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;


////////////////////////////////////////////////////////////////////////////////
/// Pagination
////////////////////////////////////////////////////////////////////////////////

export const WORDS_PER_PAGE = 30;
export const PHRASES_PER_PAGE = 30;


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
