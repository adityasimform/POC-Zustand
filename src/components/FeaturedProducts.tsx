import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useStore } from "../stores/store";

const FeaturedProducts: React.FC = () => {
  const onDecreaseQuantity = useStore((state) => state.decreaseQuantity);
  const onIncreaseQuantity = useStore((state) => state.increaseQuantity);
  const onRemoveFromCart = useStore((state) => state.removeFromCart);
  const cartItems = useStore((state) => state.cart);

  return (
    <div className="dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700 rounded-2xl shadow-xl p-6 select-none">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-3">
        Cart Items
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-3">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-full flex-wrap"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-12 h-12 object-contain rounded-md shadow-sm select-none pointer-events-none"
                loading="lazy"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://www.apple.com/v/airpods/x/images/overview/airpods_max_blue__fsfaleh1smuu_large.png";
                }}
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100 truncate max-w-[140px]">
                  {product.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ₹{product.price}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecreaseQuantity(product.id)}
                  className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                  title="Decrease Quantity"
                  type="button"
                  tabIndex={0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 min-w-[20px] text-center select-text">
                  {product.quantity}
                </span>
                <button
                  onClick={() => onIncreaseQuantity(product.id)}
                  className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                  title="Increase Quantity"
                  type="button"
                  tabIndex={0}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onRemoveFromCart(product.id)}
                className="ml-2 bg-gray-200 dark:bg-gray-600 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-gray-100 text-gray-700 dark:text-gray-300 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                title="Remove from Cart"
                type="button"
                tabIndex={0}
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
