import React, {useEffect, useState} from 'react';
import { Hero } from '../components/Hero';
import {Home as HomeIcon, Shield, Users, Phone, CheckCircle, Heart, Mail, Clock, MapPin} from 'lucide-react';

export const Home: React.FC = () => {
  return (
      <div>
        <Hero/>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <HomeIcon className="w-12 h-12 text-blue-600 mx-auto mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Property Listings</h3>
                <p className="text-gray-600">Find your perfect home from our curated selection of properties</p>
              </div>
              <div className="text-center p-6">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                <p className="text-gray-600">Safe and secure property transactions with expert guidance</p>
              </div>
              <div className="text-center p-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4"/>
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
              <iframe className="bg-white p-8 rounded-lg shadow-lg" width="560" height="315"
                      src="https://www.youtube.com/embed/ZGGMRFECJ9k?si=1vfmvmlYHFi-zHq7"
                      title="YouTube video player" frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="mb-8">Have questions ?, Key points to consider when buying a residence</p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3"/>
                    <span>Location: Consider accessibility, safety, and neighborhood facilities.</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3"/>
                    <span>Legal Verification: Ensure clear ownership and necessary approvals.</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3"/>
                    <span>Infrastructure: Check water supply, electricity, and connectivity.</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3"/>
                    <span>Future Value: Assess property appreciation and resale potential.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-white">
          <h1 className="text-3xl font-bold text-center py-12">Contact Us</h1>
          {/* Contact Information */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Phone className="h-8 w-8 text-blue-600 mb-4"/>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">Main: (94) 81 2300 123</p>
                  <p className="text-gray-600">Support: (94) 72 778 9090</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Mail className="h-8 w-8 text-blue-600 mb-4"/>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@residency.lk</p>
                  <p className="text-gray-600">support@residency.lk</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Clock className="h-8 w-8 text-blue-600 mb-4"/>
                  <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form & Map */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Location */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Our Location</h2>
                  <div className="bg-gray-100 p-6 rounded-lg mb-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <MapPin className="h-6 w-6 text-blue-600 mt-1"/>
                      <div>
                        <h3 className="font-semibold mb-2">Main Office</h3>
                        <p className="text-gray-600">
                          1A/2 Sisila<br/>
                          Katugastota, Kandy 20000
                        </p>
                      </div>
                    </div>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2759.6150192312853!2d80.64155759860418!3d7.335428135585699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367f856a948a5%3A0x545f003dc82691e3!2sPalle%20Thalawinna%20Railway%20Station!5e0!3m2!1sen!2slk!4v1737213200426!5m2!1sen!2slk"
                          width="100%"
                          height="400"
                          style={{border: 0}}
                          allowFullScreen
                          loading="lazy"
                          className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </div>

                {/* Additional Information for Visitors */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Visit Us for Personalized Assistance</h2>
                  <p className="text-gray-700 mb-4">
                    We welcome all prospective residency buyers and tenants to visit our office for
                    personalized assistance. Whether you’re looking to buy, rent, or invest in a property,
                    our team is here to guide you through every step.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">Schedule a Property Visit</h3>
                  <p className="text-gray-700 mb-4">
                    Before making a final decision, we highly recommend scheduling a
                    <span className="font-semibold"> property visit</span>. This allows you to inspect
                    the residence, check the neighborhood, and discuss details directly with the owner.
                    Our team can assist in setting up appointments and ensuring a smooth process.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">What to Consider During Your Visit</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Check the condition of the property, including walls, plumbing, and electrical systems.</li>
                    <li>Ensure the surroundings are safe, convenient, and well-connected to essential services.</li>
                    <li>Ask about any ongoing maintenance fees or additional charges.</li>
                    <li>Verify the legal documentation and title deed before proceeding with payments.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Legal and Financial Assistance</h3>
                  <p className="text-gray-700 mb-4">
                    Understanding property laws and financial commitments is crucial when purchasing
                    real estate. We provide guidance on property registration, legal verification, and
                    financing options to help make your investment secure and hassle-free.
                  </p>

                  <p className="text-gray-700">
                    Visit our office or <span className="font-semibold">contact us</span> today to
                    get started on your property journey with confidence!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
};