import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { getUserProfile } from "@/lib/storage";
import type { Character, Rarity, CharacterType } from "@/types/dokkan";

export default function BoxPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const profile = getUserProfile();
    setCharacters(profile.characterBox);
    setFilteredCharacters(profile.characterBox);
  }, []);

  useEffect(() => {
    let filtered = [...characters];

    if (rarityFilter !== "all") {
      filtered = filtered.filter(c => c.rarity === rarityFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(c => c.type === typeFilter);
    }

    if (sortBy === "rarity") {
      const rarityOrder: Record<Rarity, number> = { LR: 4, UR: 3, SSR: 2, SR: 1 };
      filtered.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
    } else if (sortBy === "type") {
      filtered.sort((a, b) => a.type.localeCompare(b.type));
    }

    setFilteredCharacters(filtered);
  }, [characters, rarityFilter, typeFilter, sortBy]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <p className="text-lg">
            <span className="font-display font-bold">{filteredCharacters.length}</span>
            <span className="text-muted-foreground"> / {characters.length}</span>
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-display font-bold">CHARACTER BOX</h2>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Select value={rarityFilter} onValueChange={setRarityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarity</SelectItem>
              <SelectItem value="LR">LR</SelectItem>
              <SelectItem value="UR">UR</SelectItem>
              <SelectItem value="SSR">SSR</SelectItem>
              <SelectItem value="SR">SR</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="AGL">AGL</SelectItem>
              <SelectItem value="TEQ">TEQ</SelectItem>
              <SelectItem value="INT">INT</SelectItem>
              <SelectItem value="STR">STR</SelectItem>
              <SelectItem value="PHY">PHY</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredCharacters.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-lg text-muted-foreground">
              {characters.length === 0 ? "No characters yet. Go summon!" : "No characters match your filters."}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCharacters.map((char, idx) => (
              <Card 
                key={idx}
                className={`p-4 ${
                  char.rarity === "LR" ? "card-glow-lr border-dokkan-blue" : 
                  char.rarity === "UR" || char.rarity === "SSR" ? "card-glow-ssr border-dokkan-gold" : 
                  ""
                }`}
              >
                <div className="aspect-square relative mb-2">
                  <img 
                    src={char.imageUrl} 
                    alt={char.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <Badge className="w-full justify-center mb-1">{char.rarity}</Badge>
                <Badge variant="outline" className="w-full justify-center">{char.type}</Badge>
                <p className="text-xs text-center mt-2 line-clamp-2">{char.name}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}