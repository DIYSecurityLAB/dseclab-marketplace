"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

interface SlideImage {
  base: string; // mobile/tablet (< lg)
  lg: string; // desktop (>= lg)
}

interface FeatureSlideProps {
  slides: (string | SlideImage)[];
  autoPlayDelay?: number;
}

export default function FeatureSlide({
  slides,
  autoPlayDelay = 5000,
}: FeatureSlideProps) {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="mx-auto px-4 lg:px-0 w-full max-w-7xl">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: autoPlayDelay,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full feature-slide-swiper"
      >
        {slides.map((slide, index) => {
          const isResponsive = typeof slide === "object";
          const mobileImage = isResponsive ? slide.base : slide;
          const desktopImage = isResponsive ? slide.lg : slide;

          return (
            <SwiperSlide key={index}>
              <div className="relative w-full aspect-[397/329] lg:aspect-[1487/749]">
                {isResponsive ? (
                  <>
                    <Image
                      src={mobileImage}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="lg:hidden object-cover"
                      priority={index === 0}
                      unoptimized
                    />
                    <Image
                      src={desktopImage}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="hidden lg:block object-cover"
                      priority={index === 0}
                      unoptimized
                    />
                  </>
                ) : (
                  <Image
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    unoptimized
                  />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
