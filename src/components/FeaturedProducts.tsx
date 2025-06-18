import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useStore } from "../stores/store";

const FeaturedProducts: React.FC = () => {
  const  onDecreaseQuantity  = useStore((state) => state.decreaseQuantity);
  const  onIncreaseQuantity  = useStore((state) => state.increaseQuantity);
  const  onRemoveFromCart  = useStore((state) => state.removeFromCart);
  const  cartItems  = useStore((state) => state.cart);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Cart Items
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-3">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-full flex-wrap"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-12 h-12 object-contain rounded-md shadow-sm"
                loading="lazy"
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-800 truncate max-w-[140px]">
                  {product.title}
                </p>
                <p className="text-xs text-gray-500">₹{product.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecreaseQuantity(product.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full"
                  title="Decrease Quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">
                  {product.quantity}
                </span>
                <button
                  onClick={() => onIncreaseQuantity(product.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full"
                  title="Increase Quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onRemoveFromCart(product.id)}
                className="ml-2 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 p-1 rounded-full"
                title="Remove from Cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
