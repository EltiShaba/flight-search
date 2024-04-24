import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  value: string | null;
}

const initialState: TokenState = {
  value: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice;
