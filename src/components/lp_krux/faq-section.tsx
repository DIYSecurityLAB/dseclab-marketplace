"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "motion/react";

const faqItems = [
  {
    question: "O que é a Krux?",
    answer:
      "A Krux é uma carteira fria (cold wallet) de Bitcoin, totalmente air gapped (sem conexão com redes), Bitcoin Only (só armazena bitcoin), open source (código aberto), amnésica (não armazena dados entre sessões) e permite geração de entropia por foto para criar chaves seguras. Ideal para quem valoriza soberania e segurança",
  },
  {
    question: "O que vem no coldkit ?",
    answer:
      "Seu componente central é uma Carteira Hardware de código aberto (Krux), que gera e mantém suas chaves privadas totalmente offline. Para proteger o acesso de recuperação (a seed phrase), o kit inclui um conjunto de placas de metal (aço inoxidável 304) e uma ferramenta de punção automática profissional que permite gravar a seed phrase no metal de forma permanente, criando um backup físico resistente a fogo e água. Além dos componentes de hardware e segurança física, o ColdKit se destaca por oferecer um tutorial básico impresso, acessórios essenciais de proteção e, principalmente, suporte vitalício da equipe e acesso a uma comunidade exclusiva, garantindo que mesmo usuários iniciantes consigam configurar e usar o sistema com total segurança e confiança.",
  },
  {
    question: "Qual diferença do Coldkit e o coldkit X?",
    answer:
      "A diferença principal é que o Coldkit X tem bateria integrada, permitindo usar a carteira sem depender de energia externa, sem precisar ligar na tomada. Além disso, ele oferece taxa vitalícia de 3% no Alfredp2p",
  },
  {
    question: "Qual a diferença entre o coldkit e a jade ? ",
    answer:
      "O coldkit é o kit completo para sua autocustódia para o longo prazo. É um cofre seguro para seus Bitcoins. A jade é uma carteira para uso prático, compatível com rede Liquid, perfeita para swaps e PSBT com maior facilidade",
  },
  {
    question: "O que é o PlateKit ",
    answer:
      "O PlateKit utiliza placas feitas de aço inoxidável 304 com uma espessura robusta de 1,5 mm. O kit é vendido completo com as placas de metal e a ferramenta de punção (peças com letras e números). O usuário marca manualmente as palavras de recuperação na placa, criando uma gravação em baixo relevo que é permanente, trazendo longevidade e segurança para sua chave privada",
  },
];

export function FaqSection() {
  return (
    <div className="flex flex-col items-center gap-11 mx-auto px-16 py-16 w-full max-w-3xl text-white">
      <span className="text-accent uppercase">FAQ</span>
      <h1 className="font-bold text-4xl">Frequently Asked Questions</h1>
      <Accordion.Root
        type="single"
        collapsible
        className="flex flex-col gap-4 w-full"
      >
        {faqItems.map((item, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="flex flex-col gap-2 p-4 border data-[state=closed]:border-tertiary data-[state=open]:border-accent transition-colors"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex justify-between items-center w-full">
                <span className="font-semibold data-[state=open]:text-accent group-data-[state=open]:text-accent">
                  {item.question}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0 transition-transform duration-200"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.956495 11.3334L8.00026 4.28961L15.0439 11.3334L14.2897 12.0876L8.00025 5.79811L1.71074 12.0876L0.956495 11.3334Z"
                    fill="white"
                  />
                </svg>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden" asChild>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="pt-2">{item.answer}</p>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
