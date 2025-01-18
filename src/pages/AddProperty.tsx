import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty, removeProperty } from '../store/slices/propertySlice';
import { RootState } from '../store';
import { Residency } from '../types';
import { PropertyCard } from '../components/PropertyCard';

export const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { properties } = useSelector((state: RootState) => state.property);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    country: '',
    image: '',
    bedrooms: '',
    bathrooms: '',
    area: ''
  });

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const userProperties = properties.filter(property => property.userEmail === user?.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty: Residency = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      address: formData.address,
      city: formData.city,
      country: formData.country,
      image: formData.image,
      facilities: {
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        area: parseFloat(formData.area),
        features: []
      },
      userEmail: user?.email || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dispatch(addProperty(newProperty));
    navigate('/properties');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRemoveProperty = (id: string) => {
    dispatch(removeProperty(id));
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Your Properties</h2>
        {userProperties.length === 0 ? (
          <p className="text-gray-600">You haven't added any properties yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showRemove
                onRemove={handleRemoveProperty}
              />
            ))}
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-8">Add New Property</h1>
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

          <div>
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
          </div>

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
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Property
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};