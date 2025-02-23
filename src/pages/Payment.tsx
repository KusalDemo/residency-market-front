import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { payBooking } from '../store/slices/bookingSlice';
import { CreditCard, Calendar } from 'lucide-react';
import Loading from "../components/Loading.tsx";
import { Booking } from "../types";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Payment: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const { properties } = useSelector((state: RootState) => state.property);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { error, loading } = useSelector((state: RootState) => state.booking);
    const property = properties.find(p => p._id === id);

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
        startDate: '',
        endDate: ''
    });

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (!property) {
        navigate('/properties');
        return null;
    }

    const validateCardNumber = (number: string) => {
        return /^\d{16}$/.test(number);
    };

    const validateExpiryDate = (date: string) => {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(date)) return false;

        const [month, year] = date.split("/").map(Number);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        return year > currentYear || (year === currentYear && month >= currentMonth);
    };

    const validateCVV = (cvv: string) => {
        return /^\d{3,4}$/.test(cvv);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate dates
        const startDate = new Date(paymentDetails.startDate);
        const endDate = new Date(paymentDetails.endDate);

        if (startDate >= endDate) {
            toast.error("End date must be after start date");
            return;
        }

        // Validate payment details
        if (!/^[A-Za-z\s]+$/.test(paymentDetails.name)) {
            toast.error("Cardholder name must contain only letters and spaces");
            return;
        }

        if (!validateCardNumber(paymentDetails.cardNumber)) {
            toast.error("Card number must be a valid 16-digit number");
            return;
        }

        if (!validateExpiryDate(paymentDetails.expiryDate)) {
            toast.error("Expiry date must be in MM/YY format and not expired");
            return;
        }

        if (!validateCVV(paymentDetails.cvv)) {
            toast.error("CVV must be 3 or 4 digits");
            return;
        }

        // Create booking object
        const booking: Booking = {
            residency: property._id,
            user: user.id || Cookies.get('user_id'),
            startDate: startDate,
            endDate: endDate,
            total: property.price,
            status: 'pending'
        };

        try {
            await dispatch(payBooking(booking)).unwrap();
            toast.success('Booking completed successfully!');
            setTimeout(() => {
                navigate('/bookings');
            }, 2000); // Navigate after toast is shown
        } catch (err) {
            toast.error(err?.message || 'Failed to complete booking');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <div className="text-center py-10 flex flex-col items-center">
                <Loading /> Payment Processing...
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

            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                    <div className="flex items-start space-x-4">
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-semibold">{property.title}</h3>
                            <p className="text-gray-600">{property.location}</p>
                            <p className="text-xl font-bold text-blue-600 mt-2">
                                ${property.price.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Payment Information</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Holder Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={paymentDetails.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={paymentDetails.cardNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md pl-10"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={16}
                                    required
                                />
                                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={paymentDetails.startDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={paymentDetails.endDate}
                                    onChange={handleChange}
                                    min={paymentDetails.startDate || new Date().toISOString().split('T')[0]}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiry Date (MM/YY)
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={paymentDetails.expiryDate}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md pl-10"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        required
                                    />
                                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={paymentDetails.cvv}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="123"
                                    maxLength={4}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors mt-6"
                    >
                        Pay ${property.price.toLocaleString()}
                    </button>
                </form>
            </div>
        </div>
    );
};