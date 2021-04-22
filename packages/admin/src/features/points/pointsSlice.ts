import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface IPoint {
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

interface PointsState {
    list: IPoint[];
}

const initialState: PointsState = {
    list: [],
}

export const pointsSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        updatePoints: (state, action: PayloadAction<IPoint[]>) => {
            state.list = action.payload
        },
    },
})

export const { updatePoints } = pointsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPoints = (state: RootState) => state.points.list

export default pointsSlice.reducer
