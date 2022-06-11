import axios, { AxiosInstance } from 'axios';

const PORT = '5001';
const serverURL = `http://${window.location.hostname}:${PORT}/`;
export const customAxios: AxiosInstance = axios.create({
  baseURL: `${serverURL}`, // 기본 서버 주소 입력
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});
