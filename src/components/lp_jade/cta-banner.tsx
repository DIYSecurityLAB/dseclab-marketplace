"use client";

import Link from "next/link";

export function CtaBanner() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-4 bg-[url(/products_lp/cta_banner.png)] bg-cover bg-no-repeat bg-center mx-auto px-16 py-12 w-full max-w-7xl text-center">
      <div className="flex flex-col gap-4">
        <span>Não perca a oferta de Black Friday</span>
        <h2 className="font-bold text-3xl">Atinja sua soberania agora</h2>
        <p>
          Promoção de 25% - de 01/11/2055 até 30/11/2025 <br />
          ou até acabarem os estoques
        </p>
      </div>
      <Link href="/products/jage"></Link>
      <button className="bg-white px-4 py-2 w-fit cursor-pointer">
        Comprar Agora
      </button>
      <div className="top-1/2 right-16 absolute bg-[url(/products_lp/blackfriday_promo_badge_inverted.png)] bg-contain bg-no-repeat bg-center w-[200px] aspect-square -translate-y-1/2" />
    </div>
  );
}
