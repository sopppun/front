"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ul id="menu" className=" hidden md:flex items-center">
      <li className="pr-7 font-bold text-xl">
        <a href="#">BEST</a>
      </li>
      <li className="pr-7">
        <a href="#">남성</a>
      </li>
      <li className="pr-7">
        <a href="#">여성</a>
      </li>
      <li className="pr-7">
        <a href="#">신발</a>
      </li>
      <li>
        <a href="#">가방 & 용품</a>
      </li>
      <li className="pl-7">
        <Link href={"/articles"}>게시글</Link>
      </li>
    </ul>
  );
}
