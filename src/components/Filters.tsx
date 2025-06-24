import { useMemo } from "react";
import { useStore } from "../stores/store";

const FilterSidebar = () => {
  const {
    products,
    priceRange,
    minDiscount,
    setFilters,
    clearFilters,
    selectedBrands,
  } = useStore();

  const [maxPrice] = useMemo(() => {
    const prices = products.map((p) => p.price);
    return [Math.max(...prices)];
  }, [products]);

  const uniqueBrands = [...new Set(products.map((p) => p.brand))].filter(
    (b): b is string => typeof b === "string"
  );

  return (
   <aside className="col-span-12 lg:col-span-2 p-6  select-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100">
          Filters
        </h2>
        <button
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded cursor-pointer"
          onClick={clearFilters}
          type="button"
          tabIndex={0}
        >
          Reset
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Max Price:{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            ₹{priceRange[1]}
          </span>
        </label>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) =>
            setFilters({ priceRange: [0, parseInt(e.target.value)] })
          }
          className="w-full accent-indigo-500 cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Brands
        </h3>
        <div className="space-y-1 max-h-[150px] overflow-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900">
          {uniqueBrands?.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  const newSelection = e.target.checked
                    ? [...selectedBrands, brand]
                    : selectedBrands.filter((b) => b !== brand);
                  setFilters({ selectedBrands: newSelection });
                }}
                className="accent-indigo-500 cursor-pointer"
                tabIndex={0}
              />
              <span className="capitalize">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Minimum Discount (%)
        </label>
        <input
          type="number"
          value={minDiscount}
          min={0}
          max={100}
          className="w-full border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setFilters({ minDiscount: parseInt(e.target.value) })
          }
          tabIndex={0}
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
