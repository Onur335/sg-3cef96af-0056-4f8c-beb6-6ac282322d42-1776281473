import type { Banner, Character } from "@/types/dokkan";

// 9th Anniversary Banner (2026) - Dual Dokkan Festival
const banner9thAnniversary: Banner = {
  id: "9th-anniversary-2026",
  name: "9th Anniversary Dual Dokkan Festival",
  imageUrl: "/banners/9th-anni.png",
  startDate: "2026-01-30",
  isActive: true,
  featuredCharacters: [
    {
      id: "lr-ssj-goku-vegeta-9th",
      name: "LR SSJ Goku & Vegeta (9th Anniversary)",
      rarity: "LR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1028420/card_1028420_character.png",
      isFeatured: true,
    },
    {
      id: "lr-beast-gohan-9th",
      name: "LR Beast Gohan (9th Anniversary)",
      rarity: "LR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1028430/card_1028430_character.png",
      isFeatured: true,
    },
    {
      id: "lr-cell-max",
      name: "LR Cell Max",
      rarity: "LR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1027850/card_1027850_character.png",
      isFeatured: true,
    },
    {
      id: "lr-ui-goku",
      name: "LR Ultra Instinct Goku",
      rarity: "LR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1024890/card_1024890_character.png",
      isFeatured: true,
    },
    {
      id: "lr-ssbe-vegeta",
      name: "LR SSBE Vegeta",
      rarity: "LR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1024900/card_1024900_character.png",
      isFeatured: true,
    },
    {
      id: "tur-gogeta-blue",
      name: "TUR Gogeta Blue",
      rarity: "UR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1023670/card_1023670_character.png",
      isFeatured: true,
    },
    {
      id: "tur-vegito-blue",
      name: "TUR Vegito Blue",
      rarity: "UR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1023680/card_1023680_character.png",
      isFeatured: true,
    },
    {
      id: "tur-broly-super",
      name: "TUR Super Broly",
      rarity: "UR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1023120/card_1023120_character.png",
      isFeatured: true,
    },
  ],
  unfeaturedCharacters: [
    {
      id: "ssr-ssj-goku-1",
      name: "SSR SSJ Goku",
      rarity: "SSR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1020340/card_1020340_character.png",
    },
    {
      id: "ssr-ssj-vegeta-1",
      name: "SSR SSJ Vegeta",
      rarity: "SSR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1020350/card_1020350_character.png",
    },
    {
      id: "ssr-gohan-ssj2",
      name: "SSR SSJ2 Gohan",
      rarity: "SSR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1019870/card_1019870_character.png",
    },
    {
      id: "ssr-piccolo",
      name: "SSR Piccolo",
      rarity: "SSR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1019230/card_1019230_character.png",
    },
    {
      id: "ssr-krillin",
      name: "SSR Krillin",
      rarity: "SSR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1018940/card_1018940_character.png",
    },
    {
      id: "sr-goku-base",
      name: "SR Goku",
      rarity: "SR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1015340/card_1015340_character.png",
    },
    {
      id: "sr-vegeta-base",
      name: "SR Vegeta",
      rarity: "SR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1015350/card_1015350_character.png",
    },
    {
      id: "sr-gohan-teen",
      name: "SR Teen Gohan",
      rarity: "SR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1014560/card_1014560_character.png",
    },
    {
      id: "sr-trunks",
      name: "SR Trunks",
      rarity: "SR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1014870/card_1014870_character.png",
    },
    {
      id: "sr-goten",
      name: "SR Goten",
      rarity: "SR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1014880/card_1014880_character.png",
    },
  ],
};

// New Year 2026 Banner
const bannerNewYear2026: Banner = {
  id: "new-year-2026",
  name: "New Year 2026 Step-Up Banner",
  imageUrl: "/banners/new-year-2026.png",
  startDate: "2026-01-01",
  endDate: "2026-01-15",
  isActive: true,
  featuredCharacters: [
    {
      id: "lr-gogeta-ssj4",
      name: "LR SSJ4 Gogeta",
      rarity: "LR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1027350/card_1027350_character.png",
      isFeatured: true,
    },
    {
      id: "lr-vegito-ssj4",
      name: "LR SSJ4 Vegito",
      rarity: "LR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1027360/card_1027360_character.png",
      isFeatured: true,
    },
    {
      id: "lr-frieza-final",
      name: "LR Final Form Frieza",
      rarity: "LR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1026780/card_1026780_character.png",
      isFeatured: true,
    },
    {
      id: "tur-goku-ui-sign",
      name: "TUR UI Sign Goku",
      rarity: "UR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1022450/card_1022450_character.png",
      isFeatured: true,
    },
    {
      id: "tur-jiren",
      name: "TUR Jiren",
      rarity: "UR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1022460/card_1022460_character.png",
      isFeatured: true,
    },
  ],
  unfeaturedCharacters: [
    {
      id: "ssr-trunks-future",
      name: "SSR Future Trunks",
      rarity: "SSR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1019560/card_1019560_character.png",
    },
    {
      id: "ssr-zamasu",
      name: "SSR Zamasu",
      rarity: "SSR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1019570/card_1019570_character.png",
    },
    {
      id: "ssr-hit",
      name: "SSR Hit",
      rarity: "SSR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1018650/card_1018650_character.png",
    },
    {
      id: "sr-android-17",
      name: "SR Android 17",
      rarity: "SR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1014320/card_1014320_character.png",
    },
    {
      id: "sr-android-18",
      name: "SR Android 18",
      rarity: "SR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1014330/card_1014330_character.png",
    },
  ],
};

// Golden Week 2025 Banner
const bannerGoldenWeek2025: Banner = {
  id: "golden-week-2025",
  name: "Golden Week 2025 Dokkan Festival",
  imageUrl: "/banners/golden-week-2025.png",
  startDate: "2025-04-29",
  endDate: "2025-05-15",
  isActive: true,
  featuredCharacters: [
    {
      id: "lr-goku-black-rose",
      name: "LR Goku Black Rosé",
      rarity: "LR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1026230/card_1026230_character.png",
      isFeatured: true,
    },
    {
      id: "lr-trunks-mai",
      name: "LR Trunks & Mai",
      rarity: "LR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1026240/card_1026240_character.png",
      isFeatured: true,
    },
    {
      id: "tur-goku-ssb",
      name: "TUR SSB Goku",
      rarity: "UR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1021890/card_1021890_character.png",
      isFeatured: true,
    },
    {
      id: "tur-vegeta-ssb",
      name: "TUR SSB Vegeta",
      rarity: "UR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1021900/card_1021900_character.png",
      isFeatured: true,
    },
  ],
  unfeaturedCharacters: [
    {
      id: "ssr-beerus",
      name: "SSR Beerus",
      rarity: "SSR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1018120/card_1018120_character.png",
    },
    {
      id: "ssr-whis",
      name: "SSR Whis",
      rarity: "SSR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1018130/card_1018130_character.png",
    },
    {
      id: "sr-videl",
      name: "SR Videl",
      rarity: "SR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1013450/card_1013450_character.png",
    },
  ],
};

// Worldwide Celebration 2025 Banner
const bannerWWC2025: Banner = {
  id: "wwc-2025",
  name: "Worldwide Celebration 2025",
  imageUrl: "/banners/wwc-2025.png",
  startDate: "2025-08-28",
  endDate: "2025-09-15",
  isActive: true,
  featuredCharacters: [
    {
      id: "lr-majin-vegeta",
      name: "LR Majin Vegeta",
      rarity: "LR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1025670/card_1025670_character.png",
      isFeatured: true,
    },
    {
      id: "lr-goku-ssj2",
      name: "LR SSJ2 Goku",
      rarity: "LR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1025680/card_1025680_character.png",
      isFeatured: true,
    },
    {
      id: "lr-gohan-beast",
      name: "LR Beast Gohan",
      rarity: "LR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1025120/card_1025120_character.png",
      isFeatured: true,
    },
    {
      id: "tur-gohan-piccolo",
      name: "TUR Gohan & Piccolo",
      rarity: "UR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1021340/card_1021340_character.png",
      isFeatured: true,
    },
  ],
  unfeaturedCharacters: [
    {
      id: "ssr-majin-buu",
      name: "SSR Majin Buu",
      rarity: "SSR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1017890/card_1017890_character.png",
    },
    {
      id: "ssr-cell-perfect",
      name: "SSR Perfect Cell",
      rarity: "SSR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1017230/card_1017230_character.png",
    },
    {
      id: "sr-yamcha",
      name: "SR Yamcha",
      rarity: "SR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1012340/card_1012340_character.png",
    },
  ],
};

// Tanabata 2025 Banner
const bannerTanabata2025: Banner = {
  id: "tanabata-2025",
  name: "Tanabata 2025 Festival",
  imageUrl: "/banners/tanabata-2025.png",
  startDate: "2025-07-07",
  endDate: "2025-07-21",
  isActive: true,
  featuredCharacters: [
    {
      id: "lr-gods-goku-vegeta",
      name: "LR Gods Goku & Vegeta",
      rarity: "LR",
      type: "TEQ",
      imageUrl: "https://dbz.space/asset/global/character/card/1024560/card_1024560_character.png",
      isFeatured: true,
    },
    {
      id: "lr-beast-orange-piccolo",
      name: "LR Beast Gohan & Orange Piccolo",
      rarity: "LR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1024570/card_1024570_character.png",
      isFeatured: true,
    },
    {
      id: "tur-pan-gt",
      name: "TUR GT Pan",
      rarity: "UR",
      type: "INT",
      imageUrl: "https://dbz.space/asset/global/character/card/1020780/card_1020780_character.png",
      isFeatured: true,
    },
  ],
  unfeaturedCharacters: [
    {
      id: "ssr-goku-gt",
      name: "SSR GT Goku",
      rarity: "SSR",
      type: "AGL",
      imageUrl: "https://dbz.space/asset/global/character/card/1016450/card_1016450_character.png",
    },
    {
      id: "ssr-vegeta-gt",
      name: "SSR GT Vegeta",
      rarity: "SSR",
      type: "STR",
      imageUrl: "https://dbz.space/asset/global/character/card/1016460/card_1016460_character.png",
    },
    {
      id: "sr-bulma",
      name: "SR Bulma",
      rarity: "SR",
      type: "PHY",
      imageUrl: "https://dbz.space/asset/global/character/card/1011230/card_1011230_character.png",
    },
  ],
};

export const ALL_BANNERS: Banner[] = [
  banner9thAnniversary,
  bannerNewYear2026,
  bannerGoldenWeek2025,
  bannerWWC2025,
  bannerTanabata2025,
];

export function getBannerById(id: string): Banner | undefined {
  return ALL_BANNERS.find((banner) => banner.id === id);
}

export function getActiveBanners(): Banner[] {
  return ALL_BANNERS.filter((banner) => banner.isActive);
}