"use client";

import Image from "next/image";
import { IoSearch } from "react-icons/io5";

import { useState } from "react";

export default function Search() {
  return (
    <form>
      <div className="relative">
        <input
          type="text"
          className="border-2 border-gray-300 border-solid rounded-2xl py-1 md:px-4 md:pr-20 pl-4"
        />
        <button type="submit">
          <IoSearch className="absolute top-2 right-2" />
        </button>
      </div>
    </form>
  );
}
