export interface INavbarSublink {
  translationKey: string;
  href: string;
}

export interface INavbarLink {
  translationKey: string;
  href?: string;
  sublinks?: INavbarSublink[];
}

export type INavbarLinks = INavbarLink[];

/* Navbar links
  * If anchor is used in href, normal <a> component will be used instead of NextJS Link
  * this should trigger scrollToSection as long the section uses the correct ID
  *
  * Normal links (http/https or relative) will use NextJS Link for pre-fetching static content
  *
  * translationKey: dot notation path to translation key (e.g., 'navbar.links.shop')
  * sublinks: optional array of sublinks for dropdown menus
  */
export const NavbarLinks: INavbarLinks = [
  {
    translationKey: 'navbar.links.shop',
    href: '#',
  },
  {
    translationKey: 'navbar.links.buildKit',
    href: '#',
  },
  {
    translationKey: 'navbar.links.academy',
    href: '#',
  },
  {
    translationKey: 'navbar.links.support.label',
    sublinks: [
      {
        translationKey: 'navbar.links.support.tutorials',
        href: '/support/tutorials',
      },
      {
        translationKey: 'navbar.links.support.contact',
        href: '/support/contact',
      },
      {
        translationKey: 'navbar.links.support.about',
        href: '/support/about',
      },
      {
        translationKey: 'navbar.links.support.sovereignty',
        href: '/support/sovereignty',
      },
    ],
  },
];
