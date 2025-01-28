import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../src/context/AuthContext';
import SearchBar from './SearchBar';
import AuthModal from './auth/AuthModal';

const Navbar = ({ onSearch }) => {
  const { user, signout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowModal(true);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-red-500">Marketplace</span>
            </div>
            <div className="hidden md:block">
              <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
                Browse
              </button>
            </div>
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Heart className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            <ShoppingCart className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            
            {user ? (
              <>
                <span className="text-gray-600">Welcome, {user.username}</span>
                <button 
                  onClick={signout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="text-red-500 hover:text-red-600 px-4 py-2"
                >
                  Create Account
                </button>
                <button 
                  onClick={() => handleAuthClick('signin')}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        mode={authMode}
      />
    </nav>
  );
};

export default Navbar;