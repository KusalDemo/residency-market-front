import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { payBooking} from '../store/slices/bookingSlice';
import { CreditCard, Calendar } from 'lucide-react';
import Loading from "../components/Loading.tsx";

export const Payment: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const { properties } = useSelector((state: RootState) => state.property);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const {  error , loading} = useSelector((state: RootState) => state.booking);
    const property = properties.find(p => p.id === id);

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    });

    if (loading) {
        return (
            <div className="text-center py-10 flex flex-col items-center" >
                <Loading /> Payment Processing...
            </div>
        )
    }
    if (error) return <p className="flex justify-center mt-10">Error: {error}</p>;

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (!property) {
        navigate('/properties');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // In a real app, this would process payment through Stripe

        const booking1 = {
            email: user?.email || '',
            date: new Date().toISOString(),
            propertyId: property.id
        }

        console.log(`Details 00 : ${booking1.email} | ${booking1.date} | ${booking1.propertyId}`)
        await dispatch(payBooking(booking1));

        navigate('/bookings');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                    <div className="flex items-start space-x-4">
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-semibold">{property.title}</h3>
                            <p className="text-gray-600">{property.address}</p>
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
                                    required
                                />
                                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiry Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={paymentDetails.expiryDate}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md pl-10"
                                        placeholder="MM/YY"
                                        required
                                    />
                                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
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