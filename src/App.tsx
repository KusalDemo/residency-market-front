import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from "./pages/Home.tsx";
import {Footer} from "./components/Footer.tsx";
import {Contact} from "./pages/Contact.tsx";


function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
