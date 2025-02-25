import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Inquiry} from '../../types';
import {
    addInquiry,
    getAllInquiriesByUserId,
    getInquiriesByResidencyId,
    addReplyToInquiry,
    updateInquiry as updateInquiryApi,
    deleteInquiry as deleteInquiryApi
} from "../../api/inquiryApi.ts";

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
    async (inquiry: Inquiry, {rejectWithValue}) => {
        try{
            return await addInquiry(inquiry);
        }catch (error) {
            return rejectWithValue(error);
        }

    }
);

export const getUserRelatedInquiries = createAsyncThunk(
    'inquiry/getUserInquiries',
    async (userId: string, {rejectWithValue}) => {
        try{
            const allInquiries = await getAllInquiriesByUserId(userId);
            return allInquiries;
        }catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getReceivedInquiries = createAsyncThunk(
    'inquiry/getReceivedInquiries',
    async (userId: string, {rejectWithValue}) => {
        try{
            const receivedInquiries = await getInquiriesByResidencyId(userId);
            return receivedInquiries;
        }catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addReply = createAsyncThunk(
    'inquiry/addReply',
    async ({inquiryId, reply}: { inquiryId: string, reply: any }) => {
        const response = await addReplyToInquiry(inquiryId, reply);
        return response;
    }
);

export const updateInquiry = createAsyncThunk(
    'inquiry/update',
    async ({inquiryId, inquiry}: { inquiryId: string, inquiry: Inquiry },{rejectWithValue}) => {
        try{
            const response = await updateInquiryApi(inquiryId, inquiry);
            return response;
        }catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteInquiry = createAsyncThunk(
    'inquiry/delete',
    async (inquiryId: string) => {
        await deleteInquiryApi(inquiryId);
        return inquiryId;
    }
);

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
            /*.addCase(addReply.fulfilled, (state, action) => {
                const inquiry = state.inquiries.find(i => i._id === action.payload.inquiryId);
                if (inquiry) {
                    inquiry.replies = inquiry.replies || [];
                    inquiry.replies.push(action.payload.reply);
                }
            })*/
            .addCase(updateInquiry.fulfilled, (state, action) => {
                const index = state.inquiries.findIndex(i => i._id === action.payload._id);
                if (index !== -1) {
                    state.inquiries[index] = action.payload;
                }
            })
            .addCase(deleteInquiry.fulfilled, (state, action) => {
                state.inquiries = state.inquiries.filter(i => i._id !== action.payload);
            });
    }
});

export default inquirySlice.reducer;