import axios from './axios';
import api from './api-wrapper';

const signupAPI = async (email, password) => {
  return api(axios.post('/account/signup', {email, password}));
};

const loginAPI = async (email, password) => {
  return api(axios.post('/account/login', {email, password}));
};

const getSettingsAPI = async () => {
  return api(axios.get('/account/settings'));
};

const updateSettingsAPI = async (settings) => {
  return api(axios.patch('/account/settings', settings));
};

const isAuthAPI = async () => {
  return api(axios.get('/account/auth'));
};

export {signupAPI, loginAPI, getSettingsAPI, updateSettingsAPI, isAuthAPI};
