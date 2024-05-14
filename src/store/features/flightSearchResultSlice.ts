import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightSearchResult {
  data: object[] | null;
}

const initialState: FlightSearchResult = {
  data: [],
};

const flightSearchResultSlice = createSlice({
  name: 'flightSearchResult',
  initialState,
  reducers: {
    setFlightSearchResult: (state, action: PayloadAction<object[]>) => {
      state.data = action.payload.data;
    },
  },
});

export const { setFlightSearchResult } = flightSearchResultSlice.actions;
export default flightSearchResultSlice;
