import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightSearchResult {
  data: object[] | null;
}

const initialState: FlightSearchResult = {
  data: [],
};

const FlightSearchResultSlice = createSlice({
  name: 'flightSearchResult',
  initialState,
  reducers: {
    setFlightSearchResult: (state, action: PayloadAction<object[]>) => {
        console.log('action', action)
        state = action.payload.data;
    },
  },
});

export const { setFlightSearchResult } = FlightSearchResultSlice.actions;
export default FlightSearchResultSlice;
