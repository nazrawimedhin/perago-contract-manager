import { createSlice } from '@reduxjs/toolkit'

export interface StatusState {
  title: string;
  message: string;
  type: string;
}

const initialState: StatusState | null =null

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return action.payload
    },
  },
})

export const { setStatus } = statusSlice.actions
export default statusSlice.reducer
