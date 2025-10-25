# Shopify + Next.js Architecture Guide

## Overview

This project uses a server-side architecture to keep all Shopify API credentials secure. The client never directly communicates with Shopify APIs.

## Architecture Flow

```
Client Component
    ↓ (TanStack Query)
Server Action
    ↓ (GraphQL)
Shopify API (hidden from client)
```

## Directory Structure

```
src/
├── lib/
│   ├── shopify/
│   │   ├── storefront-client.ts    # Storefront API client
│   │   ├── admin-client.ts         # Admin API client
│   │   └── types.ts                # Common types
│   ├── auth/
│   │   ├── session.ts              # Session config
│   │   └── helpers.ts              # Auth helpers
│   └── providers/
│       └── query-provider.tsx      # TanStack Query provider
├── actions/
│   ├── products.ts                 # Product operations
│   ├── cart.ts                     # Cart operations
│   └── auth.ts                     # Authentication
├── app/
│   └── api/
│       └── webhooks/route.ts       # Webhook handler
└── middleware.ts                   # Route protection
```

## Usage Examples

### 1. Server Components (Direct Data Fetching)

```tsx
// app/products/page.tsx
import { getProducts } from '@/actions/products';

export default async function ProductsPage() {
  const result = await getProducts();

  if (!result.success) {
    return <div>Error loading products</div>;
  }

  return (
    <div>
      {result.data.products.edges.map(({ node }) => (
        <div key={node.id}>{node.title}</div>
      ))}
    </div>
  );
}
```

### 2. Client Components with TanStack Query (Queries)

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/actions/products';

export function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data?.success) return <div>Error</div>;

  return (
    <div>
      {data.data.products.edges.map(({ node }) => (
        <div key={node.id}>{node.title}</div>
      ))}
    </div>
  );
}
```

### 3. Client Components with TanStack Query (Mutations)

```tsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/actions/cart';

export function AddToCartButton({ variantId, cartId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => addToCart(cartId, variantId, 1),
    onSuccess: () => {
      // Invalidate and refetch cart
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

### 4. Authentication

```tsx
'use client';

import { useMutation } from '@tanstack/react-query';
import { loginCustomer } from '@/actions/auth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email, password }) => loginCustomer(email, password),
    onSuccess: (data) => {
      if (data.success) {
        router.push('/account');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate({
      email: formData.get('email'),
      password: formData.get('password'),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Logging in...' : 'Login'}
      </button>
      {mutation.error && <p>Error: {mutation.error}</p>}
    </form>
  );
}
```

### 5. Protected Routes

Add routes to `src/middleware.ts`:

```ts
const protectedRoutes = [
  '/account',
  '/orders',
  '/wishlist',
];
```

### 6. Using Auth in Server Actions

```ts
'use server';

import { requireAuth } from '@/lib/auth/helpers';

export async function getMyOrders() {
  const session = await requireAuth(); // Throws if not authenticated

  // Use session.customerId to fetch orders
  // ...
}
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in your Shopify credentials:
   - Get Storefront API token from Shopify Admin > Settings > Apps and sales channels
   - Get Admin API token from Shopify Admin > Settings > Apps and sales channels
   - Generate SESSION_SECRET: `openssl rand -base64 32`

## Running the Project

```bash
# Install dependencies
npm install

# Run GraphQL codegen (optional, for type generation)
npm run codegen

# Start dev server
npm run dev
```

## GraphQL Type Generation

Generate TypeScript types from Shopify's GraphQL schema:

```bash
# One-time generation
npm run codegen

# Watch mode (auto-regenerate on changes)
npm run codegen:watch
```

Types will be generated in `src/generated/graphql.ts`.

## Webhooks Setup

1. In Shopify Admin, go to Settings > Notifications > Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhooks`
3. Configure webhook secret in `.env`
4. Customize webhook handlers in `src/app/api/webhooks/route.ts`

## Security Notes

- All Shopify API credentials are server-side only
- iron-session encrypts session data in cookies
- Middleware protects authenticated routes
- Webhook signatures are verified before processing
- Never expose Admin API credentials to the client

## Caching Strategy

- Server Components: Use Next.js `revalidate` for ISR
- Client Components: TanStack Query handles caching automatically
- Webhooks: Use for real-time cache invalidation

## Best Practices

1. Always use Server Actions for data mutations
2. Use Server Components for initial page loads
3. Use Client Components + TanStack Query for interactive features
4. Keep cart ID in localStorage or cookies
5. Handle loading and error states properly
6. Use optimistic updates for better UX
