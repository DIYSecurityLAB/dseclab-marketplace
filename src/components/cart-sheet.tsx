"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCart,
  removeFromCart,
  updateCartLine,
  addToCart,
  createCart,
} from "@/actions/cart";
import { getProductsByHandles } from "@/actions/products";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./sheet";
import {
  recommendedProductHandles,
  maxRecommendedProducts,
} from "@/config/cart-recommendations.config";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const t = useTranslations("cart");
  const [cartId, setCartId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const formatPriceBRL = (amount: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(amount));
  };

  // Load cart ID from localStorage and refresh when sheet opens
  useEffect(() => {
    if (open) {
      const storedCartId = localStorage.getItem("shopify_cart_id");
      setCartId(storedCartId);
    }
  }, [open]);

  // Fetch cart data
  const { data, isLoading } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => getCart(cartId!),
    enabled: !!cartId && open,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Update quantity mutation
  const updateMutation = useMutation({
    mutationFn: ({ lineId, quantity }: { lineId: string; quantity: number }) =>
      updateCartLine(cartId!, lineId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });

  // Remove item mutation
  const removeMutation = useMutation({
    mutationFn: (lineIds: string[]) => removeFromCart(cartId!, lineIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });

  // Fetch recommended products
  const { data: recommendedData } = useQuery({
    queryKey: ["recommendedProducts", recommendedProductHandles],
    queryFn: () => getProductsByHandles(recommendedProductHandles),
    enabled: recommendedProductHandles.length > 0 && open,
  });

  // Add recommended product to cart
  const addRecommendedMutation = useMutation({
    mutationFn: async ({ variantId }: { variantId: string }) => {
      const currentCartId = localStorage.getItem("shopify_cart_id");

      if (!currentCartId) {
        const cartResult = await createCart();
        if (cartResult.success) {
          const newCartId = (cartResult.data as any).cartCreate.cart.id;
          localStorage.setItem("shopify_cart_id", newCartId);
          setCartId(newCartId);
          return addToCart(newCartId, variantId, 1);
        }
        throw new Error("Failed to create cart");
      }

      return addToCart(currentCartId, variantId, 1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });

  const cart =
    data?.success && (data.data as any)?.cart ? (data.data as any).cart : null;
  const lines = cart?.lines.edges || [];
  const itemCount = lines.reduce(
    (total: number, { node }: any) => total + node.quantity,
    0
  );

  const handleQuantityChange = (
    lineId: string,
    currentQty: number,
    change: number
  ) => {
    const newQty = currentQty + change;
    if (newQty >= 1 && newQty <= 10) {
      updateMutation.mutate({ lineId, quantity: newQty });
    }
  };

  // Filter recommended products to exclude those already in cart
  const recommendedProducts =
    recommendedData?.success && (recommendedData.data as any)?.products
      ? (recommendedData.data as any).products
          .filter((product: any) => {
            // Check if any variant of this product is in the cart
            const productVariantIds = product.variants.edges.map(
              ({ node }: any) => node.id
            );
            const isInCart = lines.some(({ node }: any) =>
              productVariantIds.includes(node.merchandise.id)
            );
            return !isInCart;
          })
          .slice(0, maxRecommendedProducts)
      : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col p-0 w-full sm:max-w-2xl"
      >
        <div className="flex h-full">
          {/* Left Column - Recommendations */}
          {recommendedProducts.length > 0 && lines.length > 0 && (
            <div className="flex flex-col bg-white border-tertiary border-r w-56">
              <div className="bg-white p-6 border-tertiary border-b">
                <h2 className="font-bold text-accent text-sm text-center uppercase leading-tight">
                  VOCÊ VAI ADORAR!
                  <br />
                  PRODUTOS QUE PODE GOSTAR.
                </h2>
              </div>
              <div className="flex-1 space-y-4 p-4 overflow-y-auto">
                {recommendedProducts.map((product: any) => {
                  const variant = product.variants.edges[0]?.node;
                  const image = product.images.edges[0]?.node;
                  const currentPrice =
                    variant?.priceV2?.amount ||
                    product.priceRange.minVariantPrice.amount;
                  const comparePrice = variant?.compareAtPriceV2?.amount;
                  const price = parseFloat(currentPrice);
                  const installments = Math.min(12, Math.floor(price / 50));
                  const installmentValue = price / installments;

                  return (
                    <div
                      key={product.id}
                      className="bg-white shadow-sm p-4 rounded-lg"
                    >
                      {image && (
                        <div className="relative bg-gray-100 mb-3 rounded w-full aspect-square">
                          <Image
                            src={image.url}
                            alt={image.altText || product.title}
                            fill
                            className="p-2 rounded object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                      <h3 className="mb-2 font-bold text-center">
                        {product.title}
                      </h3>
                      <div className="mb-2 text-center">
                        <div className="font-bold text-accent text-lg">
                          {formatPriceBRL(currentPrice)}
                        </div>
                        {comparePrice && (
                          <div className="text-gray-500 text-sm line-through">
                            {formatPriceBRL(comparePrice)}
                          </div>
                        )}
                      </div>
                      {installments > 1 && (
                        <p className="mb-3 text-gray-600 text-xs text-center">
                          Até {installments}x de{" "}
                          {formatPriceBRL(installmentValue.toString())}
                        </p>
                      )}
                      <button
                        onClick={() => {
                          if (variant?.id) {
                            addRecommendedMutation.mutate({
                              variantId: variant.id,
                            });
                          }
                        }}
                        disabled={addRecommendedMutation.isPending}
                        className="bg-white hover:bg-gray-50 disabled:opacity-50 px-3 py-2 border border-gray-300 rounded w-full font-medium text-sm whitespace-nowrap disabled:cursor-not-allowed"
                      >
                        Adicionar
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Right Column - Cart */}
          <div className="flex flex-col flex-1">
            <SheetHeader className="p-6 border-b tertiary">
              <div className="flex items-center gap-2 text-accent">
                <ShoppingBag className="size-5" />
                <SheetTitle className="text-accent">
                  {itemCount} {itemCount === 1 ? "item" : "itens"}
                </SheetTitle>
              </div>
            </SheetHeader>

            {/* Cart Items */}
            <div className="flex-1 p-6 overflow-y-auto">
              {!cartId || lines.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-center">
                  <ShoppingBag className="mb-4 size-12 text-muted-foreground" />
                  <p className="text-muted-foreground">{t("empty")}</p>
                </div>
              ) : isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">{t("loading")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lines.map(({ node: line }: any) => {
                    const product = line.merchandise.product;
                    const image = product.images.edges[0]?.node;

                    return (
                      <div
                        key={line.id}
                        className="flex gap-4 pb-4 border-b last:border-b-0 tertiary"
                      >
                        {image && (
                          <div className="relative flex-shrink-0 bg-gray-100 rounded w-20 h-20">
                            <Image
                              src={image.url}
                              alt={image.altText || product.title}
                              fill
                              className="rounded object-cover"
                              unoptimized
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {product.title}
                          </h3>
                          {line.merchandise.title !== "Default Title" && (
                            <p className="mt-1 text-muted-foreground text-xs">
                              {line.merchandise.title}
                            </p>
                          )}
                          <p className="mt-2 font-semibold">
                            {formatPriceBRL(line.merchandise.priceV2.amount)}
                          </p>

                          <div className="flex items-center gap-3 mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded tertiary">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    line.id,
                                    line.quantity,
                                    -1
                                  )
                                }
                                disabled={
                                  updateMutation.isPending || line.quantity <= 1
                                }
                                className="hover:bg-gray-100 disabled:opacity-50 px-3 py-1 disabled:cursor-not-allowed"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 border-x min-w-[2rem] text-center tertiary">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    line.id,
                                    line.quantity,
                                    1
                                  )
                                }
                                disabled={
                                  updateMutation.isPending ||
                                  line.quantity >= 10
                                }
                                className="hover:bg-gray-100 disabled:opacity-50 px-3 py-1 disabled:cursor-not-allowed"
                              >
                                +
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeMutation.mutate([line.id])}
                              disabled={removeMutation.isPending}
                              className="disabled:opacity-50 text-muted-foreground hover:text-red-600 text-sm underline"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer with totals and actions */}
            {cart && lines.length > 0 && (
              <SheetFooter className="space-y-4 p-6 border-t tertiary">
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>SUBTOTAL</span>
                    <span>
                      {formatPriceBRL(cart.cost.subtotalAmount.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPriceBRL(cart.cost.totalAmount.amount)}</span>
                  </div>
                </div>

                <a
                  href={cart.checkoutUrl}
                  className="flex justify-center items-center bg-accent hover:bg-accent/90 py-3 rounded-lg w-full font-semibold text-white transition-colors"
                >
                  FINALIZAR COMPRA
                </a>

                <button
                  onClick={() => onOpenChange(false)}
                  className="py-2 w-full text-sm text-center hover:underline"
                >
                  CONTINUAR COMPRANDO
                </button>
              </SheetFooter>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
