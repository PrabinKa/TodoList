import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IToken {
  accessToken: string;
}

const initialState: IToken = {
  accessToken: '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: state => {
      state.accessToken = '';
    },
  },
});

export const tokenActions = tokenSlice.actions;
export default tokenSlice.reducer;
export const TokenReducer = tokenSlice.reducer;