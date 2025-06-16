import { useEffect, useState } from "react";
import { useStore } from "../stores/store";
import type { Product } from "../stores/slices/productsSlice";
import { Trash2 } from "lucide-react";

const ProductPage = () => {
  const { products, fetchProducts, deleteProduct, loading, error } = useStore(
    (state) => state
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!products.length && !loading) {
      fetchProducts();
    }
  }, [fetchProducts, loading, products.length]);

  const limit = 10;

  useEffect(() => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    fetchProducts(start, end);
  }, [currentPage]);

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));

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
          <main className=" grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[80vh] pr-2">
            {products?.map((product: Product) => (
              <div
                key={product?.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-200"
              >
                <img
                  src={
                    product.image ||
                    "https://th.bing.com/th/id/OIP.tH2DUWrXR8LW11ZRZ4SFbwHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc1"
                  }
                  alt={product?.title}
                  className="w-full h-48 object-contain mb-4 rounded-lg"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                  {product?.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  {product?.brand} {product?.model ? `- ${product?.model}` : ""}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {product?.category} | {product?.color}
                </p>
                <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                  {product?.description?.substring(0, 100)}...
                </p>
                <p className="text-lg font-bold text-indigo-700 mb-4">
                  ₹{product?.price}{" "}
                  {product?.discount ? `(-${product?.discount}%)` : ""}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => deleteProduct(product?.id)}
                    className="bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 transition-colors p-2 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </main>
          <div className="flex justify-center mt-8 space-x-4 w-full">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 font-medium self-center">
              {currentPage}
            </span>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded"
            >
              Next
            </button>
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
