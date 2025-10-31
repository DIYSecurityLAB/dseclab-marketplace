"use client";

import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

interface Partner {
  username: string;
  avatar: string;
  name: string;
}

interface PartnersMarqueeProps {
  partners: Partner[];
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex items-center gap-3 mx-2 px-6 py-2 min-w-fit text-white">
      <div className="relative rounded-full w-12 h-12 overflow-hidden shrink-0">
        <Image
          src={partner.avatar}
          alt={partner.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col text-start">
        <span className="font-bold text-sm">{partner.name}</span>
        <span className="text-xs">@{partner.username}</span>
      </div>
    </div>
  );
}

function MarqueeRow({
  partners,
  direction,
}: {
  partners: Partner[];
  direction: "left" | "right";
}) {
  return (
    <div className="py-1">
      <Marquee direction={direction} speed={40} gradient={false} pauseOnHover>
        {partners.map((partner, index) => (
          <PartnerCard key={`${partner.username}-${index}`} partner={partner} />
        ))}
      </Marquee>
    </div>
  );
}

export default function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  const [row1, setRow1] = useState(partners);
  const [row2, setRow2] = useState(partners);
  const [row3, setRow3] = useState(partners);
  const [row4, setRow4] = useState(partners);

  useEffect(() => {
    setRow1(shuffleArray(partners));
    setRow2(shuffleArray(partners));
    setRow3(shuffleArray(partners));
    setRow4(shuffleArray(partners));
  }, [partners]);

  return (
    <div className="relative space-y-2 my-12 lg:my-32 w-full">
      {/* Left gradient overlay */}
      <div className="top-0 left-0 z-10 absolute bg-gradient-to-r from-black to-transparent w-32 h-full pointer-events-none"></div>

      {/* Right gradient overlay */}
      <div className="top-0 right-0 z-10 absolute bg-gradient-to-l from-black to-transparent w-32 h-full pointer-events-none"></div>

      <MarqueeRow partners={row1} direction="left" />
      <MarqueeRow partners={row2} direction="right" />
      <MarqueeRow partners={row3} direction="left" />
      <MarqueeRow partners={row4} direction="right" />
    </div>
  );
}
