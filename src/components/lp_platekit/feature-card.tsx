"use client";

import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        {icon}
        <span className="font-bold text-2xl">{title}</span>
        <p className="">{description}</p>
      </div>
      <button className="flex items-center gap-2 font-semibold text-accent cursor-pointer">
        Entenda Melhor
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3666 8.03333L9.89997 13.5L9.16663 12.7667L13.4333 8.5H0.633301V7.5H13.4333L9.16663 3.23333L9.89997 2.5L15.3666 8.03333Z"
            fill="#FE8012"
          />
        </svg>
      </button>
    </div>
  );
}
