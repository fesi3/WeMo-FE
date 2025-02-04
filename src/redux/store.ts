import { configureStore, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import authReducer from './authReducers';
import toastReducer from './toastReducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, undefined, UnknownAction>;

export default store;
