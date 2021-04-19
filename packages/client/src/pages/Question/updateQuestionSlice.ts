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

export interface IUpdateQuestion {
    token: string
    id: string
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

export const update = createAsyncThunk(
    'questions/update',
    async (payload: IUpdateQuestion) => {
        const { token, id, question } = payload
        return questions.update(token, id, question)
    }
)

export const updateQuestionSlice = createSlice({
    name: 'updateQuestion',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(update.fulfilled, (state, action) => {
            state.question = action.payload

            state.status = 'succeeded'
        })

        builder.addCase(update.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(update.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export const selectUpdateQuestionStatus = (state: RootState) =>
    state.updateQuestion.status

export default updateQuestionSlice.reducer
