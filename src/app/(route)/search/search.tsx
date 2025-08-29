"use client";

import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <form>
      <div className="relative">
        <input
          type="text"
          className="border-2 border-gray-300 border-solid opacity-100 rounded-2xl py-1 md:px-4 md:pr-20 pl-4"
        />
        <button type="submit" className="absolute top-2 right-2">
          <IoSearch className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </form>
  );
}
