import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Residency } from '../../types';

interface PropertyState {
  properties: Residency[];
  selectedProperty: Residency | null;
}

const initialState: PropertyState = {
  properties: [],
  selectedProperty: null,
};

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
});

export const { setProperties, setSelectedProperty, addProperty, removeProperty } = propertySlice.actions;
export default propertySlice.reducer;