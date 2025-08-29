"use client";

import SimpleSlider from "./components/SimpleSlider";
import CenterMode from "./components/CenterMode";
import Header from "@/components/layout/Header";
import TopButton from "./components/topbutton/TopButton";

export default function Home() {
  return (
    <main>
      <section>
        <SimpleSlider />
      </section>
      <section>
        <CenterMode />
      </section>
      <TopButton />
    </main>
  );
}
