import React, {useEffect, useState} from 'react';
import { Hero } from '../components/Hero';
import {Home as HomeIcon, Shield, Users, Phone, CheckCircle, Heart} from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <HomeIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Property Listings</h3>
              <p className="text-gray-600">Find your perfect home from our curated selection of properties</p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">Safe and secure property transactions with expert guidance</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Agents</h3>
              <p className="text-gray-600">Professional agents to help you every step of the way</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Trust & Transparency</h3>
              <p className="text-gray-600 mb-6">
                We are committed to fostering relationships built on mutual respect, honesty, and transparency. Our
                actions are driven by integrity and a strong belief in ethical practices.
              </p>
              <p className="text-gray-600 mb-6">
                Every interaction is guided by the principle of trust, ensuring that we exceed your expectations while
                maintaining open and honest communication.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-2"/>
                  <span>100% Verified Listings</span>
                </li>
                <li className="flex items-center">
                  <Users className="w-5 h-5 text-blue-600 mr-2"/>
                  <span>Professional Support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2"/>
                  <span>Reliable Service Guarantee</span>
                </li>
                <li className="flex items-center">
                  <Heart className="w-5 h-5 text-blue-600 mr-2"/>
                  <span>Customer-Centric Approach</span>
                </li>
              </ul>
              <h3 className="text-2xl font-semibold mb-4 mt-12">Our Commitment</h3>
              <p className="text-gray-600 mt-4">
                From personalized support to verified solutions, we strive to set new standards of excellence in
                everything we do.
              </p>
            </div>
            <div>
              <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
                  alt="Our Values"
                  className="rounded-lg shadow-lg mb-6"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="mb-8">Have questions about our properties or services? Our team is here to help!</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-3"/>
                  <span>(94) 81 2300 123</span>
                </div>
                <div className="flex items-center">
                  <HomeIcon className="w-6 h-6 mr-3"/>
                  <span>1A/2 Sisila , Katugastota ,Kandy 20000</span>
                </div>
              </div>
            </div>
            <form className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-md border border-gray-300 text-gray-800"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-md border border-gray-300 text-gray-800"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 rounded-md border border-gray-300 text-gray-800"
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
            {/*<iframe className="bg-white p-8 rounded-lg shadow-lg" width="560" height="315" src="https://www.youtube.com/embed/ZGGMRFECJ9k?si=1vfmvmlYHFi-zHq7"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>*/}
          </div>
        </div>
      </section>
    </div>
  );
};