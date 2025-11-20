import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Check, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../store/cartSlice';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await api.fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-brand-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Product not found</h2>
        <Link to="/" className="text-brand-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-600 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="p-8 md:p-12 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[400px] w-full object-contain"
            />
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 flex flex-col">
            <span className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-bold text-slate-900">{product.rating.rate}</span>
                <span className="text-slate-500 mx-1">•</span>
                <span className="text-slate-600 text-sm">{product.rating.count} reviews</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-slate-900 mb-8">
              ${product.price.toFixed(2)}
            </div>

            <div className="prose prose-slate text-slate-600 mb-8 max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-4 px-8 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all duration-200 ${
                  added
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg active:transform active:scale-[0.98]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-6 w-6" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-6 w-6" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;