import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const get = (url) => {
  return axios.get(`${API_URL}${url}`);
};
