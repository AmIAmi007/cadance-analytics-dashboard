import React from "react";

const FilterControls = ({ availableKeys, selectedKey, onKeyChange }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
      <div className="flex items-center gap-4">
        <label className="text-white font-semibold">Filter by Key:</label>
        <select
          value={selectedKey}
          onChange={(e) => onKeyChange(e.target.value)}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer hover:bg-purple-700"
          style={{ colorScheme: "dark" }}
        >
          <option value="All" className="bg-purple-700 text-white">
            All Keys
          </option>
          {availableKeys.map((key) => (
            <option key={key} value={key} className="bg-purple-700 text-white">
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
