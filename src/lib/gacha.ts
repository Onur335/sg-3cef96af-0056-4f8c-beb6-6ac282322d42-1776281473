import type { Character, Banner, PullResult } from "@/types/dokkan";

const RATES = {
  SR: 0.80,
  SSR: 0.15,
  UR: 0.04,
  LR: 0.01,
};

const FEATURED_RATE = 0.005;

const TYPE_COLORS: Record<string, string> = {
  AGL: "3b82f6",
  TEQ: "10b981", 
  INT: "8b5cf6",
  STR: "ef4444",
  PHY: "f97316",
};

function getCharacterImageUrl(character: Character): string {
  const typeColor = TYPE_COLORS[character.type] || "6366f1";
  const rarityGradient = character.rarity === "LR" ? "gradient" : "solid";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(character.name)}&size=400&background=${typeColor}&color=fff&bold=true&font-size=0.35&length=2`;
}

function rollRarity(banner: Banner, isMulti: boolean, pullNumber: number): Character["rarity"] {
  if (isMulti && pullNumber === 10) {
    const rand = Math.random();
    if (rand < 0.05) return "LR";
    if (rand < 0.25) return "UR";
    return "SSR";
  }

  const rand = Math.random();
  if (rand < RATES.LR) return "LR";
  if (rand < RATES.LR + RATES.UR) return "UR";
  if (rand < RATES.LR + RATES.UR + RATES.SSR) return "SSR";
  return "SR";
}

function selectCharacter(banner: Banner, rarity: Character["rarity"]): Character {
  const isFeatured = Math.random() < FEATURED_RATE;
  const pool = isFeatured
    ? banner.featuredCharacters.filter((c) => c.rarity === rarity)
    : banner.unfeaturedCharacters.filter((c) => c.rarity === rarity);

  if (pool.length === 0) {
    const fallbackPool = isFeatured ? banner.featuredCharacters : banner.unfeaturedCharacters;
    const char = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
    return { ...char, imageUrl: getCharacterImageUrl(char) };
  }

  const char = pool[Math.floor(Math.random() * pool.length)];
  return { ...char, imageUrl: getCharacterImageUrl(char) };
}

export function performSinglePull(banner: Banner): Character {
  const rarity = rollRarity(banner, false, 1);
  return selectCharacter(banner, rarity);
}

export function performMultiPull(banner: Banner): PullResult {
  const characters: Character[] = [];

  for (let i = 1; i <= 10; i++) {
    const rarity = rollRarity(banner, true, i);
    characters.push(selectCharacter(banner, rarity));
  }

  return {
    characters,
    isMulti: true,
    hasGSSR: true,
  };
}

export function calculateSummonCost(isMulti: boolean): number {
  return isMulti ? 50 : 5;
}