import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface IQuestion {
    receivedBy: string[]
    point: number
    skill: string[]
    time: number
    status: string
    _id: string
    title: string
    menteeId: string
    menteeName: string
    content: string
    note: string
    createAt: string
    __v: number
}

interface QuestionState {
    list: IQuestion[]
}

const initialState: QuestionState = {
    list: [],
}

export const questionsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        updateQuestions: (state, action: PayloadAction<IQuestion[]>) => {
            state.list = action.payload
        },
    },
})

export const { updateQuestions } = questionsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectQuestions = (state: RootState) => state.questions.list

export default questionsSlice.reducer
