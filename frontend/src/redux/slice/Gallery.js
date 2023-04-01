import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import StatusCodes from 'http-status-codes';
import {
  getGalleryAPI,
  addItemToGalleryAPI,
  removeItemFromGalleryAPI,
} from '../../api/gallery';
import {addNotification} from './Notifications';

const initialState = {
  gallery: [],
  loading: 'idle',
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setGallery(state, action) {
      state.gallery = action.payload;
    },
    addGalleryItem(state, action) {
      state.gallery.push(action.payload);
    },
    removeGalleryItem(state, action) {
      state.gallery = state.gallery.filter(
        (item) => item._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase('gallery/loadGallery/pending', (state) => {
      state.loading = 'pending';
    });
    builder.addCase('gallery/loadGallery/fulfilled', (state) => {
      state.loading = 'fulfilled';
    });
    builder.addCase('gallery/loadGallery/rejected', (state) => {
      state.loading = 'rejected';
    });
    builder.addCase('gallery/deleteImage/pending', (state) => {
      state.loading = 'deleting';
    });
    builder.addCase('gallery/deleteImage/fulfilled', (state) => {
      state.loading = 'deleteSuccess';
    });
    builder.addCase('gallery/deleteImage/rejected', (state) => {
      state.loading = 'deleteFailed';
    });
    builder.addCase('gallery/addImage/pending', (state) => {
      state.wallhavenStatus = 'pending';
    });
    builder.addCase('gallery/addImage/fulfilled', (state) => {
      state.wallhavenStatus = 'fulfilled';
    });
    builder.addCase('gallery/addImage/rejected', (state) => {
      state.wallhavenStatus = 'rejected';
    });
  },
});

const {setGallery, addGalleryItem, removeGalleryItem} = gallerySlice.actions;

export const loadGallery = createAsyncThunk(
  'gallery/loadGallery',
  async (_, {dispatch}) => {
    const {data, status} = await getGalleryAPI();

    if (status === StatusCodes.OK) {
      return dispatch(setGallery(data));
    }
  }
);

export const deleteImage = createAsyncThunk(
  'gallery/deleteImage',
  async (id, {dispatch}) => {
    const {status} = await removeItemFromGalleryAPI(id);

    if (status === StatusCodes.OK) {
      dispatch(addNotification({message: 'Image deleted', title: 'Deleted'}));
      return dispatch(removeGalleryItem(id));
    }

    dispatch(
      addNotification({
        title: 'Deletion failed',
        message: 'Please try again later',
      })
    );
  }
);

export const addImage = createAsyncThunk(
  'gallery/addImage',
  async (image, {dispatch}) => {
    const {data, status} = await addItemToGalleryAPI(image.title, image.url);

    if (status === 200) {
      dispatch(addNotification({message: 'Image added', title: 'Added'}));
      return dispatch(addGalleryItem(data));
    }

    dispatch(
      addNotification({
        message: 'Please try again later',
        title: 'Add Image Failed',
      })
    );
  }
);

export default gallerySlice.reducer;
