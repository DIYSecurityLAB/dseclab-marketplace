import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Verify Shopify webhook signature
 */
function verifyWebhook(body: string, hmacHeader: string | null): boolean {
  if (!hmacHeader) return false;
  if (!process.env.SHOPIFY_WEBHOOK_SECRET) return false;

  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hmacHeader));
}

/**
 * POST /api/webhooks
 * Handle Shopify webhook events
 *
 * To register webhooks, use Shopify Admin or the Admin API:
 * - orders/create
 * - orders/updated
 * - products/create
 * - products/update
 * - inventory_levels/update
 * etc.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const hmac = request.headers.get('x-shopify-hmac-sha256');
    const topic = request.headers.get('x-shopify-topic');
    const shop = request.headers.get('x-shopify-shop-domain');

    // Verify webhook signature
    if (!verifyWebhook(body, hmac)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = JSON.parse(body);

    console.log(`Received webhook: ${topic} from ${shop}`);

    // Handle different webhook topics
    switch (topic) {
      case 'orders/create':
        // Handle new order
        console.log('New order created:', data.id);
        // TODO: Implement order creation logic
        break;

      case 'orders/updated':
        // Handle order update
        console.log('Order updated:', data.id);
        // TODO: Implement order update logic
        break;

      case 'products/create':
        // Handle new product
        console.log('New product created:', data.id);
        // TODO: Implement product creation logic (e.g., cache invalidation)
        break;

      case 'products/update':
        // Handle product update
        console.log('Product updated:', data.id);
        // TODO: Implement product update logic (e.g., cache invalidation)
        break;

      case 'inventory_levels/update':
        // Handle inventory update
        console.log('Inventory updated');
        // TODO: Implement inventory update logic
        break;

      default:
        console.log('Unhandled webhook topic:', topic);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
