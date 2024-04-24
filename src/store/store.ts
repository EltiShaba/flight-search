// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './features/authTokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
