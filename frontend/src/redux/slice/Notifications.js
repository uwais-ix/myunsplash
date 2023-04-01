import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  notifications: [
    // {
    //   message: 'Welcome to the app!',
    //   title: 'Welcome 1',
    //   _id: -1,
    // },
    // {
    //   message: 'Welcome to the app!',
    //   title: 'Welcome 2',
    //   _id: -2,
    // },
    // {
    //   message: 'Welcome to the app!',
    //   title: 'Welcome 3',
    //   _id: -3,
    // },
    // {
    //   message: 'Welcome to the app!',
    //   title: 'Welcome 4',
    //   _id: -4,
    // },
    // {
    //   message: 'Welcome to the app!',
    //   title: 'Welcome 5',
    //   _id: -5,
    // },
    // {
    //   message: 'Welcome to the app!',
    //   title: 'Welcome 6',
    //   _id: -6,
    // },
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    addNotification(state, action) {
      state.id++;
      state.notifications.push({...action.payload, _id: state.id});
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload
      );
    },
  },
});

export const {addNotification, removeNotification} = notificationsSlice.actions;

export default notificationsSlice.reducer;
