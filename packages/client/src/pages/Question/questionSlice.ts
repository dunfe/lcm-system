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

interface QuestionState {
    all: IQuestion[]
    status: string
    error: string | undefined
}

const initialState: QuestionState = {
    all: [],
    status: 'idle',
    error: undefined,
}

export const add = createAsyncThunk(
    'questions/add',
    async (token: string, post) => {
        return questions.add(token, post)
    }
)

export const get = createAsyncThunk('questions/get', async (token: string) => {
    return questions.getNew(token)
})

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        questionUpdated(state, action) {
            const { id, question } = action.payload

            state.all = state.all.map((item) => {
                if (item._id !== id) {
                    return item
                }

                return {
                    ...item,
                    ...question,
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(add.fulfilled, (state, action) => {
            state.all.push(action.payload)
        })

        builder.addCase(get.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(get.fulfilled, (state, action) => {
            state.all = action.payload
            state.status = 'succeeded'
        })

        builder.addCase(get.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export const { questionUpdated } = questionSlice.actions

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
export const selectQuestionsStatus = (state: RootState) =>
    state.questions.status

export const selectQuestionById = (state: RootState, questionId) => {
    return state.questions.all.find((question) => question._id === questionId)
}

export default questionSlice.reducer
