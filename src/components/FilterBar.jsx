import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FilterBar = ({ filterId, setFilterId, filterName, setFilterName }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
      {/* Filter by User ID */}
      <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white w-full md:w-1/2 relative">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Filter by User ID"
          className="outline-none w-full"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
        />
        {filterId && (
          <FaTimes
            className="absolute right-2 text-gray-400 cursor-pointer"
            onClick={() => setFilterId("")}
          />
        )}
      </div>

      {/* Filter by User Name */}
      <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white w-full md:w-1/2 relative">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Filter by User Name"
          className="outline-none w-full"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        {filterName && (
          <FaTimes
            className="absolute right-2 text-gray-400 cursor-pointer"
            onClick={() => setFilterName("")}
          />
        )}
      </div>
    </div>
  );
};

export default FilterBar;
