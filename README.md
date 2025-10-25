# Headless Shopify Storefront with Next.js

A fully-featured headless Shopify storefront built with Next.js 16, TanStack Query, and iron-session. All Shopify API interactions are server-side only to keep credentials secure.

## Features

- ✅ Server-side Shopify API integration (Storefront + Admin API)
- ✅ TanStack Query for client-side state management
- ✅ Server Actions for all mutations
- ✅ iron-session for secure authentication
- ✅ Protected routes with middleware
- ✅ Guest + authenticated user support
- ✅ TypeScript with GraphQL type generation
- ✅ Shopify webhook handlers
- ✅ Cart management with localStorage
- ✅ Product catalog with ISR caching

## Architecture

```
Client Component (TanStack Query)
    ↓
Server Action
    ↓
Shopify GraphQL API (Server-side only)
```

All Shopify API credentials remain server-side. The client never directly communicates with Shopify.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your Shopify credentials:

```bash
# Shopify Storefront API
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token

# Shopify Admin API (optional)
SHOPIFY_ADMIN_ACCESS_TOKEN=your-admin-token

# Shopify Webhooks (optional)
SHOPIFY_WEBHOOK_SECRET=your-webhook-secret

# iron-session
SESSION_SECRET=your-random-32-char-secret  # Generate: openssl rand -base64 32
SESSION_COOKIE_NAME=shopify_session

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Getting Shopify Credentials

1. **Storefront API Token:**
   - Go to Shopify Admin > Settings > Apps and sales channels > Develop apps
   - Create a new app or use existing
   - Configure Storefront API access scopes
   - Install app and copy the Storefront Access Token

2. **Admin API Token:**
   - Same location as above
   - Configure Admin API access scopes
   - Copy Admin Access Token

3. **Session Secret:**
   ```bash
   openssl rand -base64 32
   ```

### 3. Generate TypeScript Types (Optional)

Generate types from Shopify's GraphQL schema:

```bash
npm run codegen
```

Or watch mode for development:

```bash
npm run codegen:watch
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── lib/
│   ├── shopify/
│   │   ├── storefront-client.ts   # Storefront API client
│   │   ├── admin-client.ts        # Admin API client
│   │   └── types.ts               # Shared types
│   ├── auth/
│   │   ├── session.ts             # Session configuration
│   │   └── helpers.ts             # Auth helper functions
│   └── providers/
│       └── query-provider.tsx     # TanStack Query provider
├── actions/
│   ├── products.ts                # Product Server Actions
│   ├── cart.ts                    # Cart Server Actions
│   └── auth.ts                    # Auth Server Actions
├── app/
│   ├── products/                  # Product pages
│   ├── cart/                      # Cart page
│   ├── login/                     # Login page
│   ├── account/                   # Account page (protected)
│   └── api/
│       └── webhooks/route.ts      # Webhook handler
├── components/
│   ├── navigation.tsx             # Navigation component
│   └── add-to-cart-button.tsx     # Add to cart component
├── middleware.ts                  # Route protection
└── generated/                     # Auto-generated types
```

## Usage Examples

### Server Components (Direct Data Fetching)

```tsx
// app/products/page.tsx
import { getProducts } from '@/actions/products';

export default async function ProductsPage() {
  const result = await getProducts();
  // Render products...
}
```

### Client Components with TanStack Query

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/actions/products';

export function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });
  // Render products...
}
```

### Mutations with TanStack Query

```tsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/actions/cart';

export function AddToCartButton({ variantId, cartId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => addToCart(cartId, variantId, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return (
    <button onClick={() => mutation.mutate()}>
      Add to Cart
    </button>
  );
}
```

## Protected Routes

Configure protected routes in `src/middleware.ts`:

```typescript
const protectedRoutes = [
  '/account',
  '/orders',
  // Add more...
];
```

## Webhooks

Setup webhooks in Shopify Admin:

1. Go to Settings > Notifications > Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhooks`
3. Configure webhook secret in `.env`
4. Customize handlers in `src/app/api/webhooks/route.ts`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run codegen` - Generate TypeScript types from GraphQL schema
- `npm run codegen:watch` - Watch mode for type generation

## Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation and usage examples.

## Demo Pages

- `/` - Home page with architecture overview
- `/products` - Product listing (Server Component with ISR)
- `/products/[handle]` - Product detail page
- `/cart` - Shopping cart (Client Component with TanStack Query)
- `/login` - Login page
- `/account` - Account page (Protected route)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **State Management:** TanStack Query v5
- **Authentication:** iron-session
- **Styling:** Tailwind CSS
- **GraphQL Client:** @shopify/graphql-client
- **Type Generation:** GraphQL Code Generator
- **Linting:** Biome

## Security

- All Shopify API credentials are server-side only
- iron-session encrypts session data in cookies
- Middleware protects authenticated routes
- Webhook signatures are verified before processing
- Admin API credentials never exposed to client

## Next Steps

1. Configure your `.env` file with real Shopify credentials
2. Customize the middleware protected routes
3. Add more Server Actions for additional Shopify operations
4. Implement product search functionality
5. Add order history page
6. Customize the UI/UX to match your brand
7. Setup webhooks for real-time inventory updates
8. Add analytics and tracking

## License

MIT
