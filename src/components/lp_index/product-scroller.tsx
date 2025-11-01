"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { installmentConfig } from "@/config/payment.config";
import { usePriceFormatter } from "@/hooks/use-price-formatter";

import "swiper/css";
import "swiper/css/navigation";

interface ProductVariant {
  id: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
}

export interface ProductCardProps {
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  imageUrl: string;
  imageAlt?: string;
  handle: string;
  backgroundImage?: string;
}

interface ProductScrollerProps {
  products: Product[];
}

export function ProductCard({
  title,
  description,
  price,
  compareAtPrice,
  imageUrl,
  imageAlt,
  handle,
  backgroundImage,
}: ProductCardProps) {
  const { formatPrice } = usePriceFormatter();
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  // Calculate installments - same logic as product page
  const maxPossibleInstallments = Math.floor(
    price / installmentConfig.minInstallmentValue
  );
  const installmentCount = Math.min(
    installmentConfig.maxInstallments,
    maxPossibleInstallments
  );
  const installmentValue = price / installmentCount;

  return (
    <Link
      href={`/products/${handle}`}
      className="group block bg-white shadow-lg mt-8 p-4 rounded-lg bg-cover bg-center"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className="relative mb-4 rounded-lg w-full max-w-site aspect-square">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-black text-accent text-2xl text-center line-clamp-2">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600 text-sm text-center line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center w-full text-center">
            <span className="w-full font-bold text-gray-900 text-xl">
              {formatPrice(price)}
            </span>
            {hasDiscount && compareAtPrice && (
              <span
                className="font-medium text-sm"
                style={{
                  textDecoration: "line-through",
                  textDecorationColor: "#ff6b35",
                }}
              >
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>
          <span className="text-gray-600 text-sm text-center">
            em até {installmentCount}x de{" "}
            <strong>{formatPrice(installmentValue)}</strong>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductScroller({ products }: ProductScrollerProps) {
  const swiperRef = useRef<SwiperType>(null);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto px-4 w-full max-w-site">
      <div className="relative mx-auto py-8">
        <div className="overflow-hidden">
          <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={16}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="product-scroller-swiper"
        >
          {products.map((product) => {
            const image = product.images.edges[0]?.node;
            const variant = product.variants.edges[0]?.node;

            if (!variant || !image) return null;

            const price = parseFloat(variant.price.amount);
            const compareAtPrice = variant.compareAtPrice
              ? parseFloat(variant.compareAtPrice.amount)
              : undefined;

            return (
              <SwiperSlide key={product.id}>
                <ProductCard
                  title={product.title}
                  description={product.description}
                  price={price}
                  compareAtPrice={compareAtPrice}
                  imageUrl={image.url}
                  imageAlt={image.altText}
                  handle={product.handle}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="top-1/2 left-2 lg:-left-12 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-100 border border-gray-200 rounded-full w-10 h-10 text-gray-800 transition-all -translate-y-1/2 duration-200"
          aria-label="Previous products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="top-1/2 right-2 lg:-right-12 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-100 border border-gray-200 rounded-full w-10 h-10 text-gray-800 transition-all -translate-y-1/2 duration-200"
          aria-label="Next products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
