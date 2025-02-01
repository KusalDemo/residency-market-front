import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Inquiry } from '../../types';
import {addInquiry, getAllInquiriesByUserId} from "../../api/inquiryApi.ts";


interface InquiryState {
  inquiries: Inquiry[];
  userInquiries: Inquiry[];
  loading: boolean;
  error: string | null;
}

const initialState: InquiryState = {
  inquiries: [],
  userInquiries: [],
  loading: false,
  error: null
};

export const createInquiry = createAsyncThunk(
  'inquiry/create',
  async (inquiry: Inquiry) => {
    return await addInquiry(inquiry);
  }
);

export const getUserRelatedInquiries = createAsyncThunk(
    'inquiry/getUserInquiries',
    async (id:string) => {
        const allInquiries = await getAllInquiriesByUserId(id);
        console.log(allInquiries)
        return allInquiries
    }
)


const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    addInquiry: (state, action: PayloadAction<Inquiry>) => {
      state.inquiries.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(createInquiry.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createInquiry.fulfilled, (state, action) => {
            state.loading = false;
            state.inquiries.push(action.payload);
        })
        .addCase(createInquiry.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
      builder
        .addCase(getUserRelatedInquiries.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserRelatedInquiries.fulfilled, (state, action) => {
            state.loading = false;
            state.inquiries = action.payload;
        })
        .addCase(getUserRelatedInquiries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
  }
});

export default inquirySlice.reducer;