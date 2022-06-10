import axios from 'axios';

const PORT = '5001';
const serverURL = `http://${window.location.hostname}:${PORT}/`;

export const get = async (endpoint: any, params: any = '') => {
  return axios.get(serverURL + endpoint + params, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
};
