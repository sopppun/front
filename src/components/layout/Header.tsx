"use client";

import Link from "next/link";
import Nav from "../navigation/nav";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY < 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full h-[72px] flex items-center justify-between p-4 shadow-md fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-black opacity-100"
          : "bg-black text-white opacity-70"
      }`}
    >
      <Link href="/" className="text-5xl md:text-2xl font-bold">
        JDK
      </Link>
      <Nav />
    </header>
  );
}
