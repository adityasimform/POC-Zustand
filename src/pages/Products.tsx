import { useEffect, useRef } from "react";
import { useStore } from "../stores/store";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import FeaturedProducts from "../components/FeaturedProducts";

const PREFETCH_OFFSET = 1;

const ProductPage = () => {
  const {
    products,
    fetchProducts,
    deleteProduct,
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    loading,
    error,
    hasMore,
  } = useStore((state) => state);

  useEffect(() => {
    if (!products.length && !loading && !error) {
      fetchProducts();
    }
  }, [fetchProducts, loading, products.length, error]);

  const loadingRef = useRef(false);

  const handleItemsRendered = ({
    visibleRowStopIndex,
    rowCount,
  }: {
    visibleRowStopIndex: number;
    rowCount: number;
  }) => {
    if (
      !loadingRef.current &&
      hasMore &&
      visibleRowStopIndex >= rowCount - PREFETCH_OFFSET
    ) {
      loadingRef.current = true;
      fetchProducts().finally(() => {
        loadingRef.current = false;
      });
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        🛒 Explore Products
      </h1>

      <div className="grid grid-cols-12 gap-4">
        <aside className="col-span-12 lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <Filters />
        </aside>

        <div className="flex flex-col w-full col-span-12 lg:col-span-7">
          <div className="h-[80vh] overflow-y-auto max-h-[80vh] pr-2">
            {error && (
              <div className="flex flex-col items-center justify-center text-center bg-red-50 border border-red-200 text-red-700 px-6 py-10 rounded-xl shadow-md mb-8 max-w-xl mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636a9 9 0 11-12.728 0M12 9v4m0 4h.01"
                  />
                </svg>
                <h2 className="text-2xl font-semibold">
                  Failed to load products
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {error ||
                    "Something went wrong while fetching the products. Please try again."}
                </p>
                <button
                  onClick={() => fetchProducts()}
                  className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  Retry
                </button>
              </div>
            )}
            {!error && (
              <>
                <AutoSizer>
                  {({ height, width }) => {
                    const columnCount = 2;
                    const rowCount = Math.ceil(products.length / columnCount);
                    return (
                      <Grid
                        columnCount={columnCount}
                        columnWidth={width / columnCount}
                        height={height}
                        rowCount={rowCount}
                        rowHeight={340}
                        width={width}
                        onItemsRendered={({ visibleRowStopIndex }) =>
                          handleItemsRendered({
                            visibleRowStopIndex,
                            rowCount,
                          })
                        }
                      >
                        {({ columnIndex, rowIndex, style }) => {
                          const idx = rowIndex * columnCount + columnIndex;
                          const product = products[idx];
                          if (!product) return null;
                          return (
                            <div style={style} className="p-2 h-full">
                              <ProductCard
                                product={product}
                                onDelete={() => deleteProduct(product.id)}
                                onAddToCart={() => addToCart(product)}
                              />
                            </div>
                          );
                        }}
                      </Grid>
                    );
                  }}
                </AutoSizer>
                {loading && (
                  <div className="text-center mt-2">Loading more...</div>
                )}
              </>
            )}
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-3 bg-white p-6 rounded-2xl shadow-md">
          <FeaturedProducts
            cartItems={cart}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            onRemoveFromCart={removeFromCart}
          />
        </aside>
      </div>
    </div>
  );
};

export default ProductPage;
