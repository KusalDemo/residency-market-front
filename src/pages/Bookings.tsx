import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { cancelBooking } from '../store/slices/bookingSlice';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

export const Bookings: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const { bookings } = useSelector((state: RootState) => state.booking);
    const { properties } = useSelector((state: RootState) => state.property);

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    const userBookings = bookings.filter(booking => booking.userId === user?.id);
    const today = new Date();

    const activeBookings = userBookings.filter(booking => {
        const bookingDate = new Date(booking.bookingDate);
        return bookingDate >= today || booking.status === 'active';
    });

    const historyBookings = userBookings.filter(booking => {
        const bookingDate = new Date(booking.bookingDate);
        return bookingDate <= today && booking.status === 'cancelled';
    });

    const handleCancelBooking = (bookingId: string) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            dispatch(cancelBooking(bookingId));
        }
    };

    const getPropertyDetails = (propertyId: string) => {
        return properties.find(p => p.id === propertyId);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Your Bookings</h1>

            {/* Active Bookings */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Active Bookings</h2>
                {activeBookings.length === 0 ? (
                    <p className="text-gray-600">No active bookings</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeBookings.map(booking => {
                            const property = getPropertyDetails(booking.propertyId);
                            if (!property) return null;

                            return (
                                <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="h-5 w-5 mr-2" />
                                            <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="h-5 w-5 mr-2" />
                                            <span>${booking.amount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCancelBooking(booking.id)}
                                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Booking History */}
            <div>
                <h2 className="text-2xl font-semibold mb-6">Booking History</h2>
                {historyBookings.length === 0 ? (
                    <p className="text-gray-600">No booking history</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {historyBookings.map(booking => {
                            const property = getPropertyDetails(booking.propertyId);
                            if (!property) return null;

                            return (
                                <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="h-5 w-5 mr-2" />
                                            <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="h-5 w-5 mr-2" />
                                            <span>${booking.amount.toLocaleString()}</span>
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