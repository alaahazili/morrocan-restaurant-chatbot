import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/store/cartStore';
import {ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Cart } from '@/components/Cart';

export const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="bg-moroccan-red text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Restaurant Logo/Name */}
        <Link 
          to="/" 
          className="text-2xl font-bold font-arabic hover:text-moroccan-gold transition-colors"
          aria-label="Home"
        >
          مطعم علاء
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/menu" 
            className="hover:text-moroccan-gold transition-colors"
            aria-label="View menu"
          >
            Menu
          </Link>
          <Link 
            to="/about" 
            className="hover:text-moroccan-gold transition-colors"
            aria-label="About us"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-moroccan-gold transition-colors"
            aria-label="Contact us"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button (optional) */}
        <button 
          className="md:hidden p-2"
          aria-label="Open menu"
          // Add mobile menu toggle logic here
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        {/* Cart Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 group"
          aria-label={`Shopping cart (${totalItems()} items)`}
        >
          <ShoppingCartIcon className="h-6 w-6 text-white group-hover:text-moroccan-gold transition-colors" />
          {totalItems() > 0 && (
            <span 
              className="absolute -top-1 -right-1 bg-moroccan-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              aria-hidden="true"
            >
              {totalItems()}
            </span>
          )}
        </button>

        {/* Cart Overlay */}
        {isCartOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsCartOpen(false)}>
            <Cart onClose={() => setIsCartOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  );
};