/**
 * Landing page configuration
 * All static content and data for landing page components
 */

export interface Partner {
  username: string;
  avatar: string;
  name: string;
}

export interface FeatureSlide {
  lg: string;
  base: string;
}

export interface InfluencerVideo {
  id: string;
  videoUrl: string;
  thumbnail?: string;
  type: 'youtube' | 'hosted';
}

/**
 * Partners/Influencers data for marquee component
 */
export const partners: Partner[] = [
  { username: 'castacrypto', avatar: '/i/avatars/castacrypto.jpg', name: 'Rafael Castaneda' },
  { username: 'disruptivas', avatar: '/i/avatars/disruptivas.jpg', name: 'Rafaela Romano' },
  { username: 'sobrevivencialismo', avatar: '/i/avatars/sobrevivencialismo.jpg', name: 'Sobrevivencialismo' },
  { username: 'elidiosegundo', avatar: '/i/avatars/elidiosegundo.jpg', name: 'Elídio' },
  { username: 'joaotreinbtc', avatar: '/i/avatars/joaotreinbtc.jpg', name: 'João Trein' },
  { username: 'caueconomy', avatar: '/i/avatars/caueconomy.jpg', name: 'Cauê Oliveira' },
  { username: 'educareal_', avatar: '/i/avatars/educareal_.jpg', name: 'Alan Schramm' },
  { username: 'crip_thu', avatar: '/i/avatars/crip_thu.jpg', name: 'Arthur Ribeiro' },
  { username: 'viniciusbitnoob', avatar: '/i/avatars/viniciusbitnoob.jpg', name: 'Vinicius Bitnoob' },
  { username: 'eduardalobatoo', avatar: '/i/avatars/eduardalobatoo.jpg', name: 'madu' },
];

/**
 * Feature slides for the feature carousel
 */
export const featureSlides: FeatureSlide[] = [
  { lg: '/i/newslider_1.png', base: '/i/newslider_1_mobile.png' },
  { lg: '/i/newslider_2.png', base: '/i/newslider_2_mobile.png' },
  { lg: '/i/newslider_3.png', base: '/i/newslider_3_mobile.png' },
];

/**
 * Influencer video URLs
 */
export const influencerVideos: InfluencerVideo[] = [
  {
    id: '9',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/f3ac2e18f0c7489a8022a42078298591/f3ac2e18f0c7489a8022a42078298591.SD-480p-0.9Mbps-56830280.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/f3ac2e18f0c7489a8022a42078298591.thumbnail.0000000000_small.jpg?v=1757022099',
    type: 'hosted',
  },
  {
    id: '3',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/1ce1491048f644d6b769bf635f9a3ae6/1ce1491048f644d6b769bf635f9a3ae6.HD-1080p-2.5Mbps-56820906.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/1ce1491048f644d6b769bf635f9a3ae6.thumbnail.0000000000_small.jpg?v=1757010364',
    type: 'hosted',
  },
  {
    id: '6',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/325fbfec7f224de2a62a7f5f63c47322/325fbfec7f224de2a62a7f5f63c47322.HD-720p-1.6Mbps-56830615.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/325fbfec7f224de2a62a7f5f63c47322.thumbnail.0000000000_small.jpg?v=1757022534',
    type: 'hosted',
  },
  {
    id: '8',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/6571ef81182d432a92b49919d21e6250/6571ef81182d432a92b49919d21e6250.HD-1080p-2.5Mbps-56830051.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/6571ef81182d432a92b49919d21e6250.thumbnail.0000000000_small.jpg?v=1757021892',
    type: 'hosted',
  },
  {
    id: '4',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/c3a0a8e6ea0c4b788ec73dd72aa1b7d4/c3a0a8e6ea0c4b788ec73dd72aa1b7d4.HD-1080p-2.5Mbps-56820986.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/c3a0a8e6ea0c4b788ec73dd72aa1b7d4.thumbnail.0000000000_small.jpg?v=1757010438',
    type: 'hosted',
  },
  {
    id: '2',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/6aa00e15a1534b06ba16e32360e8ea25/6aa00e15a1534b06ba16e32360e8ea25.HD-720p-1.6Mbps-56820809.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/6aa00e15a1534b06ba16e32360e8ea25.thumbnail.0000000000_small.jpg?v=1757010222',
    type: 'hosted',
  },
  {
    id: '5',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/b5cb27baa7f644ebb28b79f10ee2aabe/b5cb27baa7f644ebb28b79f10ee2aabe.HD-720p-1.6Mbps-56821043.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/b5cb27baa7f644ebb28b79f10ee2aabe.thumbnail.0000000000_small.jpg?v=1757010511',
    type: 'hosted',
  },
  {
    id: '7',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/3cf2e1aeaa904b709ac394fda37b60d5/3cf2e1aeaa904b709ac394fda37b60d5.HD-720p-1.6Mbps-56830459.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/3cf2e1aeaa904b709ac394fda37b60d5.thumbnail.0000000000_small.jpg?v=1757022383',
    type: 'hosted',
  },
  {
    id: '1',
    videoUrl: '//dseclab.io/cdn/shop/videos/c/vp/45bcc0cea3bb4dd0a7e01b5056a31c56/45bcc0cea3bb4dd0a7e01b5056a31c56.HD-1080p-2.5Mbps-56820724.mp4?v=0',
    thumbnail: '//dseclab.io/cdn/shop/files/preview_images/45bcc0cea3bb4dd0a7e01b5056a31c56.thumbnail.0000000000_small.jpg?v=1757010129',
    type: 'hosted',
  },
];

/**
 * Testimonial image URLs from Shopify CDN
 */
export const testimonialImages: string[] = [
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-04-10_a_s_09.54.22_b13068a5.jpg?v=1744294817',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-04-10_a_s_09.54.21_db2169a4.jpg?v=1744294874',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-04-10_a_s_09.54.21_fccf676f.jpg?v=1744294898',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-04-10_a_s_09.54.21_86527fb9.jpg?v=1744294767',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-04-09_a_s_08.40.24_7a78ab6d.jpg?v=1744294934',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-04-09_a_s_08.40.23_e31ccf09.jpg?v=1744294957',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-04-09_a_s_08.40.24_e50b464c.jpg?v=1744294982',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-04-09_a_s_08.40.24_8a48fc8e.jpg?v=1744295014',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-31_a_s_14.49.55_92fe9454.jpg?v=1744142330',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-31_a_s_13.53.29_d4f73b15_058f5cc5-2493-472d-ade8-d59cde3b8aff.jpg?v=1744142471',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-29_a_s_09.42.20_5e8c7e96.jpg?v=1744142548',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-29_a_s_07.11.44_804f2028_07ef5ccc-a1a7-4621-a9cd-dceddc2a6d56.jpg?v=1744142330',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-28_a_s_18.54.54_615a1805.jpg?v=1744142590',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-26_a_s_23.39.03_1a4172c7_f8754733-3102-4c05-aa4f-e824743c21a6.jpg?v=1744142414',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-31_a_s_13.53.29_d4f73b15_4e5a15fa-5663-406b-a347-737684113e04.jpg?v=1744142267',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-29_a_s_07.11.44_804f2028_6e5d7df7-20d7-46fb-aef5-a5d79683a2f8.jpg?v=1744142252',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-26_a_s_23.39.03_1a4172c7_6a974138-7de5-499c-8f0a-e5f23bff061f.jpg?v=1744142240',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-31_a_s_13.53.29_d4f73b15.jpg?v=1744142231',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-29_a_s_07.11.44_804f2028.jpg?v=1744142212',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-26_a_s_23.39.03_1a4172c7.jpg?v=1744142197',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-25_a_s_16.02.06_b04428c9.jpg?v=1742929507',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-25_a_s_16.02.06_53b58714.jpg?v=1742929470',
  'https://cdn.shopify.com/s/files/1/0677/4751/2516/files/Imagem_do_WhatsApp_de_2025-03-25_a_s_16.02.05_e3a17434.jpg?v=1742929585',
];
