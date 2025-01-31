import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Residency } from '../../types';
import {
    fetchProperties,
    addProperty,
    fetchPropertiesByUserId,
    updateProperty,
    deleteProperty
} from "../../api/propertyApi.ts";

interface PropertyState {
  properties: Residency[];
  userProperties: Residency[];
  selectedProperty: Residency | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
    userProperties: [],
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

export const getPropertiesByUserId = createAsyncThunk(
    'residency/user',
    async (userId: string) => {
        let residencies = await fetchPropertiesByUserId(userId);
        return residencies;
    }
)

export const updatePropertyDetails = createAsyncThunk(
    'residency/update',
    async (property: Residency) => {
        let updatedResidency = await updateProperty(property._id,property);
        return updatedResidency;
    }
)

export const removeProperty = createAsyncThunk(
    'residency/delete',
    async (propertyId: string) => {
        await deleteProperty(propertyId);
        return propertyId;
    }
)


const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Residency[]>) => {
      state.properties = action.payload;
    },
    setSelectedProperty: (state, action: PayloadAction<Residency>) => {
      state.selectedProperty = action.payload;
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
      builder
        .addCase(createProperty.pending, (state) => {
            console.log(`createProperty.pending...`)
            state.loading = true;
        })
        .addCase(createProperty.fulfilled, (state, action) => {
            state.loading = false;
            state.properties.push(action.payload);
        })
        .addCase(createProperty.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
      builder
        .addCase(getPropertiesByUserId.pending, (state) => {
            console.log(`getPropertiesByUserId.pending...`)
            state.loading = true;
        })
        .addCase(getPropertiesByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.userProperties = action.payload;
        })
        .addCase(getPropertiesByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
      builder
        .addCase(updatePropertyDetails.pending, (state) => {
            console.log(`updateResidency.pending...`)
            state.loading = true;
        })
        .addCase(updatePropertyDetails.fulfilled, (state, action) => {
            console.log(`updateResidency.fulfilled...`)
            state.loading = false;
        })
        .addCase(updatePropertyDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
      builder
        .addCase(removeProperty.pending, (state) => {
            console.log(`removeProperty.pending...`)
            state.loading = true;
        })
        .addCase(removeProperty.fulfilled, (state, action) => {
            console.log(`removeProperty.fulfilled...`)
            state.properties = state.properties.filter(property => property._id !== action.payload);
            state.loading = false;
        })
        .addCase(removeProperty.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
  },
});

export const { setProperties, setSelectedProperty } = propertySlice.actions;
export default propertySlice.reducer;