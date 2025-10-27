/**
 * Community Configuration
 * Links and settings for community platforms
 */

export interface CommunityLink {
  name: string;
  url: string;
}

export interface CommunityCard {
  type: "dcast" | "discord";
  image?: string;
  link: string;
}

/**
 * Community platform links
 */
export const communityLinks = {
  discord: "#",
  telegram: "#",
  dcast: "#",
  blog: "#",
};

/**
 * Community preview cards
 */
export const communityCards: CommunityCard[] = [
  {
    type: "dcast",
    // image: "/i/community/dcast.jpg",
    link: "#",
  },
  {
    type: "discord",
    // image: "/i/community/discord.jpg",
    link: "#",
  },
];
