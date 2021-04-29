import { RootState } from '../../app/store'
import { skills } from '../../utils/api/skills'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ISkill {
    createdAt: string
    _id: string
    name: string
    __v: number
}

interface QuestionState {
    all: ISkill[]
    status: string
    error: string | undefined
}

const initialState: QuestionState = {
    all: [],
    status: 'idle',
    error: undefined,
}

export const get = createAsyncThunk('skills/get', async () => {
    return skills.get()
})

export const skillsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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

export const selectAllSkills = (state: RootState) => state.skills.all
export const selectSkillsStatus = (state: RootState) => state.skills.status

export default skillsSlice.reducer
