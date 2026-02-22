import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/users';

interface IUserState {
  userDetails: User | null;
}

const initialState: IUserState = {
  userDetails: null,
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User>) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const userDetailsActions = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
export const UserDetailsReducer = userDetailsSlice.reducer;