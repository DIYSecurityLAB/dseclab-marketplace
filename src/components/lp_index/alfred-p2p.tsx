"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import PartnersMarquee from "./partners-marquee";

interface Partner {
  username: string;
  avatar: string;
  name: string;
}

interface AlfredP2PProps {
  partners: Partner[];
}

export default function AlfredP2P({ partners }: AlfredP2PProps) {
  const t = useTranslations();

  return (
    <section
      className="z-[0] relative pt-[340px] pb-16 md:pb-20 lg:pb-24 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://cdn.shopify.com/s/files/1/0677/4751/2516/files/alfredp2p_bg.png?v=1761208233')",
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="z-10 relative mx-auto px-8 md:px-16 lg:px-20 xl:px-28 container">
        {/* Header */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 md:mb-8 font-bold text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {t("alfredP2P.hero.title.part1")}{" "}
            <span className="text-accent">
              {t("alfredP2P.hero.title.highlight1")}
              <br />
              {t("alfredP2P.hero.title.highlight2")}
            </span>{" "}
            {t("alfredP2P.hero.title.part2")}{" "}
            <span className="text-accent">{t("alfredP2P.hero.title.highlight3")}</span>
          </h2>
          <p className="mb-4 text-white text-base md:text-lg lg:text-xl">
            {t("alfredP2P.hero.description1.part1")}{" "}
            <span className="text-accent">{t("alfredP2P.hero.description1.highlight")}</span>{" "}
            {t("alfredP2P.hero.description1.part2")}
          </p>
          <p className="text-white text-base md:text-lg lg:text-xl">
            {t("alfredP2P.hero.description2.part1")}{" "}
            <span className="text-accent">{t("alfredP2P.hero.description2.highlight")}</span>{" "}
            {t("alfredP2P.hero.description2.part2")}
          </p>
        </motion.div>

        {/* White Container with orange border */}
        <motion.div
          className="bg-white mb-12 md:mb-16 p-8 md:p-10 lg:p-12 border-accent border-l-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Grid: Text + Video Box */}
          <div className="items-start gap-4 md:gap-8 grid grid-cols-1 lg:grid-cols-2 lg:text-left text-center">
            {/* Text */}
            <div className="flex flex-col gap-4">
              <h1 className="font-black text-4xl lg:text-6xl xl:text-7xl uppercase">
                <span className="text-accent">{t("alfredP2P.yourWay.title.highlight")}</span>{" "}
                {t("alfredP2P.yourWay.title.text")}
              </h1>
              <p className="font-semibold text-black md:text-lg text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">
                {t("alfredP2P.yourWay.description1.part1")}{" "}
                <span className="font-extrabold">{t("alfredP2P.yourWay.description1.highlight")}</span>{" "}
                {t("alfredP2P.yourWay.description1.part2")}
              </p>
              <p className="font-semibold text-lg">
                {t("alfredP2P.yourWay.description2")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Partners Counter */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-accent">{t("alfredP2P.partners.count")}</span>{" "}
            <span className="text-white">{t("alfredP2P.partners.label")}</span>
          </h3>
          <PartnersMarquee partners={partners} />
          {/* Buy Bitcoin Button */}
          <Link href="#">
            <div className="group p-1 border-2 border-accent hover:border-white rounded-full font-semibold text-white hover:scale-105 duration-200">
              <div className="bg-accent group-hover:bg-white px-8 lg:px-12 py-3 lg:py-4 rounded-full text-white group-hover:text-black text-4xl lg:text-5xl xl:text-6xl tracking-widest duration-200">
                {t("alfredP2P.button.text")} <strong>{t("alfredP2P.button.highlight")}</strong>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
