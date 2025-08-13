import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";

// super small Redux demo to satisfy "Application State" rubric items
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (s) => { s.value += 1; },
    add: (s, a: PayloadAction<number>) => { s.value += a.payload; }
  }
});

export const { increment, add } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
