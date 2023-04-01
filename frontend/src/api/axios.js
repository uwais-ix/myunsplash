import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.deployed ? process.env.deployed : '',
  crossDomain: true,
  withCredentials: true,
});

export default axiosInstance;
