import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Residency } from '../../types';
import {fetchProperties} from "../../api/propertyApi.ts";

interface PropertyState {
  properties: Residency[];
  selectedProperty: Residency | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
};

export const getProperties = createAsyncThunk(
  'residency/',
    async () => {
        let residencies = await fetchProperties();
        return residencies;
    }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Residency[]>) => {
      state.properties = action.payload;
    },
    setSelectedProperty: (state, action: PayloadAction<Residency>) => {
      state.selectedProperty = action.payload;
    },
    addProperty: (state, action: PayloadAction<Residency>) => {
      state.properties.push(action.payload);
    },
    removeProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(
        property => property.id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(getProperties.pending, (state) => {
          state.loading = true;
        })
        .addCase(getProperties.fulfilled, (state, action) => {
          state.loading = false;
          state.properties = action.payload;
        })
        .addCase(getProperties.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to load properties';
        });
  },
});

export const { setProperties, setSelectedProperty, addProperty, removeProperty } = propertySlice.actions;
export default propertySlice.reducer;