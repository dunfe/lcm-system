import { RootState } from '../../app/store'
import { IUserDetail } from '../../utils/hooks/useUserInfo'
import { users } from '../../utils/api/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IUserState {
    user: IUserDetail | null
    status: string
    error: string | null
}

const initialState: IUserState = {
    user: null,
    status: '',
    error: null,
}

interface IUserId {
    token: string
}

export const getUserDetail = createAsyncThunk(
    'users/get',
    async (payload: IUserId) => {
        const { token } = payload
        return users.getUserDetail(token)
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserDetail.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(getUserDetail.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'succeeded'
        })

        builder.addCase(getUserDetail.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message!
        })
    },
})

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
