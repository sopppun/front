"use client";
import { useState } from "react";
import WishListPage from "./WishListPage";
import CartPage from "./CartPage";

export default function CartList() {
  const [selectedTab, setSelectedTab] = useState("cart");

  return (
    <div className="flex  gap-3 mt-[80px] h-[calc(100dvh-100px)]">
      <ul className="flex gap-2 flex-col  w-full max-w-60 p-2">
        <li
          onClick={() => setSelectedTab("cart")}
          className={`cursor-pointer p-3  border border-gray-200 rounded-md hover:opacity-80 ${
            selectedTab === "cart" ? "bg-black text-white" : "bg-white"
          } `}
        >
          장바구니
        </li>
        <li
          onClick={() => setSelectedTab("wishList")}
          className={`cursor-pointer p-3 border border-gray-200 rounded-md hover:opacity-80 ${
            selectedTab === "wishList" ? "bg-black text-white" : "bg-white"
          }`}
        >
          위시리스트
        </li>
      </ul>

      <div className="w-full">
        {selectedTab === "cart" ? <CartPage /> : <WishListPage />}
      </div>
    </div>
  );
}
