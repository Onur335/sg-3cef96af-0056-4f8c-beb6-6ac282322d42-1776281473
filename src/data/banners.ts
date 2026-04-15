import type { Banner } from "@/types/dokkan";

const BANNER_IMAGE_BASE = "https://images.unsplash.com/photo-";

// Helper function to generate recognizable character images
function getCharImage(charName: string, type: string): string {
  // Use DiceBear Avatars - Anime style with character names
  const seed = encodeURIComponent(charName);
  return `https://api.dicebear.com/7.x/adventurer/png?seed=${seed}&size=400&backgroundColor=transparent`;
}

// 9th Anniversary Dual Dokkan Festival (2026)
const anniversary9thBanner: Banner = {
  id: "9th-anniversary-2026",
  name: "9th Anniversary Dual Dokkan Festival",
  imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
  startDate: "2026-01-25",
  endDate: "2026-02-25",
  isActive: true,
  featuredCharacters: [
    { id: "lr-ssj4-gogeta-9th", name: "LR SSJ4 Gogeta (9th Anni)", rarity: "LR", type: "TEQ", imageUrl: getCharImage("SSJ4 Gogeta Fusion", "TEQ") },
    { id: "lr-ssj4-vegeta-9th", name: "LR SSJ4 Vegeta (9th Anni)", rarity: "LR", type: "STR", imageUrl: getCharImage("SSJ4 Vegeta Red", "STR") },
    { id: "lr-gods-goku-vegeta", name: "LR Gods Goku & Vegeta", rarity: "LR", type: "PHY", imageUrl: getCharImage("Gods Blue Goku Vegeta", "PHY") },
    { id: "lr-ssj4-goku-vegeta", name: "LR SSJ4 Goku & Vegeta", rarity: "LR", type: "INT", imageUrl: getCharImage("SSJ4 Goku Black Hair", "INT") },
    { id: "tur-ssj-goku-gt", name: "TUR SSJ Goku (GT)", rarity: "UR", type: "AGL", imageUrl: getCharImage("SSJ Goku Young GT", "AGL") },
    { id: "tur-ssj-vegeta-gt", name: "TUR SSJ Vegeta (GT)", rarity: "UR", type: "INT", imageUrl: getCharImage("SSJ Vegeta Scouter GT", "INT") },
    { id: "ssr-pan-gt", name: "SSR Pan (GT)", rarity: "SSR", type: "TEQ", imageUrl: getCharImage("Pan Girl GT", "TEQ") },
    { id: "ssr-trunks-gt", name: "SSR Trunks (GT)", rarity: "SSR", type: "STR", imageUrl: getCharImage("Trunks Sword GT", "STR") },
  ],
  unfeaturedCharacters: [
    { id: "ssr-goku-base", name: "SSR Goku (Base)", rarity: "SSR", type: "AGL", imageUrl: getCharImage("Goku Base Orange", "AGL") },
    { id: "ssr-vegeta-base", name: "SSR Vegeta (Base)", rarity: "SSR", type: "STR", imageUrl: getCharImage("Vegeta Base Armor", "STR") },
    { id: "ssr-gohan-teen", name: "SSR Gohan (Teen)", rarity: "SSR", type: "INT", imageUrl: getCharImage("Gohan Teen Purple", "INT") },
    { id: "ssr-piccolo", name: "SSR Piccolo", rarity: "SSR", type: "TEQ", imageUrl: getCharImage("Piccolo Green Namek", "TEQ") },
    { id: "sr-krillin", name: "SR Krillin", rarity: "SR", type: "PHY", imageUrl: getCharImage("Krillin Bald Monk", "PHY") },
    { id: "sr-yamcha", name: "SR Yamcha", rarity: "SR", type: "AGL", imageUrl: getCharImage("Yamcha Fighter Blue", "AGL") },
    { id: "sr-tien", name: "SR Tien", rarity: "SR", type: "STR", imageUrl: getCharImage("Tien Third Eye", "STR") },
  ],
};

// New Year 2026 Step-Up Banner
const newYear2026Banner: Banner = {
  id: "new-year-2026",
  name: "New Year 2026 Step-Up Banner",
  imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
  startDate: "2025-12-30",
  endDate: "2026-01-15",
  isActive: true,
  featuredCharacters: [
    { id: "lr-carnival-goku-vegeta", name: "LR Carnival Goku & Vegeta", rarity: "LR", type: "TEQ", imageUrl: getCharImage("Goku Vegeta Carnival Duo", "TEQ") },
    { id: "lr-carnival-frieza", name: "LR Carnival Golden Frieza", rarity: "LR", type: "AGL", imageUrl: getCharImage("Golden Frieza Tyrant", "AGL") },
    { id: "lr-ui-goku-sign", name: "LR UI Goku (Sign)", rarity: "LR", type: "INT", imageUrl: getCharImage("Goku Ultra Instinct Silver", "INT") },
    { id: "lr-jiren-fp", name: "LR Jiren (Full Power)", rarity: "LR", type: "STR", imageUrl: getCharImage("Jiren Muscular Gray", "STR") },
    { id: "tur-hit", name: "TUR Hit", rarity: "UR", type: "PHY", imageUrl: getCharImage("Hit Purple Assassin", "PHY") },
    { id: "tur-toppo", name: "TUR Toppo", rarity: "UR", type: "TEQ", imageUrl: getCharImage("Toppo Mustache Justice", "TEQ") },
    { id: "ssr-cabba", name: "SSR Cabba", rarity: "SSR", type: "AGL", imageUrl: getCharImage("Cabba Saiyan Young", "AGL") },
    { id: "ssr-caulifla", name: "SSR Caulifla", rarity: "SSR", type: "STR", imageUrl: getCharImage("Caulifla Girl Saiyan", "STR") },
  ],
  unfeaturedCharacters: [
    { id: "ssr-goku-ssj", name: "SSR Goku (SSJ)", rarity: "SSR", type: "PHY", imageUrl: getCharImage("Goku Super Saiyan Blonde", "PHY") },
    { id: "ssr-vegeta-ssj", name: "SSR Vegeta (SSJ)", rarity: "SSR", type: "INT", imageUrl: getCharImage("Vegeta Super Saiyan Blonde", "INT") },
    { id: "ssr-gohan-adult", name: "SSR Gohan (Adult)", rarity: "SSR", type: "TEQ", imageUrl: getCharImage("Gohan Adult Gi", "TEQ") },
    { id: "ssr-trunks-future", name: "SSR Trunks (Future)", rarity: "SSR", type: "AGL", imageUrl: getCharImage("Trunks Future Sword Blue", "AGL") },
    { id: "sr-android-17", name: "SR Android 17", rarity: "SR", type: "STR", imageUrl: getCharImage("Android 17 Scarf", "STR") },
    { id: "sr-android-18", name: "SR Android 18", rarity: "SR", type: "PHY", imageUrl: getCharImage("Android 18 Blonde Girl", "PHY") },
  ],
};

// Worldwide Celebration 2025
const wwc2025Banner: Banner = {
  id: "wwc-2025",
  name: "Golden Week 2025 Dokkan Festival",
  imageUrl: "https://images.unsplash.com/photo-1580477667995-156081016629?w=800&auto=format&fit=crop&q=80",
  startDate: "2025-04-29",
  endDate: "2025-05-31",
  isActive: true,
  featuredCharacters: [
    { id: "lr-beast-gohan", name: "LR Beast Gohan", rarity: "LR", type: "INT", imageUrl: getCharImage("Gohan Beast Silver Hair", "INT") },
    { id: "lr-orange-piccolo", name: "LR Orange Piccolo", rarity: "LR", type: "PHY", imageUrl: getCharImage("Piccolo Orange Giant", "PHY") },
    { id: "lr-cell-max", name: "LR Cell Max", rarity: "LR", type: "TEQ", imageUrl: getCharImage("Cell Max Red Giant", "TEQ") },
    { id: "lr-gamma-1-2", name: "LR Gamma 1 & 2", rarity: "LR", type: "AGL", imageUrl: getCharImage("Gamma Androids Red Blue", "AGL") },
    { id: "tur-gohan-ultimate", name: "TUR Gohan (Ultimate)", rarity: "UR", type: "STR", imageUrl: getCharImage("Gohan Ultimate White Gi", "STR") },
    { id: "tur-piccolo-fused", name: "TUR Piccolo (Fused)", rarity: "UR", type: "TEQ", imageUrl: getCharImage("Piccolo Fused Nail", "TEQ") },
    { id: "ssr-pan-adult", name: "SSR Pan (Adult)", rarity: "SSR", type: "PHY", imageUrl: getCharImage("Pan Adult Mother", "PHY") },
    { id: "ssr-videl", name: "SSR Videl", rarity: "SSR", type: "INT", imageUrl: getCharImage("Videl Pigtails Fighter", "INT") },
  ],
  unfeaturedCharacters: [
    { id: "ssr-cell-perfect", name: "SSR Cell (Perfect)", rarity: "SSR", type: "AGL", imageUrl: getCharImage("Cell Perfect Green", "AGL") },
    { id: "ssr-cell-jr", name: "SSR Cell Jr", rarity: "SSR", type: "TEQ", imageUrl: getCharImage("Cell Jr Small Green", "TEQ") },
    { id: "ssr-gohan-ssj2", name: "SSR Gohan (SSJ2)", rarity: "SSR", type: "STR", imageUrl: getCharImage("Gohan SSJ2 Teen Angry", "STR") },
    { id: "sr-goten", name: "SR Goten", rarity: "SR", type: "INT", imageUrl: getCharImage("Goten Kid Chibi", "INT") },
    { id: "sr-trunks-kid", name: "SR Trunks (Kid)", rarity: "SR", type: "PHY", imageUrl: getCharImage("Trunks Kid Purple Hair", "PHY") },
  ],
};

// Tanabata 2025
const tanabata2025Banner: Banner = {
  id: "tanabata-2025",
  name: "Tanabata 2025 Dokkan Festival",
  imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
  startDate: "2025-07-07",
  endDate: "2025-07-31",
  isActive: true,
  featuredCharacters: [
    { id: "lr-gogeta-blue", name: "LR Gogeta Blue", rarity: "LR", type: "PHY", imageUrl: getCharImage("Gogeta Blue Fusion Orange", "PHY") },
    { id: "lr-vegito-blue-str", name: "LR Vegito Blue", rarity: "LR", type: "STR", imageUrl: getCharImage("Vegito Blue Fusion Earrings", "STR") },
    { id: "lr-ssj4-gogeta", name: "LR SSJ4 Gogeta", rarity: "LR", type: "TEQ", imageUrl: getCharImage("SSJ4 Gogeta Red Fusion", "TEQ") },
    { id: "lr-ssj4-vegito", name: "LR SSJ4 Vegito", rarity: "LR", type: "INT", imageUrl: getCharImage("SSJ4 Vegito Red Earrings", "INT") },
    { id: "tur-goku-ssj-namek", name: "TUR SSJ Goku (Namek)", rarity: "UR", type: "AGL", imageUrl: getCharImage("Goku SSJ Namek Angry", "AGL") },
    { id: "tur-vegeta-majin", name: "TUR Majin Vegeta", rarity: "UR", type: "STR", imageUrl: getCharImage("Vegeta Majin Evil", "STR") },
    { id: "ssr-goku-black", name: "SSR Goku Black", rarity: "SSR", type: "PHY", imageUrl: getCharImage("Goku Black Evil Pink", "PHY") },
    { id: "ssr-zamasu", name: "SSR Zamasu", rarity: "SSR", type: "TEQ", imageUrl: getCharImage("Zamasu Green God", "TEQ") },
  ],
  unfeaturedCharacters: [
    { id: "ssr-bardock", name: "SSR Bardock", rarity: "SSR", type: "STR", imageUrl: getCharImage("Bardock Father Goku", "STR") },
    { id: "ssr-raditz", name: "SSR Raditz", rarity: "SSR", type: "INT", imageUrl: getCharImage("Raditz Long Hair Evil", "INT") },
    { id: "ssr-nappa", name: "SSR Nappa", rarity: "SSR", type: "PHY", imageUrl: getCharImage("Nappa Bald Big", "PHY") },
    { id: "sr-saibaman", name: "SR Saibaman", rarity: "SR", type: "AGL", imageUrl: getCharImage("Saibaman Green Plant", "AGL") },
  ],
};

// Saiyan Day 2025
const saiyanDay2025Banner: Banner = {
  id: "saiyan-day-2025",
  name: "Saiyan Day 2025 Banner",
  imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80",
  startDate: "2025-03-18",
  endDate: "2025-04-18",
  isActive: true,
  featuredCharacters: [
    { id: "lr-ultra-vegito", name: "LR Ultra Vegito", rarity: "LR", type: "AGL", imageUrl: getCharImage("Vegito Ultra God Silver", "AGL") },
    { id: "lr-ultra-gogeta", name: "LR Ultra Gogeta", rarity: "LR", type: "INT", imageUrl: getCharImage("Gogeta Ultra God Silver", "INT") },
    { id: "lr-broly-lr", name: "LR Broly (Full Power)", rarity: "LR", type: "STR", imageUrl: getCharImage("Broly Legendary Green", "STR") },
    { id: "lr-goku-frieza", name: "LR Goku & Frieza", rarity: "LR", type: "TEQ", imageUrl: getCharImage("Goku Frieza Duo Blue", "TEQ") },
    { id: "tur-vegeta-evo", name: "TUR Vegeta (Evolution)", rarity: "UR", type: "AGL", imageUrl: getCharImage("Vegeta Evolution Blue Spiky", "AGL") },
    { id: "tur-goku-ui", name: "TUR Goku (Ultra Instinct)", rarity: "UR", type: "INT", imageUrl: getCharImage("Goku UI White Silver", "INT") },
    { id: "ssr-cabba-ssj", name: "SSR Cabba (SSJ)", rarity: "SSR", type: "PHY", imageUrl: getCharImage("Cabba SSJ Blonde", "PHY") },
    { id: "ssr-kale", name: "SSR Kale", rarity: "SSR", type: "STR", imageUrl: getCharImage("Kale Girl Saiyan Shy", "STR") },
  ],
  unfeaturedCharacters: [
    { id: "ssr-turles", name: "SSR Turles", rarity: "SSR", type: "AGL", imageUrl: getCharImage("Turles Evil Goku", "AGL") },
    { id: "ssr-paragus", name: "SSR Paragus", rarity: "SSR", type: "INT", imageUrl: getCharImage("Paragus Old Father", "INT") },
    { id: "ssr-king-vegeta", name: "SSR King Vegeta", rarity: "SSR", type: "STR", imageUrl: getCharImage("King Vegeta Royal Crown", "STR") },
    { id: "sr-tarble", name: "SR Tarble", rarity: "SR", type: "TEQ", imageUrl: getCharImage("Tarble Brother Vegeta", "TEQ") },
  ],
};

export const ALL_BANNERS: Banner[] = [
  anniversary9thBanner,
  newYear2026Banner,
  wwc2025Banner,
  tanabata2025Banner,
  saiyanDay2025Banner,
];

export function getActiveBanners(): Banner[] {
  return ALL_BANNERS.filter((banner) => banner.isActive);
}