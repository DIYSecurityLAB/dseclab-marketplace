import { getProductByHandle } from "@/actions/products";
import { ProductClient } from "./product-client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

interface ProductPageProps {
  params: Promise<{
    handle: string;
    locale: string;
  }>;
}

/**
 * Server Component - Product Detail Page
 * Demonstrates dynamic routing with server-side data fetching
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const result = await getProductByHandle(handle);

  if (!result.success || !(result.data as any)?.productByHandle) {
    notFound();
  }

  const product = (result.data as any).productByHandle;
  const t = await getTranslations("product");

  return (
    <div className="mx-auto px-4 pt-36 lg:pt-46 pb-16 container">
      <Link
        href="/products"
        className="inline-block mb-4 text-accent hover:underline"
      >
        ← {t("backToProducts")}
      </Link>

      <ProductClient product={product} />
    </div>
  );
}

export const revalidate = 3600; // 1 hour
