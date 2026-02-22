import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/users';

interface IUsersState {
  usersList: User[];
}

const initialState: IUsersState = {
  usersList: [],
};

const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    setUsersList: (state, action: PayloadAction<User[]>) => {
      state.usersList = action.payload;
    },
    clearUsersList: (state) => {
      state.usersList = [];
    },
  },
});

export const usersListActions = usersListSlice.actions;
export default usersListSlice.reducer;
export const UsersListReducer = usersListSlice.reducer;
