import React from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import type { Product } from "../stores/slices/productsSlice";
import { useStore } from "../stores/store";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const  onAddToCart  = useStore((state) => state.addToCart);
  const  onDelete  = useStore((state) => state.deleteProduct);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 flex flex-col transition-transform hover:scale-[1.02] duration-200 h-full relative">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-48 object-contain mb-4 rounded-lg"
        loading="lazy"
      />

      <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
        {product.title}
      </h2>

      <p className="text-sm text-gray-600 mb-1">
        {product.brand}
        {product.model ? ` - ${product.model}` : ""}
      </p>

      <p className="text-sm text-gray-500 mb-1">
        {product.category} | {product.color}
      </p>

      <p className="text-sm text-gray-700 mb-2 line-clamp-3">
        {product.description?.substring(0, 100)}...
      </p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-semibold text-gray-800">
          ₹{product.price}
        </span>
        {product.discount ? (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
            -{product.discount}%
          </span>
        ) : null}
      </div>

      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() =>onDelete(product.id)}
          className="bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 transition-colors p-2 rounded-full z-10"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <button
          onClick={() => onAddToCart(product)}
          className="bg-gray-100 hover:bg-green-500 hover:text-white text-gray-700 transition-colors p-2 rounded-full z-10"
          title="Add to Cart"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
