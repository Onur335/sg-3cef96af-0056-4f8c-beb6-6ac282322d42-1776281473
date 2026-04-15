export type Rarity = "SR" | "SSR" | "UR" | "LR";

export type CharacterType = "AGL" | "TEQ" | "INT" | "STR" | "PHY";

export interface Character {
  id: string;
  name: string;
  rarity: Rarity;
  type: CharacterType;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  startDate: string;
  endDate?: string;
  featuredCharacters: Character[];
  unfeaturedCharacters: Character[];
  isActive: boolean;
}

export interface UserProfile {
  dragonStones: number;
  characterBox: Character[];
  summonHistory: {
    bannerId: string;
    characters: Character[];
    timestamp: number;
  }[];
}

export interface PullResult {
  characters: Character[];
  isMulti: boolean;
  hasGSSR: boolean;
}