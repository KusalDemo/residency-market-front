import React from 'react';
import { Calendar, Target, Users } from 'lucide-react';

export const About: React.FC = () => {
  const events = [
    {
      date: '2024-04-15',
      title: 'Real Estate Investment Summit',
      description: 'Join industry experts for insights on property investment strategies.'
    },
    {
      date: '2024-05-20',
      title: 'Open House Weekend',
      description: 'Exclusive viewings of our premium properties across the city.'
    },
    {
      date: '2024-06-10',
      title: 'Property Management Workshop',
      description: 'Learn effective property management techniques from professionals.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <p className="text-gray-600">
                  To be the most trusted and innovative real estate company, transforming the way people buy, sell, and invest in properties while creating lasting value for our clients and communities.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <p className="text-gray-600">
                  To provide exceptional real estate services through integrity, expertise, and innovation, ensuring every client finds their perfect property while delivering unmatched customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-gray-600">{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Kusal Gunasekara',
                position: 'CEO',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
              },
              {
                name: 'Tharu Arachchige',
                position: 'Head of Sales',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
              },
              {
                name: 'Sameera Madushan',
                position: 'Chief Operations Officer',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};