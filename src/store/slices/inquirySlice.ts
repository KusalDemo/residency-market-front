import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Inquiry} from '../../types';
import {addInquiry, getAllInquiriesByUserId, getInquiriesByResidencyId, addReplyToInquiry} from "../../api/inquiryApi.ts";

interface InquiryState {
    inquiries: Inquiry[];
    receivedInquiries: Inquiry[];
    loading: boolean;
    error: string | null;
}

const initialState: InquiryState = {
    inquiries: [],
    receivedInquiries: [],
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
    async (userId: string) => {
        const allInquiries = await getAllInquiriesByUserId(userId);
        return allInquiries;
    }
);

export const getReceivedInquiries = createAsyncThunk(
    'inquiry/getReceivedInquiries',
    async (userId: string) => {
        const receivedInquiries = await getInquiriesByResidencyId(userId);
        return receivedInquiries;
    }
);

export const addReply = createAsyncThunk(
    'inquiry/addReply',
    async ({inquiryId, reply}: { inquiryId: string, reply: any }) => {
        const response = await addReplyToInquiry(inquiryId, reply);
        return response;
    }
);

const inquirySlice = createSlice({
    name: 'inquiry',
    initialState,
    reducers: {
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
            })
            .addCase(getReceivedInquiries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReceivedInquiries.fulfilled, (state, action) => {
                state.loading = false;
                state.receivedInquiries = action.payload;
            })
            .addCase(getReceivedInquiries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
/*            .addCase(addReply.fulfilled, (state, action) => {
                const inquiry = state.inquiries.find(i => i._id === action.payload.inquiryId);
                if (inquiry) {
                    inquiry.replies = inquiry.replies || [];
                    inquiry.replies.push(action.payload.reply);
                }
            });*/
    }
});

export default inquirySlice.reducer;