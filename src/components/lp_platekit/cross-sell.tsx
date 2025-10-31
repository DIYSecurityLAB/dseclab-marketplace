function Product() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-[url(/products_lp/crosssell_bg_coldkit.png)] bg-cover bg-no-repeat bg-center aspect-361/222" />
        <span className="text-accent uppercase">cold kit</span>
        <h6 className="font-bold text-2xl">
          O Kit para guardar Bitcoin mais seguro do mundo
        </h6>
        <span className="font-semibold text-accent line-through">R$915,00</span>
        <span className="font-bold text-accent text-5xl">R$640,00</span>
      </div>
      <button className="flex items-center gap-2 text-white cursor-pointer">
        Conheça Agora
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3666 8.03333L9.89997 13.5L9.16663 12.7667L13.4333 8.5H0.633301V7.5H13.4333L9.16663 3.23333L9.89997 2.5L15.3666 8.03333Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

export function CrossSell() {
  return (
    <div className="flex flex-col justify-center items-center gap-16 bg-[url(/products_lp/crossell_bg.png)] bg-cover bg-center mx-auto p-16 w-full max-w-7xl text-white">
      <h1 className="font-bold text-3xl">Conheça outras soluções</h1>
      <div className="flex gap-8 w-full">
        <Product />
        <Product />
      </div>
    </div>
  );
}
