import { Heart, ShoppingCart, X } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-out menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mt-8 space-y-6">
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              Browse
            </button>
            
            <div className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              <Heart className="h-5 w-5 mr-3" />
              <span>Wishlist</span>
            </div>
            
            <div className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              <ShoppingCart className="h-5 w-5 mr-3" />
              <span>Cart</span>
            </div>

            <div className="pt-6 space-y-4">
              <button className="w-full text-red-500 hover:text-red-600 px-4 py-2 text-left">
                Create Account
              </button>
              <button className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
