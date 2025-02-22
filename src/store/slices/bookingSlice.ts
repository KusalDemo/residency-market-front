import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    addBooking as addBookingApi,
    getBookingsByUserId,
    getBookingsByResidencyId,
    updateBooking as updateBookingApi,
    cancelBooking as cancelBookingApi
} from "../../api/bookingApi.ts";
import {Booking} from "../../types";

interface BookingState {
    bookings: Booking[];
    receivedBookings: Booking[];
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    receivedBookings: [],
    loading: false,
    error: null,
};

export const payBooking = createAsyncThunk(
    'booking/pay',
    async (booking: { email: string; date: string; propertyId: string }, {rejectWithValue}) => {
        try {
            const response = await addBookingApi(booking);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchUserBookings = createAsyncThunk(
    'booking/fetchUserBookings',
    async (userId: string, {rejectWithValue}) => {
        try {
            const response = await getBookingsByUserId(userId);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchReceivedBookings = createAsyncThunk(
    'booking/fetchReceivedBookings',
    async (residencyId: string, {rejectWithValue}) => {
        try {
            const response = await getBookingsByResidencyId(residencyId);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateUserBooking = createAsyncThunk(
    'booking/update',
    async ({bookingId, booking}: { bookingId: string, booking: Booking }, {rejectWithValue}) => {
        try {
            const response = await updateBookingApi(bookingId, booking);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const cancelUserBooking = createAsyncThunk(
    'booking/cancel',
    async (bookingId: string, {rejectWithValue}) => {
        try {
            await cancelBookingApi(bookingId);
            return bookingId;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(payBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(payBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload);
            })
            .addCase(payBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUserBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchReceivedBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReceivedBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.receivedBookings = action.payload;
            })
            .addCase(fetchReceivedBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserBooking.fulfilled, (state, action) => {
                const index = state.bookings.findIndex(b => b._id === action.payload.id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
            })
            .addCase(cancelUserBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.filter(b => b._id !== action.payload);
            });
    }
});

export default bookingSlice.reducer;