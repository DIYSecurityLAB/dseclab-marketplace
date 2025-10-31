"use client";

import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-secondary mx-auto p-16 w-full max-w-7xl text-white">
      <h2 className="w-full font-bold text-3xl text-center">
        Escute de quem sabe
      </h2>
      <div className="gap-8 grid grid-cols-1 xl:grid-cols-3">
        <TestimonialCard
          name="Rafael S."
          role="Investidor cripto"
          testimonial="Desde que comecei a usar o kit do DSECLab, nunca mais fiquei com medo de perder minhas chaves. Autocustódia de verdade — simples, segura e confiável."
        />

        <TestimonialCard
          name="Fernanda M."
          role="Entusiasta em segurança digital"
          testimonial="O DIY Sec Lab me deu autonomia total. Agora sei que meus bitcoins estão nas minhas mãos, não em custodiante algum."
        />

        <TestimonialCard
          name="Lucas T."
          role="Desenvolvedor de Blockchain"
          testimonial="Com a carteira amnésica e o sistema offline, me sinto tranquilo sabendo que meus ativos não dependem de terceiros ou da internet."
        />
      </div>
    </div>
  );
}
