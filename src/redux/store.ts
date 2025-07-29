// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

// main redux store thing
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

// types for use in components (makes TypeScript happy)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
