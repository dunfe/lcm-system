import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import skillsReducer from '../features/skill/skillsSlice'
import questionReducer from '../pages/Question/questionSlice'
import addQuestionReducer from '../pages/Question/addQuestionSlice'
import updateQuestionReducer from '../pages/Question/updateQuestionSlice'
import userReducer from '../pages/Dashboard/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        skills: skillsReducer,
        addQuestion: addQuestionReducer,
        updateQuestion: updateQuestionReducer,
        questions: questionReducer,
        counter: counterReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
