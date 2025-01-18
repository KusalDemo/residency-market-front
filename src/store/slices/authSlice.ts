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
export default authSlice.reducer;