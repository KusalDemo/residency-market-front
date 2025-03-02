import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Home, LogIn, LogOut, Menu, X, Calendar, MessageCircle} from 'lucide-react';
import { RootState } from '../store';
import {logout, setIsAuthenticated} from '../store/slices/authSlice';
import Cookies from "js-cookie";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const userId = Cookies.get("user_id");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    userId? dispatch(setIsAuthenticated(true)) : navigate('/') ;

  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">Residency.lk</span>
            </Link>

            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
            >
              {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
              ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>

            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link to="/properties" className="text-gray-600 hover:text-blue-600">Properties</Link>
              <Link to="/news" className="text-gray-600 hover:text-blue-600">News</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
              {isAuthenticated && (
                  <>
                    <Link to="/add-property" className="text-gray-600 hover:text-blue-600">Manage Owns</Link>
                    {/*<Link to="/favorites" className="text-gray-600 hover:text-blue-600">
                      <Heart className="h-5 w-5" />
                    </Link>*/}
                    <Link to="/bookings" className="text-gray-600 hover:text-blue-600">
                      <Calendar className="h-5 w-5" />
                    </Link>
                    <Link to="/inquiries" className="text-gray-600 hover:text-blue-600">
                      <MessageCircle className="h-5 w-5" />
                    </Link>
                  </>
              )}
              {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{user?.name}</span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
              ) : (
                  <Link to="/login" className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
              )}
            </div>
          </div>

          {isMenuOpen && (
              <div className="md:hidden mt-4 space-y-4">
                <Link to="/" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/properties" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Properties</Link>
                <Link to="/about" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About</Link>
                {/*<Link to="/contact" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>*/}
                {isAuthenticated && (
                    <>
                      <Link to="/add-property" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Add Property</Link>
                      {/*<Link to="/favorites" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Favorites</Link>*/}
                      <Link to="/bookings" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Bookings</Link>
                      <Link to="/inquiries" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Inquiries</Link>
                    </>
                )}
                {isAuthenticated ? (
                    <div className="space-y-4">
                      <span className="block text-gray-600">{user?.name}</span>
                      <button
                          onClick={handleLogout}
                          className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                )}
              </div>
          )}
        </nav>
      </header>
  );
};