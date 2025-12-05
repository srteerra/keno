"use client"
import Image from "next/image";
import ItsFine from "../assets/images/fine.png";
import { IoIosArrowDown } from "react-icons/io";
import { useTips } from "@/hooks/useTips";
import React, { useEffect } from "react";
import { useTipStore } from "@/stores/Tip.store";
import { Header } from "@/components/layout/header";
import { CategoryBadge } from "@/components/tips/category-badge";
import { MainContainer } from "@/components/tips/main-container";
import { Category } from "@/types/category";
import { Examples } from "@/components/tips/examples";

export default function Home() {
  const { getTip } = useTips();
  const tip = useTipStore(state => state.tip);
  const showExamples = useTipStore(state => state.showExamples);

  const examplesCount = tip?.examples?.length ?? 0;

  const handleNewTip = async (type: Category) => {
    await getTip(type);
  }

  useEffect(() => {
    getTip();
  }, []);

  return (
    <div className={"h-full"}>
      <Header />

      <main className="flex justify-center flex-col items-center mt-18">
        <Image src={ItsFine} alt={"It is fine"} width={200} />

        <div className={'flex gap-2 my-6'}>
          {Object.values(Category).map((category: Category) =>
            <CategoryBadge onClick={() => handleNewTip(category)} key={category} type={category} />
          )}
        </div>

        <MainContainer />

        {showExamples && examplesCount > 0 && <Examples/>}

        <div className={'flex items-center justify-center my-16'}>
          <button className="btn btn-link no-underline flex flex-col items-center gap-4">
            <span>Mostrar tips anteriores</span>
            <IoIosArrowDown />
          </button>
        </div>
      </main>
    </div>
  );
}
