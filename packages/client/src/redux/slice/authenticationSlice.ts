import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IsAuthenticated {
  isAuthenticated: boolean;
}

interface IUser {
  email: string;
  password;
  string;
}

// The initial state of the HackerNews component
export const initialState: IsAuthenticated = {
  isAuthenticated: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<IUser>) {
      state.isAuthenticated = true;
    },
    signOut(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { name, actions, reducer } = authenticationSlice;
