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

  const getCardClassName = (rarity: string) => {
    switch (rarity) {
      case "LR":
        return "card-glow-lr";
      case "UR":
      case "SSR":
        return "card-glow-ssr";
      default:
        return "card-glow-sr";
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30">
            <p className="text-lg font-semibold">
              <span className="font-display font-bold text-primary">{filteredCharacters.length}</span>
              <span className="text-muted-foreground"> / {characters.length}</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-5xl font-display font-bold">CHARACTER BOX</h2>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Select value={rarityFilter} onValueChange={setRarityFilter}>
            <SelectTrigger className="w-[160px] bg-card/80 backdrop-blur-sm border-primary/30">
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
            <SelectTrigger className="w-[160px] bg-card/80 backdrop-blur-sm border-primary/30">
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
            <SelectTrigger className="w-[160px] bg-card/80 backdrop-blur-sm border-primary/30">
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
          <Card className="p-16 text-center bg-card/80 backdrop-blur-sm">
            <p className="text-xl text-muted-foreground font-semibold">
              {characters.length === 0 ? "No characters yet. Go summon!" : "No characters match your filters."}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCharacters.map((char, idx) => (
              <Card 
                key={idx}
                className={`p-4 ${getCardClassName(char.rarity)} bg-card/90 backdrop-blur-sm transition-all hover:scale-105`}
              >
                <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-muted/50 to-background">
                  <img 
                    src={char.imageUrl} 
                    alt={char.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(char.name)}&size=200&background=random&bold=true`;
                    }}
                  />
                </div>
                <Badge className="w-full justify-center mb-2 font-bold text-xs">{char.rarity}</Badge>
                <Badge variant="outline" className="w-full justify-center mb-2 font-semibold text-xs">{char.type}</Badge>
                <p className="text-xs text-center font-semibold line-clamp-2">{char.name}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}