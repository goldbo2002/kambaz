import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice'; 
export const store = configureStore({
  reducer: {
     auth: authReducer,
    counter: counterReducer,
  },
});
export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;

// These are standard types used in Redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;