import React from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import type { Product } from "../stores/slices/productsSlice";
import { useStore } from "../stores/store";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const onAddToCart = useStore((state) => state.addToCart);
  const deleteProduct = useStore((state) => state.deleteProduct);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const handleDelete = (id: number) => {
    deleteProduct(id);
    removeFromCart(id);
  };

  return (
    <div className="w-full bg-white dark:bg-[#23272f] dark:border dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl p-6 flex flex-col transition-transform hover:scale-105 duration-200 h-full relative overflow-hidden">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-48 object-contain mb-4 rounded-lg bg-gray-100 dark:bg-gray-900"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://www.apple.com/v/airpods/x/images/overview/airpods_max_blue__fsfaleh1smuu_large.png";
        }}
      />
      <h2
        className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 truncate"
        title={product.title}
      >
        {product.title}
      </h2>
      <div className="flex flex-wrap gap-1 mb-1 overflow-hidden">
        {product.brand && (
          <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded truncate max-w-[80px]" title={product.brand}>
            {product.brand}
          </span>
        )}
        {product.model && (
          <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded truncate max-w-[80px]" title={product.model}>
            {product.model}
          </span>
        )}
        {product.category && (
          <span className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-2 py-0.5 rounded truncate max-w-[80px]" title={product.category}>
            {product.category}
          </span>
        )}
        {product.color && (
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded truncate max-w-[80px]" title={product.color}>
            {product.color}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2 break-words overflow-hidden" title={product.description}>
        {product.description}
      </p>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
          ₹{product.price}
        </span>
        {product.discount ? (
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded font-medium truncate">
            -{product.discount}%
          </span>
        ) : null}
      </div>
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button
          onClick={() => handleDelete(product.id)}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-300 transition-colors p-2 rounded-full"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-green-500 hover:text-white text-gray-700 dark:text-gray-300 transition-colors p-2 rounded-full"
          title="Add to Cart"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
