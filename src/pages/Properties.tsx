import React from 'react';
import { useSelector } from 'react-redux';
import { PropertyCard } from '../components/PropertyCard';
import { RootState } from '../store';

export const Properties: React.FC = () => {
  const { properties } = useSelector((state: RootState) => state.property);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};