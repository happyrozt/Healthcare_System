
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: ["1,2,3,4,5"],
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setUsers, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
