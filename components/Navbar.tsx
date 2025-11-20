import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '../store/store';
import { selectCartTotalCount } from '../store/cartSlice';

const Navbar: React.FC = () => {
  const cartCount = useAppSelector(selectCartTotalCount);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors">
          <ShoppingBag className="h-8 w-8" />
          <span className="font-bold text-xl tracking-tight text-slate-900">TechSurvi</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:block font-medium text-slate-600 hover:text-brand-600 transition-colors">
            Products
          </Link>
          
          <Link 
            to="/cart" 
            className="relative p-2 text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-full transition-all group"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-white min-w-[1.25rem]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;