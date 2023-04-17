import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_deployed ? process.env.REACT_APP_deployed : '',
  crossDomain: true,
  withCredentials: true,
});

console.log(process.env.deployed, 'deploayed env');

export default axiosInstance;
