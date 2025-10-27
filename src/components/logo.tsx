export interface IDSecLogoProps {
  className?: string;
}

export default function DSecLogo({ className }: IDSecLogoProps) {
  return (
    <div
      className={`aspect-[221/37] ${className} bg-contain bg-no-repeat bg-center`}
      style={{
        backgroundImage: "url('/i/nav_logo.png')",
      }}
    ></div>
  );
}
