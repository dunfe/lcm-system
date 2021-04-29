import { IQuestion } from './questionSlice'
import { RootState } from '../../app/store'
import { questions } from '../../utils/api/questions'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface IUpdateQuestion {
    token: string
    id: string
    question: any
}

export interface IEditModal {
    visible: boolean
    id: string
}

interface QuestionState {
    question: IQuestion | null
    status: string
    error: string | undefined
    selectedQuestionId: string
    editModalVisible: boolean
}

const initialState: QuestionState = {
    question: null,
    status: 'idle',
    selectedQuestionId: '',
    error: undefined,
    editModalVisible: false,
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
    reducers: {
        showEditModal: (state, action) => {
            const { visible, id } = action.payload

            state.editModalVisible = visible
            state.selectedQuestionId = id
        },
    },
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

export const { showEditModal } = updateQuestionSlice.actions

export const selectUpdateQuestionStatus = (state: RootState) =>
    state.updateQuestion.status
export const selectEditModalVisible = (state: RootState) =>
    state.updateQuestion.editModalVisible

export const selectSelectedId = (state: RootState) =>
    state.updateQuestion.selectedQuestionId

export default updateQuestionSlice.reducer
