import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { PropertyCard } from '../components/PropertyCard';
import { useNavigate } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, favorites } = useSelector((state: RootState) => state.auth);
  const { properties } = useSelector((state: RootState) => state.property);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const favoriteProperties = properties.filter(property => favorites.includes(property.id));

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Properties</h1>
      {favoriteProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">You haven't added any properties to your favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};