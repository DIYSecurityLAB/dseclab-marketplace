import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { QueryProvider } from "@/lib/providers/query-provider";
import { CurrencyProvider } from "@/contexts/currency-context";
import { routing } from "@/config/i18n/routing";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const lexendedDeca = Lexend_Deca({
  variable: "--font-lexended-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIY SecLab",
  description: "--",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${lexendedDeca.variable} ${lexendedDeca.variable} antialiased overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <CurrencyProvider>
              <Navbar />
              {children}
              <Footer />
            </CurrencyProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
