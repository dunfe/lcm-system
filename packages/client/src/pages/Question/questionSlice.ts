import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import { useAPI } from '../../utils/hooks/useAPI'

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
}

const initialState: QuestionState = {
    new: [],
    old: [],
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
export const getNew = (): AppThunk => (dispatch) => {
    const instance = useAPI()

    instance
        .get('/api/users/questions/done')
        .then((response) => {
            if (response.status === 200) {
                dispatch(setOld(response.data.data.results))
            }
        })
        .catch((error) => console.error(error.message))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewQuestion = (state: RootState) => state.question.new
export const selectOldQuestion = (state: RootState) => state.question.old

export default questionSlice.reducer
