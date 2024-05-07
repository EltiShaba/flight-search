// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './features/authTokenSlice';
import flightSearchSlice from './features/flightSearchSlice';
import FlightSearchResultSlice from './features/flightSearchResultSlice';
export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    flightSearch: flightSearchSlice.reducer,
    flightSearchResult: FlightSearchResultSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
