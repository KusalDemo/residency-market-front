import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Home className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold">RealEstate</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-blue-500">Properties</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-500">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-500">Contact</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-blue-500">Favorites</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li className="text-gray-400">Property Sales</li>
              <li className="text-gray-400">Property Management</li>
              <li className="text-gray-400">Property Consultation</li>
              <li className="text-gray-400">Market Analysis</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                <span className="text-gray-400">1A/2 Sisila, Katugastota, Kandy 20000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-gray-400">(94) 72 123 345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-gray-400">info@realestate.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} RealEstate. by Kusal Gunasekara.
          </p>
        </div>
      </div>
    </footer>
  );
};