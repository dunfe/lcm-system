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

interface IGetQuestion {
    token: string
    page: number
}

interface QuestionState {
    all: IQuestion[]
    current: number
    total: number
    status: string
    error: string | undefined
}

const initialState: QuestionState = {
    all: [],
    current: 1,
    total: 0,
    status: 'idle',
    error: undefined,
}

export const get = createAsyncThunk(
    'questions/get',
    async (payload: IGetQuestion) => {
        const { token, page } = payload
        return questions.get(token, page)
    }
)

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        next: (state) => {
            if (state.current < state.total) {
                state.current += 1
            }
        },
        prev: (state) => {
            if (state.current > 1) {
                state.current -= 1
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(get.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(get.fulfilled, (state, action) => {
            const { totalPage, results } = action.payload
            state.all = results
            state.total = totalPage
            state.status = 'succeeded'
        })

        builder.addCase(get.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export const { next, prev } = questionSlice.actions

export const selectNewQuestion = (state: RootState) => {
    return state.questions.all.filter((question) => {
        if (question.status === 'new' || question.status === 'doing') {
            return question
        }
    })
}
export const selectOldQuestion = (state: RootState) => {
    return state.questions.all.filter((question) => question.status === 'done')
}

export const selectAllQuestion = (state: RootState) => {
    return state.questions.all
}
export const selectQuestionsStatus = (state: RootState) =>
    state.questions.status

export const selectTotalQuestions = (state: RootState) => state.questions.total

export const selectCurrentQuestions = (state: RootState) =>
    state.questions.current

export const selectQuestionById = (state: RootState, questionId) => {
    return state.questions.all.find((question) => question._id === questionId)
}

export default questionSlice.reducer
