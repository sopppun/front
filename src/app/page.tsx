"use client";

import Image from "next/image";
import Nav from "./nav/nav";
import Search from "./search/search";
import Menu from "./menu/menu";
import Link from "next/link";
import SimpleSlider from "./components/SimpleSlider";
import DynamicSlides from "./components/DynamicSildes";
import CenterMode from "./components/CenterMode";

export default function Home() {
  return (
    <main>
      {/* <header className="flex justify-between items-center w-full h-16 border border-b-slate-950 box-border">
        <h1 className="font-bold text-3xl pl-5">
          <Link href="/">JDK</Link>
        </h1>
        <Menu />
        <Search />
        <Nav />
      </header> */}

      {/* 이미지 슬라이더 추가 */}
      <section>
        <SimpleSlider />
      </section>
      <section>
        <CenterMode />
      </section>
    </main>
  );
}
