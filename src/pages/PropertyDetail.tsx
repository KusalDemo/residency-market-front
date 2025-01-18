import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bed, Bath, Square, MapPin, Phone, Mail } from 'lucide-react';
import { RootState } from '../store';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties } = useSelector((state: RootState) => state.property);
  const {user} = useSelector((state: RootState) => state.auth);
  const property = properties.find(p => p.id === id);


  if (!property) {
    return <div className="container mx-auto px-6 py-12">Property not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative h-[400px] mb-8">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <img
                src={property.image}
                alt={`${property.title}`}
                className="w-full h-48 object-cover rounded-lg"
              />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.facilities.location}</span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-3xl font-bold text-blue-600 mb-6">
              ${property.price.toLocaleString()}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-2 text-gray-600" />
                <span>{property.facilities.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2 text-gray-600" />
                <span>{property.facilities.bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 mr-2 text-gray-600" />
                <span>{property.facilities.area} sqft</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
              Book Viewing
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Agent</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-600" />
                <span>(+94) 77 145 7878</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-600" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};