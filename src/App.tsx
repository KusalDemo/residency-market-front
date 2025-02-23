import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Footer } from './components/Footer.tsx';
import { Contact } from './pages/Contact.tsx';
import { About } from './pages/About.tsx';
import { Header } from './components/Header.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { Properties } from './pages/Properties.tsx';
import { Login } from './pages/Login.tsx';
import { SignUp } from './pages/SignUp.tsx';
import { AddProperty } from './pages/AddProperty.tsx';
import { Favorites } from './pages/Favorites.tsx';
import { PropertyDetail } from './pages/PropertyDetail.tsx';
import { Payment } from './pages/Payment.tsx';
import { Bookings } from './pages/Bookings.tsx';
import TourismNews from './pages/News.tsx';
import { Inquiries } from './pages/Inquiries.tsx';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/properties" element={<Properties />} />
                            <Route path="/add-property" element={<AddProperty />} />
                            <Route path="/property/:id" element={<PropertyDetail />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/payment/:id" element={<Payment />} />
                            <Route path="/bookings" element={<Bookings />} />
                            <Route path="/news" element={<TourismNews />} />
                            <Route path="/inquiries" element={<Inquiries />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;