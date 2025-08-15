import { createAsyncThunk, createSlice, PayloadAction, type BaseThunkAPI } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

export type User = {
  _id: string;
  username: string;
  email: string;
  role?: string;
  firstName?: string;
  lastName?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ✅ VERIFY SESSION
export const verifySession = createAsyncThunk(
  "auth/verifySession",
  async (_, thunkAPI) => {
    try {
      const res = await api.get<User>("/users/me");
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

// ✅ SIGN IN
export const signin = createAsyncThunk(
  "auth/signin",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post<User>("/users/signin", credentials);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Signin failed");
    }
  }
);

// ✅ SIGN OUT
export const signout = createAsyncThunk("auth/signout", async () => {
  await api.post("/users/signout");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // verifySession
      .addCase(verifySession.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifySession.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifySession.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Not authenticated";
      })

      // signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // signout
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
