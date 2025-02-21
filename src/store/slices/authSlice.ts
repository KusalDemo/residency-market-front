import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { loginUserApi } from '../../api/userApi';
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

        // Store tokens in cookies
        Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
        Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });

        return { user, accessToken, refreshToken };
      } catch (error) {
          return rejectWithValue(error.response?.data || `Login failed : Response : ${error}`);
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

      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
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
        });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


/*
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  favorites: string[];
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  favorites: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.favorites = action.payload.favResidenciesID || [];
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.favorites = [];
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const residencyId = action.payload;
      if (state.favorites.includes(residencyId)) {
        state.favorites = state.favorites.filter(id => id !== residencyId);
      } else {
        state.favorites.push(residencyId);
      }
      if (state.user) {
        state.user.favResidenciesID = state.favorites;
      }
    }
  },
});

export const { login, logout, toggleFavorite } = authSlice.actions;
export default authSlice.reducer;*/
