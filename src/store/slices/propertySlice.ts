import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Residency } from '../../types';
import {fetchProperties,addProperty} from "../../api/propertyApi.ts";

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
/*export const createProperty = createAsyncThunk(
    'residency/create',
    async (property: Residency) => {
        let residencies = await addProperty(property);
        return residencies;
    }
);*/
export const createProperty = createAsyncThunk(
    'residency/create',
    async (property: Residency, { rejectWithValue }) => {
      try {
        const residencies = await addProperty(property);
        console.log(`residencies : ${residencies.id}`);
        return residencies;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create residency.';
        return rejectWithValue(message);
      }
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
    },
      updateProperty: (state, action: PayloadAction<Residency>) => {
          const index = state.properties.findIndex(p => p.id === action.payload.id);
          if (index !== -1) {
              state.properties[index] = action.payload;
          }
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
        })
        .addCase(createProperty.pending, (state) => {
            state.loading = true;
        })
        .addCase(createProperty.fulfilled, (state, action) => {
            state.loading = false;
            state.properties.push(action.payload); // Assuming the backend returns the created property
        })
        .addCase(createProperty.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

  },
});

export const { setProperties, setSelectedProperty, removeProperty, updateProperty } = propertySlice.actions;
export default propertySlice.reducer;