import {configureStore} from '@reduxjs/toolkit';

import accountReducer from './slice/Account';
import galleryReducer from './slice/Gallery';
import notificationReducer from './slice/Notifications';

const store = configureStore({
  reducer: {
    account: accountReducer,
    gallery: galleryReducer,
    toast: notificationReducer,
  },
});

export default store;
