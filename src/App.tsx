import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from "./pages/Home.tsx";


function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
