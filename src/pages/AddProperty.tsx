import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProperty,
    getPropertiesByUserId,
    removeProperty,
    updatePropertyDetails
} from '../store/slices/propertySlice';
import { RootState } from '../store';
import { Residency } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddProperty: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { userProperties } = useSelector((state: RootState) => state.property);
    const userId = Cookies.get("user_id"); // Get user_id from cookies

    const [editingProperty, setEditingProperty] = useState<Residency | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        address: '',
        city: '',
        country: '',
        image: '',
        image2: '',
        image3: '',
        bedrooms: 0,
        bathrooms: 0,
        area: 0
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        console.log(`isAuthenticated: ${isAuthenticated} | userId: ${userId}`);
        if (isAuthenticated && userId) {
            dispatch(getPropertiesByUserId(userId));
        }
    }, [dispatch, isAuthenticated, userId]);

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!userId) {
                toast.error('User not found. Please log in.');
                return;
            }

            if (!formData.title || !formData.description || !formData.price || !formData.address || !formData.image) {
                toast.error('Please fill in all required fields.');
                return;
            }

            let propertyData: Residency = {
                _id: editingProperty ? editingProperty._id : "",
                title: formData.title,
                description: formData.description,
                location: `${formData.address}`,
                price: parseInt(formData.price),
                owner: userId, // Use userId from cookies
                isAvailable: true,
                facilities: [{ bedrooms: formData.bedrooms, bathrooms: formData.bathrooms, area: formData.area }],
                images: [formData.image, formData.image2, formData.image3],
                bookings: [],
                inquiries: []
            };

            if (editingProperty) {
                await dispatch(updatePropertyDetails(propertyData)).unwrap(); // Ensures action is completed
                toast.success('Property updated successfully!');
                setEditingProperty(null);
            } else {
                await dispatch(createProperty(propertyData)).unwrap();
                toast.success('Property created successfully!');
            }

            // ✅ Auto-update UI without refresh
            dispatch(getPropertiesByUserId(userId));
        } catch (err) {
            toast.error('Failed to save property. Please try again.');
            console.error("Error saving property:", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDelete = (id: string) => {
        setShowDeleteConfirm(id);
    };

    const confirmDelete = async (id: string) => {
        try {
            await dispatch(removeProperty(id)).unwrap();
            dispatch(getPropertiesByUserId(userId)); // Refresh list
            setShowDeleteConfirm(null);
            toast.success('Property deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete property. Please try again.');
            console.error('Error deleting property:', err);
        }
    };

    const handleEdit = (propertyId: string, property: Residency) => {
        console.log(`Property (${propertyId}) to edit: ${JSON.stringify(property)}`);
        setEditingProperty(property);
        setFormData({
            title: property.title,
            description: property.description,
            price: property.price.toString(),
            address: property.location,
            city: "",
            country: "",
            image: property.images?.[0] || '',
            image2: property.images?.[1] || '',
            image3: property.images?.[2] || '',
            bedrooms: property.facilities[0].bedrooms,
            bathrooms: property.facilities[0].bathrooms,
            area: property.facilities[0].area
        });
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <ToastContainer />
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Your Properties</h2>
                {userProperties.length === 0 ? (
                    <p className="text-gray-600">You haven't added any properties yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userProperties.map((property) => (
                            <div key={property._id} className="relative">
                                <PropertyCard property={property} />
                                <div className="absolute top-4 left-4 space-x-2">
                                    <button
                                        onClick={() => handleEdit(property._id, property)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(property._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                                {showDeleteConfirm === property._id && (
                                    <div
                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
                                            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                                            <p className="text-gray-600 mb-6">
                                                Are you sure you want to delete "{property.title}"? This action cannot
                                                be undone.
                                            </p>
                                            <div className="flex justify-end space-x-4">
                                                <button
                                                    onClick={() => setShowDeleteConfirm(null)}
                                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(property._id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <h1 className="text-3xl font-bold mb-8">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
            </h1>
            <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/*<div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>*/}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bedrooms
                        </label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bathrooms
                        </label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Area (sqft)
                        </label>
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL 2
                        </label>
                        <input
                            type="url"
                            name="image2"
                            value={formData.image2}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL 3
                        </label>
                        <input
                            type="url"
                            name="image3"
                            value={formData.image3}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {editingProperty ? 'Update Property' : 'Add Property'}
                        </button>
                        {editingProperty && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingProperty(null);
                                    setFormData({
                                        title: '',
                                        description: '',
                                        price: '',
                                        address: '',
                                        city: ' ',
                                        country: ' ',
                                        image: '',
                                        image2: '',
                                        image3: '',
                                        bedrooms: 0,
                                        bathrooms: 0,
                                        area: 0
                                    });
                                }}
                                className="w-full mt-4 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};