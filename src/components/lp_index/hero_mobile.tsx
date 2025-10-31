"use client";

import { motion } from "motion/react";

export default function HeroMobile() {
  return (
    <div className="lg:hidden block overflow-hidden">
      <div className="relative w-full">
        {/* Hero BG */}
        <motion.div
          className="z-1 bg-cover w-full h-[60vh]"
          style={{
            backgroundImage: "url('/i/hero_bg.png')",
            backgroundPositionX: "center",
            backgroundPositionY: "top",
            scale: 1,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        />
        {/* Watermark */}
        <div className="top-2/12 left-1/2 z-2 absolute w-full md:w-2/3 h-[65vh] -translate-x-1/2 mix-blend-soft-light">
          <div
            className="bg-contain bg-no-repeat bg-center w-full aspect-1669/438"
            style={{
              backgroundImage: "url('/i/hero_watermark.png')",
            }}
          />
        </div>
        {/* Content */}
        <div className="z-2 flex flex-col gap-6 md:gap-8 bg-white px-10 pt-10 rounded-4xl w-full overflow-hidden -translate-y-10">
          <div className="relative grid grid-cols-12 grid-rows-1">
            <div className="flex flex-col gap-4 md:gap-8 col-span-6 w-full text-2xl sm:text-3xl md:text-5xl">
              <div
                className="bg-start bg-contain bg-no-repeat h-8 md:h-10 aspect-216/55"
                style={{
                  backgroundImage: "url('/i/hero_norficons.png')",
                }}
              />
              <div className="flex flex-col gap-1 md:gap-4 font-semibold">
                <h1 className="text-black">
                  CARTEIRA <br />
                  DE BITCOIN
                </h1>
                <h1 className="text-accent">
                  MAIS SEGURA
                  <br />
                  DO MUNDO
                </h1>
              </div>
              <p className="text-xl md:text-3xl">
                Carteira fria de <strong>código aberto</strong> com sistema Krux{" "}
                <strong>100% offline</strong>
                <span className="ml-1 text-sm">(air gapped)</span>, amnesica.
              </p>
            </div>
            <motion.div
              className="-right-[10%] md:-right-[5%] absolute bg-contain bg-no-repeat bg-center w-9/12 sm:w-8/12 md:w-2/3 aspect-288/229"
              style={{
                backgroundImage: "url('/i/hero_mobile.png')",
              }}
              initial={{ opacity: 0, x: 50, y: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [-20, -30, -20],
              }}
              transition={{
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
                y: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                scale: 1.05,
                rotate: -2,
                transition: { duration: 0.3 },
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-6">
            <a href="">
              <div className="group p-0.5 lg:p-1 border-2 border-black hover:border-accent rounded-full font-semibold text-white hover:scale-105 duration-200">
                <div className="bg-black group-hover:bg-accent px-6 lg:px-8 py-2 lg:py-3 rounded-full text-2xl sm:text-3xl md:text-4xl tracking-widest duration-200">
                  COMPRE <strong>AGORA!</strong>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
