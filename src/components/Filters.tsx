import React from "react";

const Filters: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default Filters;