'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart, createCart } from '@/actions/cart';
import { useState, useEffect } from 'react';

interface AddToCartButtonProps {
  variantId: string;
  available: boolean;
  quantity?: number;
}

/**
 * Client Component - Add to Cart Button
 * Demonstrates TanStack Query mutations with Server Actions
 * Manages cart ID in localStorage
 */
export function AddToCartButton({
  variantId,
  available,
  quantity = 1,
}: AddToCartButtonProps) {
  const [cartId, setCartId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Load cart ID from localStorage on mount
  useEffect(() => {
    const storedCartId = localStorage.getItem('shopify_cart_id');
    setCartId(storedCartId);
  }, []);

  // Create cart mutation
  const createCartMutation = useMutation({
    mutationFn: createCart,
    onSuccess: (result) => {
      if (result.success) {
        const newCartId = (result.data as any).cartCreate.cart.id;
        localStorage.setItem('shopify_cart_id', newCartId);
        setCartId(newCartId);
        return newCartId;
      }
    },
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      let currentCartId = cartId;

      // Create cart if it doesn't exist
      if (!currentCartId) {
        const createResult = await createCartMutation.mutateAsync();
        if (createResult.success) {
          currentCartId = (createResult.data as any).cartCreate.cart.id;
        } else {
          throw new Error('Failed to create cart');
        }
      }

      return addToCart(currentCartId!, variantId, quantity);
    },
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate cart queries to trigger refetch
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    },
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  const isLoading = addToCartMutation.isPending || createCartMutation.isPending;
  const isSuccess = addToCartMutation.isSuccess;

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={!available || isLoading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          available
            ? 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {!available
          ? 'Out of Stock'
          : isLoading
            ? 'Adding...'
            : isSuccess
              ? 'Added to Cart!'
              : 'Add to Cart'}
      </button>

      {addToCartMutation.isError && (
        <p className="text-red-500 text-sm mt-2">
          Failed to add to cart. Please try again.
        </p>
      )}

      {isSuccess && (
        <p className="text-green-600 text-sm mt-2">
          Successfully added to cart!
        </p>
      )}
    </div>
  );
}
