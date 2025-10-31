'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, removeFromCart, updateCartLine } from '@/actions/cart';
import { useEffect, useState } from 'react';
import { Link } from '@/config/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

/**
 * Client Component - Cart Page
 * Demonstrates complex client-side interactions with TanStack Query
 */
export default function CartPage() {
  const t = useTranslations('cart');
  const [cartId, setCartId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const formatPriceBRL = (amount: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(amount));
  };

  // Load cart ID from localStorage
  useEffect(() => {
    const storedCartId = localStorage.getItem('shopify_cart_id');
    setCartId(storedCartId);
  }, []);

  // Fetch cart data
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => getCart(cartId!),
    enabled: !!cartId,
  });

  // Update quantity mutation
  const updateMutation = useMutation({
    mutationFn: ({ lineId, quantity }: { lineId: string; quantity: number }) =>
      updateCartLine(cartId!, lineId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });

  // Remove item mutation
  const removeMutation = useMutation({
    mutationFn: (lineIds: string[]) => removeFromCart(cartId!, lineIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });

  if (!cartId) {
    return (
      <div className="container mx-auto px-4 pt-36 lg:pt-46 pb-16">
        <h1 className="text-3xl font-bold mb-8 text-white">{t('title')}</h1>
        <p className="text-gray-400">{t('empty')}</p>
        <Link
          href="/products"
          className="inline-block mt-4 text-accent hover:underline"
        >
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-36 lg:pt-46 pb-16">
        <h1 className="text-3xl font-bold mb-8 text-white">{t('title')}</h1>
        <p className="text-gray-400">{t('loading')}</p>
      </div>
    );
  }

  if (error || !data?.success || !(data.data as any)?.cart) {
    return (
      <div className="container mx-auto px-4 pt-36 lg:pt-46 pb-16">
        <h1 className="text-3xl font-bold mb-8 text-white">{t('title')}</h1>
        <p className="text-red-500">{t('errorLoading')}</p>
      </div>
    );
  }

  const cart = (data.data as any).cart;
  const lines = cart.lines.edges;

  if (lines.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-36 lg:pt-46 pb-16">
        <h1 className="text-3xl font-bold mb-8 text-white">{t('title')}</h1>
        <p className="text-gray-400">{t('empty')}</p>
        <Link
          href="/products"
          className="inline-block mt-4 text-accent hover:underline"
        >
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  const total = cart.cost.totalAmount;

  return (
    <div className="container mx-auto px-4 pt-36 lg:pt-46 pb-16">
      <h1 className="text-3xl font-bold mb-8 text-white">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {lines.map(({ node: line }: any) => {
            const product = line.merchandise.product;
            const image = product.images.edges[0]?.node;

            return (
              <div
                key={line.id}
                className="flex gap-4 bg-white border rounded-lg p-4"
              >
                {image && (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      className="object-cover rounded"
                      unoptimized
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.title}</h3>
                  <p className="text-sm text-gray-600">
                    {line.merchandise.title}
                  </p>
                  <p className="font-semibold text-accent mt-2">
                    {formatPriceBRL(line.merchandise.priceV2.amount)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <select
                    value={line.quantity}
                    onChange={(e) =>
                      updateMutation.mutate({
                        lineId: line.id,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="px-2 py-1 border rounded text-gray-900"
                    disabled={updateMutation.isPending}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeMutation.mutate([line.id])}
                    disabled={removeMutation.isPending}
                    className="text-red-600 hover:underline text-sm"
                  >
                    {t('remove')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">{t('orderSummary')}</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>{t('subtotal')}</span>
                <span>{formatPriceBRL(cart.cost.subtotalAmount.amount)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>{t('total')}</span>
                <span>{formatPriceBRL(total.amount)}</span>
              </div>
            </div>

            <a
              href={cart.checkoutUrl}
              className="block w-full bg-accent text-white text-center py-3 rounded-lg font-semibold hover:bg-black transition-colors"
            >
              {t('checkout')}
            </a>

            <Link
              href="/products"
              className="block text-center mt-4 text-accent hover:underline"
            >
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
