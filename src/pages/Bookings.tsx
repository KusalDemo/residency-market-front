import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { fetchUserBookings, fetchReceivedBookings, cancelUserBooking, updateUserBooking } from '../store/slices/bookingSlice';
import { Calendar, Clock, AlertCircle, Edit, Trash } from 'lucide-react';
import Loading from "../components/Loading.tsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getProperties} from "../store/slices/propertySlice.ts";

export const Bookings: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const { bookings, receivedBookings, loading, error } = useSelector((state: RootState) => state.booking);
    const { properties } = useSelector((state: RootState) => state.property);

    const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
    const [updatedBookingDetails, setUpdatedBookingDetails] = useState({
        startDate: '',
        endDate: '',
        status: ''
    });

    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(fetchUserBookings(user._id));
            dispatch(fetchReceivedBookings(user._id));
            dispatch(getProperties())
        } else {
            navigate('/login');
        }
    }, []);

    if (loading) {
        return (
            <div className="text-center py-10 flex flex-col items-center">
                <Loading /> Loading bookings...
                <ToastContainer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center mt-10">
                <p>Error: {error}</p>
                <ToastContainer />
            </div>
        );
    }

    const handleCancelBooking = async (bookingId: string) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await dispatch(cancelUserBooking(bookingId)).unwrap();
                toast.success("Booking cancelled successfully!");
            } catch (error) {
                toast.error("Failed to cancel booking");
            }
        }
    };

    const handleUpdateBooking = (bookingId: string) => {
        const booking = bookings.find(b => b._id === bookingId);
        if (booking) {
            setUpdatedBookingDetails({
                startDate: new Date(booking.startDate).toISOString().split('T')[0],
                endDate: new Date(booking.endDate).toISOString().split('T')[0],
                status: booking.status
            });
            setEditingBookingId(bookingId);
        }
    };

    const handleSaveUpdate = async (bookingId: string) => {
        try {
            const updatedBooking = {
                ...updatedBookingDetails,
                startDate: new Date(updatedBookingDetails.startDate),
                endDate: new Date(updatedBookingDetails.endDate)
            };
            await dispatch(updateUserBooking({ bookingId, booking: updatedBooking })).unwrap();
            setEditingBookingId(null);
            toast.success("Booking updated successfully!");
        } catch (error) {
            toast.error("Failed to update booking");
        }
    };

    const getPropertyDetails = (propertyId: string) => {
        return properties.find(p => p._id === propertyId);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* User Bookings */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Your Bookings</h2>
                {bookings.length === 0 ? (
                    <p className="text-gray-600">No bookings found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map(booking => {
                            const property = getPropertyDetails(booking.residency._id);
                            if (!property) return null;

                            return (
                                <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="h-5 w-5 mr-2" />
                                            <span>
                                                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="h-5 w-5 mr-2" />
                                            <span>${booking.total.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <AlertCircle className="h-5 w-5 mr-2" />
                                            <span className="capitalize">{booking.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleUpdateBooking(booking._id)}
                                            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                                        >
                                            <Edit className="h-4 w-4 mr-2 inline-block" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                                        >
                                            <Trash className="h-4 w-4 mr-2 inline-block" />
                                            Cancel
                                        </button>
                                    </div>

                                    {editingBookingId === booking._id && (
                                        <div className="mt-4">
                                            <input
                                                type="date"
                                                value={updatedBookingDetails.startDate}
                                                onChange={(e) => setUpdatedBookingDetails(prev => ({ ...prev, startDate: e.target.value }))}
                                                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                            />
                                            <input
                                                type="date"
                                                value={updatedBookingDetails.endDate}
                                                onChange={(e) => setUpdatedBookingDetails(prev => ({ ...prev, endDate: e.target.value }))}
                                                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                            />
                                            <select
                                                value={updatedBookingDetails.status}
                                                onChange={(e) => setUpdatedBookingDetails(prev => ({ ...prev, status: e.target.value }))}
                                                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <button
                                                onClick={() => handleSaveUpdate(booking._id)}
                                                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Received Bookings */}
            <div>
                {/*<h2 className="text-2xl font-semibold mb-6">Received Bookings</h2>*/}
                {receivedBookings.length === 0 ? (
                    <p className="text-gray-600">bookings....</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {receivedBookings.map(booking => {
                            const property = getPropertyDetails(booking.residency._id);
                            if (!property) return null;

                            return (
                                <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="h-5 w-5 mr-2" />
                                            <span>
                                                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="h-5 w-5 mr-2" />
                                            <span>${booking.total.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <AlertCircle className="h-5 w-5 mr-2" />
                                            <span className="capitalize">{booking.status}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};