import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.deployed ? process.env.deployed : '',
  crossDomain: true,
  withCredentials: true,
});

console.log(process.env.deployed, 'deploayed env');

export default axiosInstance;
