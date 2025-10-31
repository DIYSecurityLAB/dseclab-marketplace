"use client";

import Link from "next/link";
import { useRef } from "react";

export function HeroSection() {
  const batteryCheckboxRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex xl:flex-row flex-col bg-[url('/products_lp/platekit_hero_bg.png')] bg-black bg-cover bg-no-repeat xl:bg-center bg-right mx-auto p-6 sm:p-8 md:p-12 xl:p-20 w-full max-w-352 text-white">
      <div className="relative flex flex-col justify-center gap-4 sm:gap-6 xl:gap-8 px-4 sm:px-6 md:px-10 xl:px-16 w-full">
        <div className="xl:hidden right-0 absolute bg-[url(/products_lp/blackfriday_promo_badge.png)] bg-contain bg-center backdrop-blur-md rounded-full w-20 sm:w-24 aspect-square" />
        <div className="xl:hidden flex justify-between items-start">
          <h6 className="text-accent text-sm sm:text-base uppercase">
            PLATE KIT
          </h6>
        </div>
        <h6 className="hidden xl:block text-accent text-sm sm:text-base uppercase">
          PLATE KIT
        </h6>
        <h1 className="font-bold text-3xl sm:text-4xl xl:text-5xl leading-tight xl:leading-18">
          O Kit mais resistente
          <br />
          para armazenar suas
          <br /> 12/24 palavras
        </h1>
        <p className="text-sm sm:text-base leading-7">
          Promoção de 25% - de 01/11/2055 até 30/11/2025
          <br /> ou até acabarem os estoques
        </p>

        <div className="xl:hidden block self-end by-16">
          <div className="bg-[url(/i/noconnicons.png)] bg-contain bg-center w-[127px] aspect-127/32" />
        </div>
        {/* <div className="flex flex-col">
          <span className="text-accent text-lg sm:text-xl">R$915,00</span>
          <span className="text-accent text-3xl sm:text-4xl xl:text-5xl">
            R$658,00
          </span>
        </div>

        <div className="flex sm:flex-row flex-col gap-3 sm:gap-4">
          <button className="bg-accent px-4 py-2 font-medium text-black text-sm sm:text-base">
            Comprar
          </button>
          <button className="flex justify-center sm:justify-start items-center gap-2 px-4 py-2 font-medium text-accent text-sm sm:text-base">
            Saiba mais
            <svg
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9333 9.26667L5.46667 14.7333L0 9.26667L0.733333 8.53333L5 12.8V0H6V12.8L10.2667 8.53333L10.9333 9.26667Z"
                fill="#FE8012"
              />
            </svg>
          </button>
        </div> */}
      </div>
      <div className="hidden xl:block relative mt-8 xl:mt-0 w-full xl:w-1/2 min-h-48 sm:min-h-64 xl:min-h-0">
        <div className="top-1/2 right-4 sm:right-8 xl:right-0 absolute bg-[url(/products_lp/blackfriday_promo_badge.png)] bg-contain bg-center backdrop-blur-md rounded-full w-24 sm:w-32 xl:w-1/4 aspect-square overflow-hidden -translate-y-1/2"></div>
        <div className="hidden xl:block right-0 bottom-0 absolute">
          <div className="bg-[url(/i/noconnicons.png)] bg-contain bg-center w-[127px] aspect-127/32" />
        </div>
      </div>
    </div>
  );
}
