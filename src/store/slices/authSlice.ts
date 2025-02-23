import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { loginUserApi, registerUserApi } from '../../api/userApi'; // Import registerUserApi
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await loginUserApi(credentials);
        const { user, accessToken, refreshToken } = response;
        return { user, accessToken, refreshToken };
      } catch (error) {
        return rejectWithValue(error.response?.data || `Login failed: ${error}`);
      }
    }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await registerUserApi(userData);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || `Registration failed: ${error}`);
      }
    }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;

      // Remove user data from cookies
      Cookies.remove('user_id');
      Cookies.remove('user_email');
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;