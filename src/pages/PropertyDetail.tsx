import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Bed, Bath, Square, MapPin, Phone, Mail, MessageCircle} from 'lucide-react';
import { RootState } from '../store';
import { addInquiry } from '../store/slices/inquirySlice';
import { useDispatch } from 'react-redux';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties } = useSelector((state: RootState) => state.property);
  const {user} = useSelector((state: RootState) => state.auth);
  const property = properties.find(p => p._id === id);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');


  if (!property) {
    return <div className="container mx-auto px-6 py-12">Property not found</div>;
  }

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/payment/${property._id}`);
  };

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const inquiry = {
      id: Date.now().toString(),
      residencyId: property._id,
      userId: user?.id || '',
      userEmail: user?.email || '',
      message: inquiryMessage,
      date: new Date().toISOString(),
      replies: []
    };

    dispatch(addInquiry(inquiry));
    setInquiryMessage('');
    setShowInquiryForm(false);
    alert('Inquiry sent successfully!');
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative h-[400px] mb-8">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <img
                src={property.images[1]}
                alt={`${property.title}`}
                className="w-full h-48 object-cover rounded-lg"
              />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.location}</span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-3xl font-bold text-blue-600 mb-6">
              ${property.price.toLocaleString()}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-2 text-gray-600"/>
                <span>{property.facilities[0].bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2 text-gray-600"/>
                <span>{property.facilities[0].bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 mr-2 text-gray-600"/>
                <span>{property.facilities[0].area} sqft</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-2"/>
                Send Inquiry
              </button>
              <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>

          {showInquiryForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Send an Inquiry</h2>
                <form onSubmit={handleInquiry}>
                <textarea
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    rows={4}
                    placeholder="Write your message here..."
                    required
                />
                  <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                      Send
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowInquiryForm(false)}
                        className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
          )}

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
                <span>example@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};