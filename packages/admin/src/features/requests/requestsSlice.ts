import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface IRequest {
    receivedBy: string
    status: string
    _id: string
    title: string
    createdId: string
    createdName: string
    content: string
    picture: string
    createAt: string
    __v: number
}

interface RequestsState {
    list: IRequest[];
}

const initialState: RequestsState = {
    list: [],
}

export const requestsSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        updateRequests: (state, action: PayloadAction<IRequest[]>) => {
            state.list = action.payload
        },
    },
})

export const { updateRequests } = requestsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRequests = (state: RootState) => state.requests.list

export default requestsSlice.reducer
