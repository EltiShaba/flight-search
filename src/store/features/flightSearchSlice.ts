import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightSearchState {
  selectedCabin: string;
  travelerType: string;
  departureAirport: string;
  destinationAirport: string;
  departureDate: Date | null;
  returnDate: Date | null;
  departureIataCode: string,
  destinationIataCode: string
}

const initialState: FlightSearchState = {
  selectedCabin: "",
  travelerType: '',
  departureAirport: "",
  destinationAirport: "",
  departureDate: null,
  returnDate: null,
  departureIataCode: '',
  destinationIataCode: ''
};
const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<object>) => {
      state.departureIataCode = action.payload.departureIataCode;
      state.destinationIataCode = action.payload.destinationIataCode;
      state.selectedCabin = action.payload.selectedCabin;
      state.travelerType = action.payload.travelerType;
      state.departureAirport = action.payload.departureAirport;
      state.destinationAirport = action.payload.destinationAirport;
      state.departureDate = action.payload.departureDate;
      state.returnDate = action.payload.returnDate;
    },
  },
});

export const { setData } = flightSearchSlice.actions;
export default flightSearchSlice;
