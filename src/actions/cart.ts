'use server';

import { storefrontQuery } from '@/lib/shopify/storefront-client';

/**
 * Server Action: Create a new cart
 *
 * Usage with TanStack Query:
 * const mutation = useMutation({
 *   mutationFn: () => createCart()
 * });
 */
export async function createCart() {
  try {
    const query = `
      mutation CreateCart {
        cartCreate {
          cart {
            id
            checkoutUrl
            createdAt
            updatedAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const data = await storefrontQuery(query);
    return { success: true, data };
  } catch (error) {
    console.error('Error creating cart:', error);
    return { success: false, error: 'Failed to create cart' };
  }
}

/**
 * Server Action: Add item to cart
 */
export async function addToCart(cartId: string, merchandiseId: string, quantity: number = 1) {
  try {
    const query = `
      mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      cartId,
      lines: [
        {
          merchandiseId,
          quantity,
        },
      ],
    };

    const data = await storefrontQuery(query, variables);
    return { success: true, data };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add item to cart' };
  }
}

/**
 * Server Action: Update cart line quantity
 */
export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  try {
    const query = `
      mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    };

    const data = await storefrontQuery(query, variables);
    return { success: true, data };
  } catch (error) {
    console.error('Error updating cart:', error);
    return { success: false, error: 'Failed to update cart' };
  }
}

/**
 * Server Action: Remove item from cart
 */
export async function removeFromCart(cartId: string, lineIds: string[]) {
  try {
    const query = `
      mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      cartId,
      lineIds,
    };

    const data = await storefrontQuery(query, variables);
    return { success: true, data };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: 'Failed to remove item from cart' };
  }
}

/**
 * Server Action: Get cart by ID
 */
export async function getCart(cartId: string) {
  try {
    const query = `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    `;

    const data = await storefrontQuery(query, { cartId });
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { success: false, error: 'Failed to fetch cart' };
  }
}
