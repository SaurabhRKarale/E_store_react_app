import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../store/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicked on button
    dispatch(addToCart(product));
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden transition-all duration-200 h-full">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-slate-600 uppercase tracking-wider shadow-sm">
          {product.category}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-medium text-slate-900 line-clamp-2 hover:text-brand-600 transition-colors min-h-[3rem]">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-slate-700">{product.rating.rate}</span>
          <span className="text-sm text-slate-400">({product.rating.count})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-50">
          <span className="text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-900 hover:bg-brand-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-label="Add to cart"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;