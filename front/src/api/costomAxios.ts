import axios, { AxiosInstance } from 'axios';

const serverURL = `${process.env.REACT_APP_API_SERVER}`;
const accessToken = sessionStorage.getItem('userToken');

export const customAxiosFileUpload: AxiosInstance = axios.create({
  baseURL: `${serverURL}`, // 기본 서버 주소 입력
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  },
});

const Axios: AxiosInstance = axios.create({
  baseURL: `${serverURL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(async (config) => {
  const accessToken = sessionStorage.getItem('userToken');
  if (config && accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('에러 발생!', error);
    return Promise.reject(error.response.data);
  },
);

export { Axios };
