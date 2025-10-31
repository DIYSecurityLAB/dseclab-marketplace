"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

interface ITransactionShowcaseTransactionCardProps {
  iconUrl: string;
  translation_key: string;
  index: number;
}

function TransactionShowcaseTransactionCard({
  iconUrl,
  translation_key,
  index,
}: ITransactionShowcaseTransactionCardProps) {
  const t = useTranslations("transactionShowcase.cards");

  return (
    <motion.div
      className="flex flex-col flex-0 justify-center items-center gap-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="font-bold text-xl">{t(translation_key)}</span>
      <motion.div
        className="bg-contain bg-no-repeat bg-center w-full aspect-square"
        style={{
          backgroundImage: `url(${iconUrl})`,
        }}
        whileHover={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}

export default function TransactionShowcase() {
  const t = useTranslations("transactionShowcase");

  return (
    <div className="flex flex-col gap-8 md:gap-16 xl:gap-32 mx-auto xl:mt-12 px-4 max-w-site overflow-hidden">
      <motion.h1
        className="font-semibold text-4xl text-center uppercase md:whitespace-normal"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {t("title.part1")}{" "}
        <span className="text-accent">{t("title.part2")}</span>
      </motion.h1>
      <div className="gap-12 lg:gap-12 grid grid-cols-1 lg:grid-cols-2 w-full">
        <motion.div
          className="w-full font-medium text-3xl lg:text-left text-center leading-relaxed"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("description.part1")}
          <br /> {t("description.part2")}
        </motion.div>
        <div className="gap-6 md:gap-12 lg:gap-16 grid grid-cols-2 grid-rows-2 mx-auto lg:ml-auto w-1/2">
          <TransactionShowcaseTransactionCard
            iconUrl="/i/transaction_icon_blue.png"
            translation_key="blue"
            index={0}
          />
          <TransactionShowcaseTransactionCard
            iconUrl="/i/transaction_icon_sparrow.png"
            translation_key="sparrow"
            index={1}
          />
          <TransactionShowcaseTransactionCard
            iconUrl="/i/transaction_icon_nomad.png"
            translation_key="nomad"
            index={2}
          />
          <TransactionShowcaseTransactionCard
            iconUrl="/i/transaction_icon_specter.png"
            translation_key="spectre"
            index={3}
          />
        </div>
      </div>
    </div>
  );
}
