import axios from 'axios';
import api from './api-wrapper';

const getGalleryAPI = async (filter) => {
  return api(axios.get('/gallery', {params: {filter}}));
};

const addItemToGalleryAPI = async (title, url) => {
  return api(axios.post('/gallery', {title, url}));
};

const removeItemFromGalleryAPI = async (id) => {
  return api(axios.patch('/gallery', {id}));
};

const wallHavenAPI = async (filter, page = 1) => {
  return api(
    axios.get('/proxy/wallhaven', {params: {filter: filter, page: page}})
  );
};

export {
  getGalleryAPI,
  addItemToGalleryAPI,
  removeItemFromGalleryAPI,
  wallHavenAPI,
};
