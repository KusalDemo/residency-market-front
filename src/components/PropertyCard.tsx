import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Bed, Bath, Square, Heart } from 'lucide-react';
import { Residency } from '../types';
import { toggleFavorite } from '../store/slices/authSlice';
import { RootState } from '../store';

interface PropertyCardProps {
  property: Residency;
  showRemove?: boolean;
  onRemove?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  showRemove = false,
  onRemove
}) => {
  const dispatch = useDispatch();
  const { isAuthenticated, favorites } = useSelector((state: RootState) => state.auth);
  const isFavorite = favorites.includes(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(toggleFavorite(property.id));
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRemove) {
      onRemove(property.id);
    }
  };

  return (
    <Link to={`/property/${property.id}`} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
          ${property.price ? property.price.toLocaleString() : '1000'}
        </div>
        {isAuthenticated && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 left-4 p-2 rounded-full ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4">{property.city}, {property.country}</p>
        <div className="flex justify-between text-gray-500">
          <div className="flex items-center">
            <Bed className="h-5 w-5 mr-1" />
            <span>{property.facilities.bedrooms || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-5 w-5 mr-1" />
            <span>{property.facilities.bathrooms || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-5 w-5 mr-1" />
            <span>{property.facilities.area || 'N/A'} sqft</span>
          </div>
        </div>
        {showRemove && (
          <button
            onClick={handleRemove}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Remove Property
          </button>
        )}
      </div>
    </Link>
  );
};