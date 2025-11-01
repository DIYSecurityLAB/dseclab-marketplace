"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMultipleToCart, createCart } from "@/actions/cart";
import { getProductByHandle } from "@/actions/products";
import { useCartSheet } from "@/contexts/cart-sheet-context";

export function HeroSection() {
  const [isAddOnsSelected, setIsAddOnsSelected] = useState(false);
  const { openCart } = useCartSheet();
  const queryClient = useQueryClient();

  const { data: jadeProduct } = useQuery({
    queryKey: ["product", "jade"],
    queryFn: async () => {
      const result = await getProductByHandle("jade-wallet");
      return result.success ? (result.data as any).productByHandle : null;
    },
  });

  // Fetch add-on products
  const { data: placa1248 } = useQuery({
    queryKey: ["product", "placa-1248-laser"],
    queryFn: async () => {
      const result = await getProductByHandle("placa-1248-laser");
      return result.success ? (result.data as any).productByHandle : null;
    },
  });

  const { data: puncaoProduct } = useQuery({
    queryKey: ["product", "ferramenta-de-puncao"],
    queryFn: async () => {
      const result = await getProductByHandle("ferramenta-de-puncao");
      return result.success ? (result.data as any).productByHandle : null;
    },
  });

  const jadeVariantId = jadeProduct?.variants?.edges?.[0]?.node?.id;
  const placa1248VariantId = placa1248?.variants?.edges?.[0]?.node?.id;
  const puncaoVariantId = puncaoProduct?.variants?.edges?.[0]?.node?.id;

  // Prefetch/create cart on page load for faster checkout
  useEffect(() => {
    const ensureCart = async () => {
      const existingCartId = localStorage.getItem("shopify_cart_id");
      if (!existingCartId) {
        const cartResult = await createCart();
        if (cartResult.success) {
          const newCartId = (cartResult.data as any).cartCreate.cart.id;
          localStorage.setItem("shopify_cart_id", newCartId);
        }
      }
    };
    ensureCart();
  }, []);

  // Add to cart mutation - optimized for batch operations
  const addToCartMutation = useMutation({
    mutationFn: async (items: { variantId: string; quantity: number }[]) => {
      let currentCartId = localStorage.getItem("shopify_cart_id");

      if (!currentCartId) {
        const cartResult = await createCart();
        if (cartResult.success) {
          currentCartId = (cartResult.data as any).cartCreate.cart.id;
          localStorage.setItem("shopify_cart_id", currentCartId as string);
        } else {
          throw new Error("Failed to create cart");
        }
      }

      // Add all items in a single API call
      const result = await addMultipleToCart(
        currentCartId as string,
        items.map((item) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        }))
      );

      return { cartId: currentCartId, result };
    },
    onSuccess: async ({ cartId }) => {
      await queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
      openCart();
    },
  });

  const handleToggleAddOns = () => {
    setIsAddOnsSelected(!isAddOnsSelected);
  };

  const handleComprar = () => {
    if (!jadeVariantId) return;

    const itemsToAdd = [{ variantId: jadeVariantId, quantity: 1 }];

    // Add add-ons if checkbox is selected
    if (isAddOnsSelected && placa1248VariantId && puncaoVariantId) {
      itemsToAdd.push({ variantId: placa1248VariantId, quantity: 1 });
      itemsToAdd.push({ variantId: puncaoVariantId, quantity: 1 });
    }

    addToCartMutation.mutate(itemsToAdd);
  };

  const handleSaibaMais = () => {
    const featuresSection = document.querySelector('[data-section="features"]');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex xl:flex-row flex-col bg-[url('/products_lp/jade_hero_bg.png')] bg-black bg-cover bg-no-repeat xl:bg-center bg-right mx-auto p-6 sm:p-8 md:p-12 xl:p-20 w-full max-w-352 text-white">
      <div className="relative flex flex-col justify-center gap-4 sm:gap-6 xl:gap-8 px-4 sm:px-6 md:px-10 xl:px-16 w-full">
        <div className="xl:hidden right-0 absolute bg-[url(/products_lp/blackfriday_promo_badge.png)] bg-contain bg-center backdrop-blur-md rounded-full w-20 sm:w-24 aspect-square" />
        <div className="xl:hidden flex justify-between items-start">
          <h6 className="text-accent text-sm sm:text-base uppercase">JADE</h6>
        </div>
        <h6 className="hidden xl:block text-accent text-sm sm:text-base uppercase">
          PLATE KIT
        </h6>
        <h1 className="font-bold text-3xl sm:text-4xl xl:text-5xl leading-tight xl:leading-18">
          O Kit para guardar
          <br />
          Bitcoin mais
          <br />
          seguro do mundo
        </h1>
        <p className="text-sm sm:text-base leading-7">
          Promoção de 30% - de 01/11/2055 até 30/11/2025
          <br /> ou até acabarem os estoques
        </p>

        <div className="flex flex-col">
          <span className="text-accent text-lg sm:text-xl line-through">
            R$997,00
          </span>
          <span className="text-accent text-3xl sm:text-4xl xl:text-5xl">
            R$695,00
          </span>
        </div>

        <button
          onClick={handleToggleAddOns}
          className="flex items-center gap-4 hover:opacity-80 text-left transition-opacity cursor-pointer"
        >
          <div
            className={`border border-accent rounded-xs w-6 h-6 flex items-center justify-center transition-colors flex-shrink-0 ${
              isAddOnsSelected ? "bg-accent" : ""
            }`}
          >
            {isAddOnsSelected && (
              <svg
                className="w-4 h-4 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span className="font-semibold">
            Adicionar Placa 1248 + Punção Automático
          </span>
        </button>

        <div className="flex sm:flex-row flex-col gap-3 sm:gap-4">
          <button
            onClick={handleComprar}
            disabled={!jadeVariantId || addToCartMutation.isPending}
            className="bg-accent disabled:opacity-50 px-4 py-2 font-medium text-black text-sm sm:text-base cursor-pointer"
          >
            {addToCartMutation.isPending ? "Adicionando..." : "Comprar"}
          </button>
          <button
            onClick={handleSaibaMais}
            className="flex justify-center sm:justify-start items-center gap-2 px-4 py-2 font-medium text-accent text-sm sm:text-base"
          >
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
        </div>
      </div>
      <div className="hidden xl:block relative mt-8 xl:mt-0 w-full xl:w-1/2 min-h-48 sm:min-h-64 xl:min-h-0">
        <div className="top-1/2 right-4 sm:right-8 xl:right-0 absolute bg-[url(/products_lp/blackfriday_promo_badge.png)] bg-contain bg-center backdrop-blur-md rounded-full w-24 sm:w-32 xl:w-52 aspect-square overflow-hidden -translate-y-1/2"></div>
        <div className="hidden xl:block right-0 bottom-0 absolute">
          <div className="bg-[url(/i/noconnicons.png)] bg-contain bg-center w-[127px] aspect-127/32" />
        </div>
      </div>
    </div>
  );
}
