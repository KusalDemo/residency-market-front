import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { addBooking, cancelBooking, completeBooking, setBookings } = bookingSlice.actions;
export default bookingSlice.reducer;