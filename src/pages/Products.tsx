import { useCallback, useEffect, useRef } from "react";
import { useStore } from "../stores/store";
import { Trash2 } from "lucide-react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";

const PREFETCH_OFFSET = 1;
const ProductPage = () => {
  const { products, fetchProducts, deleteProduct, loading, error, hasMore } =
    useStore((state) => state);

  useEffect(() => {
    if (!products.length && !loading) {
      fetchProducts();
    }
  }, [fetchProducts, loading, products.length]);

  const loadingRef = useRef(false);

  const handleItemsRendered = useCallback(
    ({ visibleRowStopIndex, rowCount }: { visibleRowStopIndex: number; rowCount: number }) => {
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
    },
    [hasMore, fetchProducts]
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        🛒 Explore Products
      </h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-600">Category</span>
              <select className="w-full border rounded-md p-2 mt-1 focus:ring focus:ring-indigo-300">
                <option>All</option>
                <option>Audio</option>
                <option>Mobile</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-gray-600">Price Range</span>
              <input type="range" className="w-full mt-2 accent-indigo-500" />
            </label>
          </div>
        </aside>

        <div className="flex flex-col  w-full col-span-12 lg:col-span-7">
          <div className="h-[80vh] overflow-y-auto max-h-[80vh] pr-2">
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
                          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 flex flex-col transition-transform hover:scale-[1.02] duration-200 h-full relative">
                          <img
                            src={
                            product.image ||
                            "https://th.bing.com/th/id/OIP.tH2DUWrXR8LW11ZRZ4SFbwHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc1"
                            }
                            alt={product.title}
                            className="w-full h-48 object-contain mb-4 rounded-lg"
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
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="absolute top-3 right-3 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 transition-colors p-2 rounded-full z-10"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          </div>
                        </div>
                      );
                    }}
                  </Grid>
                );
              }}
            </AutoSizer>
            {loading && <div className="text-center mt-2">Loading more...</div>}
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-3 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Featured Products
          </h2>
          <div className="space-y-4 ">
            {products?.slice(0, 5)?.map((product) => (
              <div key={product?.id} className="flex items-center gap-4">
                <img
                  src={
                    product.image ||
                    "https://th.bing.com/th/id/OIP.tH2DUWrXR8LW11ZRZ4SFbwHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc1"
                  }
                  alt={product?.title}
                  className="w-16 h-16 object-contain rounded-lg shadow"
                />
                <div className="flex flex-col overflow-hidden">
                  <p className="font-medium text-sm text-gray-800 truncate">
                    {product?.title}
                  </p>
                  <p className="text-xs text-gray-500">₹{product?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductPage;
