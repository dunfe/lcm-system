import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import skillsReducer from '../features/skills/skillsSlice'
import menteesReducer from '../features/mentees/menteesSlice'
import mentorReducer from '../features/mentors/mentorsSlice'
import questionReducer from '../features/questions/questionsSlice'
import requestReducer from '../features/requests/requestsSlice'
import pointReducer from '../features/points/pointsSlice'

export const store = configureStore({
  reducer: {
    points: pointReducer,
    requests: requestReducer,
    questions: questionReducer,
    mentors: mentorReducer,
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
