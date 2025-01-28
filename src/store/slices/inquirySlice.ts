import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inquiry, Reply } from '../../types';

interface InquiryState {
  inquiries: Inquiry[];
}

const initialState: InquiryState = {
  inquiries: []
};

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    addInquiry: (state, action: PayloadAction<Inquiry>) => {
      state.inquiries.push(action.payload);
    },
    addReply: (state, action: PayloadAction<{ inquiryId: string; reply: Reply }>) => {
      const inquiry = state.inquiries.find(i => i.id === action.payload.inquiryId);
      if (inquiry) {
        inquiry.replies.push(action.payload.reply);
      }
    }
  }
});

export const { addInquiry, addReply } = inquirySlice.actions;
export default inquirySlice.reducer;