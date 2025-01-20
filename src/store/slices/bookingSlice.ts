import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addBooking} from "../../api/userApi.ts";

export interface Booking {
    id: string;
    propertyId: string;
    userId: string;
    bookingDate: string;
    amount: number;
    status: 'active' | 'cancelled' | 'completed';
    paymentId: string;
    createdAt: string;
}

interface BookingState {
    bookings: Booking[];
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    loading: false,
    error: null,
};

export const payBooking = createAsyncThunk(
    'user/bookVisit',
    async (property : {email: string; date: string; propertyId: string}, { rejectWithValue }) => {
        try{
            console.log(`Details 01 : ${property.email} | ${property.date} | ${property.propertyId}`)
            const bookings = await addBooking(property);
            return bookings
        }catch (err){
            const message = err instanceof Error ? err.message : 'Failed to create residency.';
            return rejectWithValue(message);
        }
    }
)

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<Booking>) => {
            state.bookings.push(action.payload);
        },
        cancelBooking: (state, action: PayloadAction<string>) => {
            const booking = state.bookings.find(b => b.id === action.payload);
            if (booking) {
                booking.status = 'cancelled';
            }
        },
        completeBooking: (state, action: PayloadAction<string>) => {
            const booking = state.bookings.find(b => b.id === action.payload);
            if (booking) {
                booking.status = 'completed';
            }
        },
        setBookings: (state, action: PayloadAction<Booking[]>) => {
            state.bookings = action.payload;
        }
    },
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
            });
    }
});

export const { cancelBooking, completeBooking, setBookings } = bookingSlice.actions;
export default bookingSlice.reducer;