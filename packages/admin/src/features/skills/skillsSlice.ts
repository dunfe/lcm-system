import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface ISkill {
    createdAt: string
    _id: string
    name: string
    __v: number
}

interface SkillsState {
    list: ISkill[]
}

const initialState: SkillsState = {
    list: [],
}

export const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        updateSkills: (state, action: PayloadAction<ISkill[]>) => {
            state.list = action.payload
        },
    },
})

export const { updateSkills } = skillsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSkills = (state: RootState) => state.skills.list

export default skillsSlice.reducer
