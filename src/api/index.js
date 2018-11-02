import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;


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
  return localStorage.getItem('authenticated') || false;
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
