"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  communityLinks,
  communityCards,
  type CommunityCard,
} from "@/config/community.config";

interface CommunitySectionProps {
  cards?: CommunityCard[];
  blogLink?: string;
  discordLink?: string;
  telegramLink?: string;
  dcastLink?: string;
}

export function CommunitySection({
  cards = communityCards,
  blogLink = communityLinks.blog,
  discordLink = communityLinks.discord,
  telegramLink = communityLinks.telegram,
  dcastLink = communityLinks.dcast,
}: CommunitySectionProps) {
  const t = useTranslations("community");

  return (
    <section className="px-8 md:px-12 lg:px-20 xl:px-28 py-12 md:py-16 lg:py-20 text-black">
      <div className="mx-auto max-w-7xl">
        {/* Two Column Layout */}
        <div className="gap-18 lg:gap-12 grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Title and Text Links */}
          <div className="flex flex-col">
            {/* Section Title */}
            <div className="mb-8 md:mb-12">
              <h2 className="mb-4 font-bold text-3xl md:text-4xl lg:text-5xl">
                <span className="text-accent">{t("title.connect")}</span>{" "}
                {t("title.with")}
                <br />
                {t("title.ourCommunity")}
              </h2>
              <div className="bg-black w-full max-w-md h-0.5"></div>
            </div>

            <div className="flex-grow space-y-8">
              {/* Discord */}
              <a
                href={discordLink}
                className="block hover:opacity-80 transition-opacity"
              >
                <h3 className="mb-3 font-bold text-accent text-xl md:text-2xl">
                  {t("discord.title")}
                </h3>
                <p className="text-black text-base md:text-lg">
                  {t("discord.description")}
                </p>
              </a>

              {/* Telegram */}
              <a
                href={telegramLink}
                className="block hover:opacity-80 transition-opacity"
              >
                <h3 className="mb-3 font-bold text-accent text-xl md:text-2xl">
                  {t("telegram.title")}
                </h3>
                <p className="text-black text-base md:text-lg">
                  {t("telegram.description")}
                </p>
              </a>

              {/* D-Cast */}
              <a
                href={dcastLink}
                className="block hover:opacity-80 transition-opacity"
              >
                <h3 className="mb-3 font-bold text-accent text-xl md:text-2xl">
                  {t("dcast.title")}
                </h3>
                <p className="text-black text-base md:text-lg">
                  {t("dcast.description")}
                </p>
              </a>
            </div>

            {/* Blog Button */}
            <a href={blogLink}>
              <button className="bg-white hover:bg-black mt-8 px-8 py-3 border-2 border-black rounded-full w-fit font-semibold text-black hover:text-white text-lg transition-all duration-300">
                {t("blog.button")}{" "}
                <span className="font-bold">{t("blog.buttonBold")}</span>
              </button>
            </a>
          </div>

          {/* Right Column - Preview Cards */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            {cards.map((card, index) => (
              <div key={index} className="flex flex-col">
                {/* Image */}
                <div className="relative bg-black rounded-lg w-full aspect-square overflow-hidden">
                  {card.image && (
                    <Image
                      src={card.image}
                      alt={t(`${card.type}.cardTitle`)}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>

                {/* Content */}
                <div className="py-4">
                  <h3 className="mb-2 font-bold text-accent text-lg">
                    {t(`${card.type}.title`)}
                  </h3>
                  <h4 className="mb-2 font-bold text-black text-xl">
                    {t(`${card.type}.cardTitle`)}
                  </h4>
                  <p className="mb-3 text-black text-base">
                    {t(`${card.type}.cardDescription`)}
                  </p>
                  <a
                    href={card.link}
                    className="inline-flex items-center font-semibold text-black hover:text-accent transition-colors"
                  >
                    {t("seeMore")} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
