import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import StatusCodes from 'http-status-codes';
import {isAuthAPI, loginAPI, signupAPI} from '../../api/account';

import {addNotification} from './Notifications';

const initialState = {
  isAuth: false,
  loading: 'idle',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('account/login/pending', (state) => {
      state.loading = 'pending';
    });
    builder.addCase('account/login/fulfilled', (state) => {
      state.loading = 'fulfilled';
    });
    builder.addCase('account/login/rejected', (state) => {
      state.loading = 'rejected';
    });
    builder.addCase('account/signup/pending', (state) => {
      state.loading = 'pending';
    });
    builder.addCase('account/signup/fulfilled', (state) => {
      state.loading = 'fulfilled';
    });
    builder.addCase('account/signup/rejected', (state) => {
      state.loading = 'rejected';
    });
  },
});

export default accountSlice.reducer;

const {login, logout} = accountSlice.actions;

export const isLoggedIn = createAsyncThunk(
  'account/login',
  async (_, {dispatch}) => {
    dispatch(
      addNotification({
        message: 'Checking if you are logged in...',
        title: 'Checking',
      })
    );

    const resp = await isAuthAPI();
    const {status} = resp;

    if (status === StatusCodes.OK) {
      dispatch(addNotification({message: 'Welcome back!', title: 'Welcome'}));
      return dispatch(login());
    } else {
      return dispatch(logout());
    }
  }
);

export const loginUser = createAsyncThunk(
  'account/login',
  async (payload, {dispatch}) => {
    const {email, password} = payload;
    const {data, status} = await loginAPI(email, password);
    if (status === StatusCodes.OK) {
      dispatch(addNotification({message: 'Welcome back!', title: 'Welcome'}));
      return dispatch(login());
    }
    dispatch(addNotification(data));
  }
);

export const registerUser = createAsyncThunk(
  'account/signup',
  async (payload, {dispatch}) => {
    const {email, password} = payload;
    const {data, status} = await signupAPI(email, password);
    if (status === StatusCodes.OK) {
      dispatch(addNotification({message: 'Welcome!', title: 'Welcome'}));
      return dispatch(login());
    }
    dispatch(addNotification(data));
  }
);
