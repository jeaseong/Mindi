import axios, { AxiosInstance } from 'axios';

const serverURL = `${process.env.REACT_APP_API_SERVER}`;
export const customAxios: AxiosInstance = axios.create({
  baseURL: `${serverURL}`, // 기본 서버 주소 입력
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});
export const customAxiosFileUpload: AxiosInstance = axios.create({
  baseURL: `${serverURL}`, // 기본 서버 주소 입력
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});
