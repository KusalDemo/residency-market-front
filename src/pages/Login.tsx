import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { RootState } from '../store';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({email, password}));
  };


  if (isAuthenticated) {
    navigate('/');
  }

  return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <a
                href="/signup"
                className="block text-center mt-4 text-sm text-gray-600 hover:underline"
            >
             Don't have an account? Sign up
            </a>
          </form>
        </div>
      </div>
  );
};
