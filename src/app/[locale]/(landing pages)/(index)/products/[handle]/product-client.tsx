"use client";

import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, createCart } from "@/actions/cart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { paymentOperators, installmentConfig } from "@/config/payment.config";
import { useTranslations } from "next-intl";
import { useCartSheet } from "@/contexts/cart-sheet-context";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "./product-swiper.css";

interface ProductClientProps {
  product: any;
}

export function ProductClient({ product }: ProductClientProps) {
  const t = useTranslations("product");
  const { openCart } = useCartSheet();
  const queryClient = useQueryClient();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // Find the selected variant based on selected options
  const selectedVariant = useMemo(() => {
    if (
      Object.keys(selectedOptions).length === 0 &&
      product.variants.edges.length > 0
    ) {
      return product.variants.edges[0].node;
    }

    return (
      product.variants.edges.find(({ node: variant }: any) => {
        return variant.selectedOptions.every(
          (option: any) => selectedOptions[option.name] === option.value
        );
      })?.node || product.variants.edges[0]?.node
    );
  }, [selectedOptions, product.variants.edges]);

  // Format price in BRL
  const formatPriceBRL = (amount: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(amount));
  };

  // Calculate installments
  const installmentInfo = useMemo(() => {
    const price = parseFloat(
      selectedVariant?.priceV2.amount ||
        product.priceRange.minVariantPrice.amount
    );

    // Calculate how many installments we can offer based on minimum installment value
    const maxPossibleInstallments = Math.floor(
      price / installmentConfig.minInstallmentValue
    );

    // Use the lesser of max configured installments or what the price allows
    const installments = Math.min(
      installmentConfig.maxInstallments,
      maxPossibleInstallments
    );

    // Calculate installment value
    const installmentValue = price / installments;

    return {
      installments,
      installmentValue: formatPriceBRL(installmentValue.toString()),
    };
  }, [selectedVariant, product.priceRange.minVariantPrice.amount]);

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      // Get or create cart
      const cartId = localStorage.getItem("shopify_cart_id");

      if (!cartId) {
        const cartResult = await createCart();
        if (cartResult.success) {
          const newCartId = (cartResult.data as any).cartCreate.cart.id;
          localStorage.setItem("shopify_cart_id", newCartId);
          return addToCart(newCartId, selectedVariant.id, quantity);
        }
        throw new Error("Failed to create cart");
      }

      return addToCart(cartId, selectedVariant.id, quantity);
    },
    onSuccess: (data) => {
      if ((data.data as any)?.cartLinesAdd?.cart?.id) {
        const cartId = (data.data as any).cartLinesAdd.cart.id;
        localStorage.setItem("shopify_cart_id", cartId);

        // Invalidate cart query to refresh the cart data
        queryClient.invalidateQueries({ queryKey: ["cart", cartId] });

        // Open cart sheet instead of showing alert
        openCart();
      }
    },
    onError: () => {
      alert(t("error"));
    },
  });

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!selectedVariant.availableForSale) {
      alert(t("outOfStock"));
      return;
    }
    addToCartMutation.mutate();
  };

  return (
    <div className="gap-8 grid grid-cols-1 lg:grid-cols-2 mt-16">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Thumbs, FreeMode]}
            spaceBetween={10}
            navigation={{
              prevEl: ".product-swiper-button-prev",
              nextEl: ".product-swiper-button-next",
            }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            className="rounded-lg overflow-hidden"
          >
            {product.images.edges.map(({ node: image }: any, idx: number) => (
              <SwiperSlide key={idx}>
                <div className="bg-gray-100 aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.altText || `${product.title} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          {product.images.edges.length > 1 && (
            <>
              <button
                className="top-1/2 left-4 z-10 absolute flex justify-center items-center bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10 transition-all -translate-y-1/2 product-swiper-button-prev"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
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
                className="top-1/2 right-4 z-10 absolute flex justify-center items-center bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10 transition-all -translate-y-1/2 product-swiper-button-next"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
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
            </>
          )}
        </div>

        {/* Thumbnail Swiper */}
        {product.images.edges.length > 1 && (
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            className="product-thumbnail-swiper"
          >
            {product.images.edges.map(({ node: image }: any, idx: number) => (
              <SwiperSlide
                key={idx}
                className="!w-20 md:!w-24 !h-20 md:!h-24 cursor-pointer"
              >
                <div className="bg-gray-100 border-2 border-gray-200 hover:border-blue-400 rounded w-full h-full overflow-hidden transition-colors">
                  <img
                    src={image.url}
                    alt={
                      image.altText || `${product.title} thumbnail ${idx + 1}`
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Product Info */}
      <div>
        <h1 className="mb-4 font-bold text-3xl">{product.title}</h1>

        {/* Price */}
        <div className="mb-6">
          {selectedVariant?.compareAtPriceV2 && (
            <p className="text-gray-500 text-lg line-through">
              {formatPriceBRL(selectedVariant.compareAtPriceV2.amount)}
            </p>
          )}
          <p className="font-bold text-accent text-3xl">
            {formatPriceBRL(
              selectedVariant?.priceV2.amount ||
                product.priceRange.minVariantPrice.amount
            )}
          </p>
          {selectedVariant?.compareAtPriceV2 && (
            <p className="mt-1 font-semibold text-accent text-sm">
              {t("pricing.save", {
                amount: formatPriceBRL(
                  (
                    parseFloat(selectedVariant.compareAtPriceV2.amount) -
                    parseFloat(selectedVariant.priceV2.amount)
                  ).toString()
                ),
              })}
            </p>
          )}
        </div>

        {/* Stock Information */}
        <div className="bg-gray-50 mb-6 p-4 rounded-lg">
          {selectedVariant?.availableForSale ? (
            <div className="flex items-center gap-2">
              <div className="bg-green-500 rounded-full w-3 h-3"></div>
              <span className="font-semibold text-green-700">
                {t("inStock")}
                {selectedVariant.quantityAvailable > 0 &&
                  selectedVariant.quantityAvailable < 10 && (
                    <span className="ml-2 text-gray-600 text-sm">
                      (
                      {t("lowStock", {
                        count: selectedVariant.quantityAvailable,
                      })}
                      )
                    </span>
                  )}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="bg-red-500 rounded-full w-3 h-3"></div>
              <span className="font-semibold text-red-700">
                {t("outOfStock")}
              </span>
            </div>
          )}
        </div>

        {/* Product Description */}
        {product.description && (
          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        {/* Product Options */}
        {product.options && product.options.length > 0 && (
          <div className="space-y-4 mb-6">
            {product.options.map((option: any) => (
              <div key={option.id}>
                <label className="block mb-2 font-semibold">
                  {option.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value: string) => (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedOptions[option.name] === value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">{t("quantity")}</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="hover:bg-gray-100 border rounded-lg w-10 h-10 font-semibold"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="border rounded-lg w-20 h-10 text-center"
              min="1"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="hover:bg-gray-100 border rounded-lg w-10 h-10 font-semibold"
            >
              +
            </button>
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={handleAddToCart}
          disabled={
            !selectedVariant?.availableForSale || addToCartMutation.isPending
          }
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors ${
            !selectedVariant?.availableForSale
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : addToCartMutation.isPending
              ? "bg-accent/80 text-white cursor-wait"
              : "bg-accent text-white hover:bg-black"
          }`}
        >
          {addToCartMutation.isPending
            ? t("buyButton.adding")
            : !selectedVariant?.availableForSale
            ? t("buyButton.unavailable")
            : t("buyButton.buy")}
        </button>

        {/* Payment Methods */}
        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="mb-3 font-semibold">{t("paymentMethods.title")}</h3>
          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                {t("paymentMethods.creditCard", {
                  installments: installmentInfo.installments,
                  installmentValue: installmentInfo.installmentValue,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{t("paymentMethods.pix")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{t("paymentMethods.bankSlip")}</span>
            </div>
          </div>

          {/* Payment Operators */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap items-center gap-3">
              {paymentOperators.map((operator) => (
                <div
                  key={operator.name}
                  className="relative grayscale hover:grayscale-0 w-24 aspect-video transition-all"
                >
                  <Image
                    src={operator.logo}
                    alt={operator.alt}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Note */}
        <div className="bg-blue-50 mt-4 p-3 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            🚚 {t("shipping.calculatedAtCheckout")}
          </p>
        </div>

        {/* Additional Info */}
        {product.descriptionHtml && (
          <div className="mt-8 pt-8 border-t">
            <h2 className="mb-4 font-bold text-xl">{t("details")}</h2>
            <div
              className="max-w-none prose prose-sm"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
