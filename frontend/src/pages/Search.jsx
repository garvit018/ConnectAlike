import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`flex items-center bg-gray-100 rounded-full px-5 py-2 mt-12 mb-12 transition-all duration-300 ${
        isActive ? "w-[90%]" : "w-[80%]"
      }`}
    >
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 bg-transparent outline-none text-base"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      <FiSearch
        className={`ml-2 text-gray-400 transition-colors duration-300 ${
          isActive ? "text-gray-700" : "hover:text-gray-700"
        }`}
      />
    </div>
  );
};

export default Search;
