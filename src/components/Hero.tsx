import React from 'react';
import { Search } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80)'
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Find Your Dream Home
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Discover the perfect property from our extensive collection of luxury homes, apartments, and villas.
        </p>
        <div className="w-full max-w-2xl flex justify-center rounded-lg shadow-lg p-2">
            <button className="bg-blue-600 text-white p-3 rounded-md flex items-center">
              <Search className="h-5 w-5 mr-2" />
              LET'S GO SEARCH
            </button>
        </div>
      </div>
    </div>
  );
};