import { createSlice } from '@reduxjs/toolkit';

export interface IsAuthenticated {
  isAuthenticated: boolean;
}
// The initial state of the HackerNews component
export const initialState: IsAuthenticated = {
  isAuthenticated: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    signIn(state) {
      state.isAuthenticated = true;
    },
    signOut(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { name, actions, reducer } = authenticationSlice;
