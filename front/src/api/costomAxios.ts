import axios, { AxiosInstance } from 'axios';

const serverURL = `${process.env.REACT_APP_API_SERVER}`;
const aiURL = `${process.env.REACT_APP_API_AI}`;

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${serverURL}`, // 기본 서버 주소 입력
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('userToken')}`,
  },
});
export const customAxiosFileUpload: AxiosInstance = axios.create({
  baseURL: `${serverURL}`, // 기본 서버 주소 입력
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `${localStorage.getItem('userToken')}`,
  },
});

export const customAxiosForAi: AxiosInstance = axios.create({
  baseURL: `${aiURL}`, // 기본 서버 주소 입력
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('userToken')}`,
  },
});
