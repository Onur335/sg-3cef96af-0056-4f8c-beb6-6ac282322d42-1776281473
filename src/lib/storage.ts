import type { UserProfile, Character, Banner } from "@/types/dokkan";

const STORAGE_KEYS = {
  USER_PROFILE: "dokkan_user_profile",
  ACTIVE_BANNERS: "dokkan_active_banners",
};

const DEFAULT_PROFILE: UserProfile = {
  dragonStones: 300,
  characterBox: [],
  summonHistory: [],
};

export function getUserProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!stored) return DEFAULT_PROFILE;
    
    return JSON.parse(stored) as UserProfile;
  } catch (error) {
    console.error("Error loading user profile:", error);
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
}

export function addDragonStones(amount: number): void {
  const profile = getUserProfile();
  profile.dragonStones += amount;
  saveUserProfile(profile);
}

export function spendDragonStones(amount: number): boolean {
  const profile = getUserProfile();
  
  if (profile.dragonStones < amount) {
    return false;
  }
  
  profile.dragonStones -= amount;
  saveUserProfile(profile);
  return true;
}

export function addCharactersToBox(characters: Character[]): void {
  const profile = getUserProfile();
  profile.characterBox.push(...characters);
  saveUserProfile(profile);
}

export function recordSummon(
  bannerId: string,
  characters: Character[]
): void {
  const profile = getUserProfile();
  
  profile.summonHistory.push({
    bannerId,
    characters,
    timestamp: Date.now(),
  });
  
  saveUserProfile(profile);
}

export function getActiveBanners(): string[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_BANNERS);
    if (!stored) return [];
    
    return JSON.parse(stored) as string[];
  } catch (error) {
    console.error("Error loading active banners:", error);
    return [];
  }
}

export function setActiveBanners(bannerIds: string[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_BANNERS, JSON.stringify(bannerIds));
  } catch (error) {
    console.error("Error saving active banners:", error);
  }
}

export function resetUserData(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_BANNERS);
}