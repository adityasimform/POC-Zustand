import React from "react";
import { Trash2, ShoppingCart, SquarePen } from "lucide-react";
import type { Product } from "../stores/slices/productsSlice";
import { useStore } from "../stores/store";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const onAddToCart = useStore((state) => state.addToCart);
  const deleteProduct = useStore((state) => state.deleteProduct);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    removeFromCart(id);
  };

  return (
    <div
      className="w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl p-6 flex flex-col transition-transform hover:scale-[1.03] duration-200 h-full relative overflow-hidden group"
      tabIndex={0}
      aria-label={product.title}
    >
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-48 object-contain mb-4 rounded-lg bg-gray-100 dark:bg-gray-900 select-none pointer-events-none"
        loading="lazy"
        draggable={false}
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
          <span
            className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded truncate max-w-[80px] cursor-pointer"
            title={product.brand}
          >
            {product.brand}
          </span>
        )}
        {product.model && (
          <span
            className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded truncate max-w-[80px] cursor-pointer"
            title={product.model}
          >
            {product.model}
          </span>
        )}
        {product.category && (
          <span
            className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-2 py-0.5 rounded truncate max-w-[80px] cursor-pointer"
            title={product.category}
          >
            {product.category}
          </span>
        )}
        {product.color && (
          <span
            className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded truncate max-w-[80px] cursor-pointer"
            title={product.color}
          >
            {product.color}
          </span>
        )}
      </div>
      <p
        className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2 break-words overflow-hidden"
        title={product.description}
      >
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
      <div className="absolute top-3 right-3 flex gap-2 z-10 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
             handleDelete(product.id);
          }}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-300 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
          title="Delete"
          tabIndex={0}
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-green-500 hover:text-white text-gray-700 dark:text-gray-300 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
          title="Add to Cart"
          tabIndex={0}
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(product);
          }}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-300 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          title="Edit"
          tabIndex={0}
        >
          <SquarePen className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
