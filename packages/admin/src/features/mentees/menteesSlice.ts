import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface IUserDetail {
  rate: {
    totalRating1: number
    totalRating2: number
    totalRating3: number
    totalRating4: number
    totalRating5: number
  }
  detail: {
    dob: string
    gender: string
    phone: number
    address: string
    avatar: string
    currentJob: string
    achievement: string[]
    totalQuestion: number
  }
  passportId: string
  loginType: string
  role: string
  level: number
  github: string
  skill: string[]
  bio: string
  matchingMentor: string[]
  currentPoint: number
  passwordChangedAt: string
  passwordResetToken: string
  passwordResetExpires: string
  createdAt: string
  _id: string
  reviews: string[]
  pointOutHistory: string[]
  pointInHistory: string[]
  username: string
  password: string
  email: string
  fullname: string
  __v: number
  modifieAt: string
  favoriteMentor: string[]
}

interface SkillsState {
  list: IUserDetail[];
}

const initialState: SkillsState = {
  list: [],
};

export const menteesSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IUserDetail[]>) => {
      state.list = action.payload;
    },
  },
});

export const { update } = menteesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMentees = (state: RootState) => state.mentees.list;

export default menteesSlice.reducer;
