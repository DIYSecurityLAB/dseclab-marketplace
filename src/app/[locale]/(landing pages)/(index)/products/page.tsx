import { getProducts } from "@/actions/products";
import { Link } from "@/config/i18n/routing";
import { getTranslations } from "next-intl/server";
import { installmentConfig } from "@/config/payment.config";
import Image from "next/image";

/**
 * Server Component - Products Listing Page
 * Fetches data directly on the server, no client-side JS needed for data fetching
 */
export default async function ProductsPage() {
  const t = await getTranslations("products");
  const result = await getProducts();

  const formatPriceBRL = (amount: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(amount));
  };

  if (!result.success) {
    return (
      <div className="mx-auto px-4 pt-36 lg:pt-46 pb-16 container">
        <h1 className="mb-4 font-bold text-2xl text-white">{t("title")}</h1>
        <p className="text-red-500">{t("errorLoading")}</p>
      </div>
    );
  }

  const products = (result.data as any).products.edges;

  return (
    <div className="mx-auto px-4 pt-36 lg:pt-46 pb-16 container">
      <h1 className="mb-8 font-bold text-3xl text-white">{t("title")}</h1>

      {products.length === 0 ? (
        <p className="text-gray-400">{t("noProducts")}</p>
      ) : (
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(({ node: product }: any) => {
            const image = product.images.edges[0]?.node;
            const variant = product.variants.edges[0]?.node;

            if (!variant) return null;

            const price = parseFloat(variant.price.amount);
            const compareAtPrice = variant.compareAtPrice
              ? parseFloat(variant.compareAtPrice.amount)
              : null;
            const hasDiscount = compareAtPrice && compareAtPrice > price;

            // Calculate installments
            const maxPossibleInstallments = Math.floor(
              price / installmentConfig.minInstallmentValue
            );
            const installmentCount = Math.min(
              installmentConfig.maxInstallments,
              maxPossibleInstallments
            );
            const installmentValue = price / installmentCount;

            return (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-shadow flex flex-col"
              >
                <div className="relative bg-gray-100 aspect-square overflow-hidden">
                  {image && (
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  )}
                </div>

                <div className="p-4 space-y-2 mt-auto">
                  <h2 className="font-bold text-accent text-xl line-clamp-2">
                    {product.title}
                  </h2>

                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center w-full">
                      <span className="font-bold text-gray-900 text-lg">
                        {formatPriceBRL(price.toString())}
                      </span>
                      {hasDiscount && compareAtPrice && (
                        <span
                          className="font-medium text-sm"
                          style={{
                            textDecoration: "line-through",
                            textDecorationColor: "#ff6b35",
                          }}
                        >
                          {formatPriceBRL(compareAtPrice.toString())}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {t("installments", {
                        count: installmentCount,
                        value: formatPriceBRL(installmentValue.toString()),
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Configure caching/revalidation
 * This will cache the page and revalidate every hour
 */
export const revalidate = 3600; // 1 hour
