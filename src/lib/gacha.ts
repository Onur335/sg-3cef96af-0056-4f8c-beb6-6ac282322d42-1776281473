import type { Character, Banner, PullResult } from "@/types/dokkan";

const RATES = {
  SR: 0.85,
  SSR: 0.10,
  UR: 0.04,
  LR: 0.01,
  FEATURED: 0.005,
};

export function performSinglePull(banner: Banner): Character {
  const allCharacters = [
    ...banner.featuredCharacters,
    ...banner.unfeaturedCharacters,
  ];
  
  const random = Math.random();
  
  // Featured check (0.5%)
  if (random < RATES.FEATURED && banner.featuredCharacters.length > 0) {
    return getRandomCharacter(banner.featuredCharacters);
  }
  
  // Rarity-based pull
  const rarityRoll = Math.random();
  
  if (rarityRoll < RATES.SR) {
    return getRandomCharacterByRarity(allCharacters, "SR");
  } else if (rarityRoll < RATES.SR + RATES.SSR) {
    return getRandomCharacterByRarity(allCharacters, "SSR");
  } else if (rarityRoll < RATES.SR + RATES.SSR + RATES.UR) {
    return getRandomCharacterByRarity(allCharacters, "UR");
  } else {
    return getRandomCharacterByRarity(allCharacters, "LR");
  }
}

export function performMultiPull(banner: Banner): PullResult {
  const characters: Character[] = [];
  
  // First 9 pulls
  for (let i = 0; i < 9; i++) {
    characters.push(performSinglePull(banner));
  }
  
  // 10th pull guaranteed SSR or higher
  const guaranteedSSR = getRandomSSROrHigher(banner);
  characters.push(guaranteedSSR);
  
  return {
    characters,
    isMulti: true,
    hasGSSR: true,
  };
}

function getRandomCharacter(characters: Character[]): Character {
  return characters[Math.floor(Math.random() * characters.length)];
}

function getRandomCharacterByRarity(
  characters: Character[],
  rarity: string
): Character {
  const filtered = characters.filter((c) => c.rarity === rarity);
  
  if (filtered.length === 0) {
    return getRandomCharacter(characters);
  }
  
  return getRandomCharacter(filtered);
}

function getRandomSSROrHigher(banner: Banner): Character {
  const allCharacters = [
    ...banner.featuredCharacters,
    ...banner.unfeaturedCharacters,
  ];
  
  const ssrOrHigher = allCharacters.filter((c) => 
    c.rarity === "SSR" || c.rarity === "UR" || c.rarity === "LR"
  );
  
  return getRandomCharacter(ssrOrHigher);
}

export function calculateSummonCost(isMulti: boolean): number {
  return isMulti ? 50 : 5;
}