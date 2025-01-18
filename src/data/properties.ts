import { Residency } from '../types';

export const properties: Residency[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'Stunning modern villa with panoramic ocean views, featuring high-end finishes and smart home technology.',
    price: 1200000,
    address: '123 Ocean Drive',
    city: 'Miami Beach',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80',
    facilities: {
      bedrooms: 4,
      bathrooms: 3.5,
      area: 3500,
      features: ['Pool', 'Smart Home', 'Ocean View', 'Garden', 'Security System']
    },
    userEmail: 'john@realestate.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Downtown Luxury Apartment',
    description: 'Contemporary apartment in the heart of downtown with stunning city views and modern amenities.',
    price: 750000,
    address: '456 Downtown Ave',
    city: 'Miami',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80',
    facilities: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      features: ['Gym', 'Concierge', 'City View', 'Parking', 'Pool']
    },
    userEmail: 'sarah@realestate.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];