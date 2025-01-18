import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from "./pages/Home.tsx";
import {Footer} from "./components/Footer.tsx";
import {Contact} from "./pages/Contact.tsx";
import {About} from "./pages/About.tsx";
import {Header} from "./components/Header.tsx";
import {Provider} from "react-redux";
import {store} from "./store";
import {Properties} from "./pages/Properties.tsx";
import {Login} from "./pages/Login.tsx";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    <Header/>
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/properties" element={<Properties/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
        </Provider>
    )
}

export default App
