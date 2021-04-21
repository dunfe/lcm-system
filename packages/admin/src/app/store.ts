import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import skillsReducer from '../features/skills/skillsSlice'
import menteesReducer from '../features/mentees/menteesSlice'

export const store = configureStore({
  reducer: {
    mentees: menteesReducer,
    skills: skillsReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
