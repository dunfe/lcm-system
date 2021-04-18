import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { questions } from '../../utils/api/questions'

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

export interface IAddQuestion {
    token: string
    question: any
}

interface QuestionState {
    question: IQuestion | null
    status: string
    error: string | undefined
}

const initialState: QuestionState = {
    question: null,
    status: 'idle',
    error: undefined,
}

export const add = createAsyncThunk(
    'questions/add',
    async (payload: IAddQuestion) => {
        const { token, question } = payload
        return questions.add(token, question)
    }
)

export const addQuestionSlice = createSlice({
    name: 'addQuestion',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(add.fulfilled, (state, action) => {
            state.question = action.payload
            state.status = 'succeeded'
        })

        builder.addCase(add.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(add.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export const selectQuestionsStatus = (state: RootState) =>
    state.addQuestion.status

export default addQuestionSlice.reducer
