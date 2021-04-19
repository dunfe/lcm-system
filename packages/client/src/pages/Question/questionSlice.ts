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
    newQuestion: IQuestion[]
    doneQuestion: IQuestion[]
    totalNew: number
    totalDone: number
    total: number
    status: string
    error: string | undefined
}

const initialState: QuestionState = {
    all: [],
    newQuestion: [],
    doneQuestion: [],
    totalNew: 0,
    totalDone: 0,
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

export const getNew = createAsyncThunk(
    'questions/getnew',
    async (payload: IGetQuestion) => {
        const { token, page } = payload
        return questions.getNew(token, page)
    }
)

export const getDone = createAsyncThunk(
    'questions/getdone',
    async (payload: IGetQuestion) => {
        const { token, page } = payload
        return questions.getDone(token, page)
    }
)

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        deleteQuestion: (state, action) => {
            const id = action.payload
            if (id) {
                state.newQuestion = state.newQuestion.filter(
                    (item) => item._id !== id
                )
                state.totalNew = state.totalNew - 1
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(get.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(get.fulfilled, (state, action) => {
            const { totalItem, results } = action.payload
            if (results) {
                state.all = results
            }
            state.total = totalItem
            state.status = 'succeeded'
        })

        builder.addCase(get.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

        builder.addCase(getNew.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(getNew.fulfilled, (state, action) => {
            const { totalItem, results } = action.payload
            if (results) {
                state.newQuestion = results
            }
            state.totalNew = totalItem
            state.status = 'succeeded'
        })

        builder.addCase(getNew.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

        builder.addCase(getDone.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(getDone.fulfilled, (state, action) => {
            const { totalItem, results } = action.payload
            if (results) {
                state.doneQuestion = results
            }
            state.totalDone = totalItem
            state.status = 'succeeded'
        })

        builder.addCase(getDone.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export const { deleteQuestion } = questionSlice.actions

export const selectNewQuestion = (state: RootState) => {
    return state.questions.newQuestion
}

export const selectTotalNewQuestion = (state: RootState) => {
    return state.questions.totalNew
}

export const selectOldQuestion = (state: RootState) => {
    return state.questions.doneQuestion
}

export const selectTotalOldQuestion = (state: RootState) => {
    return state.questions.totalDone
}

export const selectAllQuestion = (state: RootState) => {
    return state.questions.all
}

export const selectQuestionsStatus = (state: RootState) =>
    state.questions.status

export const selectTotalQuestions = (state: RootState) => state.questions.total
export const selectTotalNewQuestions = (state: RootState) =>
    state.questions.totalNew
export const selectTotalDoneQuestions = (state: RootState) =>
    state.questions.totalDone

export const selectQuestionById = (state: RootState, questionId) => {
    return state.questions.all.find((question) => question._id === questionId)
}

export default questionSlice.reducer
