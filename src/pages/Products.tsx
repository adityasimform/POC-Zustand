import { useEffect, useRef, useState } from "react";
import { useStore } from "../stores/store";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";
import ProductCard from "../components/ProductCard";
import FeaturedProducts from "../components/FeaturedProducts";
import FilterSidebar from "../components/Filters";
import type { Product } from "../stores/slices/productsSlice";
import { AddProductButton } from "../components/AddProductModal";
import AddProductModal from "../components/AddProductModal";
import { Plus } from "lucide-react";

const PREFETCH_OFFSET = 1;

const ProductPage = () => {
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const hasMore = useStore((state) => state.hasMore);
  const priceRange = useStore((state) => state.priceRange);
  const selectedBrands = useStore((state) => state.selectedBrands);
  const minDiscount = useStore((state) => state.minDiscount);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

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

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const inPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const inBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product?.brand);
      const inDiscount = product.discount >= minDiscount;
      return inPrice && inBrand && inDiscount;
    });
    setFilteredProducts(filteredProducts);
  }, [products, priceRange, selectedBrands, minDiscount]);

  const isFiltering =
    priceRange[0] !== 0 ||
    priceRange[1] !== 2000 ||
    selectedBrands.length > 0 ||
    minDiscount > 0;

  const displayProducts = isFiltering ? filteredProducts : products;

  const getProductForm = (product: Product) => ({
    ...product,
    price: String(product.price),
    discount: String(product.discount),
    description: product.description ?? "",
    model: product.model ?? "",
    color: product.color ?? "",
    category: product.category ?? "",
  });

  return (
    <div className="p-6 min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center dark:text-white rounded-2xl py-4 ">
        🛒 Explore Products
      </h1>
      <AddProductButton />

      <button
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl z-50 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => {
          setEditProduct(null);
          setModalOpen(true);
        }}
        title="Add Product"
      >
        <Plus className="w-6 h-6" />
      </button>
      <AddProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editProduct ? getProductForm(editProduct) : null}
        mode={editProduct ? "edit" : "add"}
      />

      <div className="grid grid-cols-12 gap-6 dark:shadow-gray-900">
        <aside className="col-span-12 lg:col-span-2  dark:bg-[#23272f] dark:border dark:border-gray-700  rounded-2xl shadow-xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700 rounded-2xl shadow-xl select-none">
          <FilterSidebar />
        </aside>

        <div className="flex flex-col w-full col-span-12 lg:col-span-7">
          <div className="h-[80vh] overflow-y-auto max-h-[80vh] dark:scrollbar-dark">
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
                    const minCardWidth = 400;
                    const columnCount = Math.max(
                      1,
                      Math.floor(width / minCardWidth)
                    );
                    const columnWidth = Math.floor(width / columnCount) - 12;
                    const rowCount = Math.ceil(
                      displayProducts.length / columnCount
                    );

                    return (
                      <Grid
                        columnCount={columnCount}
                        columnWidth={columnWidth}
                        height={height}
                        rowCount={rowCount}
                        rowHeight={420}
                        width={width}
                        onItemsRendered={({ visibleRowStopIndex }) => {
                          if (!isFiltering) {
                            handleItemsRendered({
                              visibleRowStopIndex,
                              rowCount,
                            });
                          }
                        }}
                      >
                        {({ columnIndex, rowIndex, style }) => {
                          const idx = rowIndex * columnCount + columnIndex;
                          const product = displayProducts[idx];
                          if (!product) return null;
                          return (
                            <div style={{ ...style }} className="p-2 h-full">
                              <ProductCard
                                product={product}
                                onEdit={(prod) => {
                                  setEditProduct(prod);
                                  setModalOpen(true);
                                }}
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

        <aside className="col-span-12 lg:col-span-3  dark:bg-[#23272f] dark:border p-4 rounded-2xl shadow-xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700  select-none">
          <FeaturedProducts />
        </aside>
      </div>
    </div>
  );
};

export default ProductPage;
