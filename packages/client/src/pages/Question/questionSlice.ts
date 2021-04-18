import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    new: IQuestion[]
    old: IQuestion[]
    status: string
    error: string | null
}

const initialState: QuestionState = {
    new: [],
    old: [],
    status: 'idle',
    error: null,
}

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setNew: (state, action: PayloadAction<IQuestion[]>) => {
            state.new = action.payload
        },
        setOld: (state, action: PayloadAction<IQuestion[]>) => {
            state.old = action.payload
        },
    },
})

export const { setNew, setOld } = questionSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getNew = createAsyncThunk(
    'questions/new',
    async (token: string) => {
        return questions.getNew(token)
    }
)

export const getOld = createAsyncThunk(
    'questions/done',
    async (token: string) => {
        return questions.getDone(token)
    }
)

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewQuestion = (state: RootState) => state.question.new
export const selectOldQuestion = (state: RootState) => state.question.old
export const selectQuestionsStatus = (state: RootState) => state.question.status

export default questionSlice.reducer
