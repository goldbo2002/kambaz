// src/redux/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// counter starts at 0
type CounterState = {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    add: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});


export const { increment, decrement, addAmount } = counterSlice.actions
export default counterSlice.reducer
