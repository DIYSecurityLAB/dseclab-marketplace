"use client";

import Marquee from "react-fast-marquee";

const slidingPartners = [
  "/products_lp/partners/alfred.png",
  "/products_lp/partners/paguebit.png",
  "/products_lp/partners/fraguismo.png",
  "/products_lp/partners/caminhosoberano.png",
  "/products_lp/partners/educacaoreal.png",
  "/products_lp/partners/_.png",
];

export function PartnersMarquee() {
  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden">
      <Marquee loop={0} autoFill>
        {slidingPartners.map((p, i) => {
          return (
            <div
              key={`partner.${p}.${i}`}
              className="bg-contain bg-center w-[214px] aspect-214/128"
              style={{
                backgroundImage: `url(${p})`,
              }}
            />
          );
        })}
      </Marquee>
    </div>
  );
}
