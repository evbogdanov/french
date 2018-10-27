import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


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
/// Wrapper around axios
////////////////////////////////////////////////////////////////////////////////

export const get = (url) => {
  return axios.get(`${API_URL}${url}`);
};

export const post = (url, data=null) => {
  return axios.post(
    `${API_URL}${url}`,
    data,
    {
      headers: {'FR_SECRET': getSecret()},
    }
  );
};
