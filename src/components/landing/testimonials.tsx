"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { testimonialImages } from "@/config/landing.config";

import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="z-4 relative -mt-36 p-12 md:p-8 lg:p-12 xl:p-16">
      <section className="relative bg-gray-200 shadow-2xl mx-auto -mb-8 md:-mb-12 lg:-mb-16 xl:-mb-20 py-12 md:py-16 lg:py-20 w-full max-w-7xl translate-y-1/4">
        {/* Corner Decorations */}
        <div className="top-0 left-0 absolute bg-white p-1 border-2 border-black -translate-x-1/2 -translate-y-1/2"></div>
        <div className="top-0 right-0 absolute bg-white p-1 border-2 border-black -translate-y-1/2 translate-x-1/2"></div>
        <div className="bottom-0 left-0 absolute bg-white p-1 border-2 border-black -translate-x-1/2 translate-y-1/2"></div>
        <div className="right-0 bottom-0 absolute bg-white p-1 border-2 border-black translate-x-1/2 translate-y-1/2"></div>

        <div className="mx-auto px-8 md:px-12 lg:px-16 xl:px-20 container">
          <div className="items-start gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-[40%_60%]">
            {/* Left Column: Text + Controls */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-8 lg:mb-12">
                <h2 className="mb-4 md:mb-6 font-black text-2xl md:text-4xl xl:text-5xl">
                  <span className="text-accent">+DE 100 FEEDBACK</span> DE
                  CLIENTES QUE CONFIAM NO NOSSO TRABALHO!
                </h2>
                <p className="mb-2 md:mb-3 font-semibold text-lg md:text-xl lg:text-2xl">
                  O Bitcoin abre caminho para o futuro.
                </p>
                <p className="font-semibold text-base md:text-lg lg:text-xl">
                  Venha ser soberano
                </p>
              </div>

              {/* Arrow Controls (Desktop only) */}
              <div className="hidden lg:flex gap-4">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="flex justify-center items-center bg-black hover:bg-gray-800 rounded-full w-12 md:w-16 h-12 md:h-16 transition-all"
                  aria-label="Previous testimonials"
                >
                  <svg
                    className="w-6 md:w-8 h-6 md:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="flex justify-center items-center bg-black hover:bg-gray-800 rounded-full w-12 md:w-16 h-12 md:h-16 transition-all"
                  aria-label="Next testimonials"
                >
                  <svg
                    className="w-6 md:w-8 h-6 md:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Slider */}
            <div className="relative">
              {/* Mobile Left Arrow */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="lg:hidden top-1/2 left-0 z-20 absolute flex justify-center items-center bg-black hover:bg-gray-800 -ml-6 rounded-full w-12 h-12 transition-all -translate-y-1/2"
                aria-label="Previous testimonials"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Testimonials Slider */}
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={8}
                loop={false}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                breakpoints={{
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                }}
                className="testimonials-swiper"
              >
                {testimonialImages.map((url, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-gray-200 rounded-2xl w-full aspect-square overflow-hidden">
                      <Image
                        src={url}
                        alt={`Testimonial ${index + 1}`}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Mobile Right Arrow */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="lg:hidden top-1/2 right-0 z-20 absolute flex justify-center items-center bg-black hover:bg-gray-800 -mr-6 rounded-full w-12 h-12 transition-all -translate-y-1/2"
                aria-label="Next testimonials"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
