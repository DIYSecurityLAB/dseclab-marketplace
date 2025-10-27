"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import DSecLogo from "./logo";
import { NavbarLinks, type INavbarLink } from "@/config/navbar.config";
import { Link } from "@/config/i18n/routing";
import { LanguageSelector } from "./language-selector";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export interface INavbarSectionProps {
  children?: ReactNode;
  className?: string;
}

export function NavbarSection({ children, className }: INavbarSectionProps) {
  return <div className={`flex items-center ${className}`}>{children}</div>;
}

function DesktopNavLink({ link }: { link: INavbarLink }) {
  const t = useTranslations();

  // Link with sublinks - show dropdown on hover
  if (link.sublinks && link.sublinks.length > 0) {
    return (
      <NavigationMenu.Item className="relative">
        <NavigationMenu.Trigger className="group flex items-center gap-1 font-bold hover:text-accent duration-200 cursor-pointer">
          {t(link.translationKey)}
          <svg
            className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className="absolute left-1/2 -translate-x-1/2 bg-black shadow-lg mt-2 border border-white/20 rounded-md w-56 overflow-hidden data-[motion=from-end]:animate-in data-[motion=from-start]:animate-in data-[motion=to-end]:animate-out data-[motion=to-start]:animate-out">
          <ul className="p-2">
            {link.sublinks.map((sublink, idx) => {
              const isAnchor = sublink.href.startsWith("#");
              return (
                <li key={idx}>
                  <NavigationMenu.Link asChild>
                    {isAnchor ? (
                      <a
                        href={sublink.href}
                        className="block hover:bg-white/10 px-4 py-2 rounded font-medium whitespace-nowrap transition-colors"
                      >
                        {t(sublink.translationKey)}
                      </a>
                    ) : (
                      <Link
                        href={sublink.href}
                        className="block hover:bg-white/10 px-4 py-2 rounded font-medium whitespace-nowrap transition-colors"
                      >
                        {t(sublink.translationKey)}
                      </Link>
                    )}
                  </NavigationMenu.Link>
                </li>
              );
            })}
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    );
  }

  // Regular link without sublinks
  if (!link.href) {
    return null;
  }

  const isAnchor = link.href.startsWith("#");

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        {isAnchor ? (
          <a
            href={link.href}
            className="font-bold hover:text-accent duration-200"
          >
            {t(link.translationKey)}
          </a>
        ) : (
          <Link
            href={link.href}
            className="font-bold hover:text-accent duration-200"
          >
            {t(link.translationKey)}
          </Link>
        )}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

function MobileNavLink({ link }: { link: INavbarLink }) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  // Link with sublinks - collapsible
  if (link.sublinks && link.sublinks.length > 0) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center py-2 w-full font-bold text-white hover:text-accent duration-200"
        >
          <span>{t(link.translationKey)}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="space-y-1 mb-2 pl-4">
            {link.sublinks.map((sublink, idx) => {
              const isAnchor = sublink.href.startsWith("#");
              return isAnchor ? (
                <a
                  key={idx}
                  href={sublink.href}
                  className="block py-2 text-white/80 hover:text-accent text-sm duration-200"
                >
                  {t(sublink.translationKey)}
                </a>
              ) : (
                <Link
                  key={idx}
                  href={sublink.href}
                  className="block py-2 text-white/80 hover:text-accent text-sm duration-200"
                >
                  {t(sublink.translationKey)}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Regular link without sublinks
  if (!link.href) {
    return null;
  }

  const isAnchor = link.href.startsWith("#");

  return isAnchor ? (
    <a
      href={link.href}
      className="block py-2 font-bold text-white hover:text-accent duration-200"
    >
      {t(link.translationKey)}
    </a>
  ) : (
    <Link
      href={link.href}
      className="block py-2 font-bold text-white hover:text-accent duration-200"
    >
      {t(link.translationKey)}
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex justify-center items-center bg-black w-full text-white transition-all duration-300 ${
        isScrolled ? "py-2 md:py-4 lg:py-8" : "py-4 md:py-8 lg:py-16"
      }`}
    >
      <div className="flex justify-between px-8 md:px-12 lg:px-20 w-full max-w-site h-full">
        {/* Left Side */}
        <NavbarSection className="flex-1">
          <DSecLogo className="h-6 sm:h-7 md:h-8 xl:h-9" />
        </NavbarSection>

        {/* Center - Hidden on mobile */}
        <NavbarSection className="hidden md:flex flex-1 justify-between">
          <NavigationMenu.Root className="relative">
            <NavigationMenu.List className="flex justify-between items-center gap-6 w-full">
              {NavbarLinks.map((link, i) => (
                <DesktopNavLink key={i} link={link} />
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </NavbarSection>

        {/* Right */}
        <NavbarSection className="justify-end gap-4">
          <LanguageSelector />

          {/* Mobile Hamburger Menu */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="group md:hidden flex flex-col justify-center items-center gap-1.5 w-6 h-6">
              <span className="block bg-white w-6 h-0.5 group-data-[state=open]:rotate-45 transition-all group-data-[state=open]:translate-y-2 duration-300" />
              <span className="block bg-white group-data-[state=open]:opacity-0 w-6 h-0.5 transition-all duration-300" />
              <span className="block bg-white w-6 h-0.5 group-data-[state=open]:-rotate-45 transition-all group-data-[state=open]:-translate-y-2 duration-300" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="md:hidden z-99 bg-black p-6 border-gray-800 border-t w-screen"
                align="end"
                sideOffset={8}
              >
                {NavbarLinks.map((link, i) => (
                  <DropdownMenu.Item
                    key={i}
                    asChild
                    onSelect={(e) => e.preventDefault()}
                  >
                    <div>
                      <MobileNavLink link={link} />
                    </div>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </NavbarSection>
      </div>
    </nav>
  );
}
