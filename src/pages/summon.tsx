import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getActiveBanners } from "@/data/banners";
import { getUserProfile, spendDragonStones, addCharactersToBox, recordSummon } from "@/lib/storage";
import { performSinglePull, performMultiPull, calculateSummonCost } from "@/lib/gacha";
import type { Banner, Character } from "@/types/dokkan";

export default function SummonPage() {
  const [activeBanners, setActiveBanners] = useState<Banner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [dragonStones, setDragonStones] = useState(0);
  const [pulledCharacters, setPulledCharacters] = useState<Character[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const banners = getActiveBanners();
    setActiveBanners(banners);
    updateStones();
  }, []);

  const updateStones = () => {
    const profile = getUserProfile();
    setDragonStones(profile.dragonStones);
  };

  const handleSingleSummon = () => {
    if (!selectedBanner) return;
    
    const cost = calculateSummonCost(false);
    if (!spendDragonStones(cost)) {
      alert("Not enough Dragon Stones!");
      return;
    }

    const character = performSinglePull(selectedBanner);
    addCharactersToBox([character]);
    recordSummon(selectedBanner.id, [character]);
    
    setPulledCharacters([character]);
    setShowResults(true);
    updateStones();
  };

  const handleMultiSummon = () => {
    if (!selectedBanner) return;
    
    const cost = calculateSummonCost(true);
    if (!spendDragonStones(cost)) {
      alert("Not enough Dragon Stones!");
      return;
    }

    const result = performMultiPull(selectedBanner);
    addCharactersToBox(result.characters);
    recordSummon(selectedBanner.id, result.characters);
    
    setPulledCharacters(result.characters);
    setShowResults(true);
    updateStones();
  };

  const closeResults = () => {
    setShowResults(false);
    setPulledCharacters([]);
  };

  if (!mounted) {
    return null;
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-display font-bold">SUMMON RESULTS</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {pulledCharacters.map((char, idx) => (
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

            <Button onClick={closeResults} size="lg" className="dokkan-gradient">
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedBanner) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8 space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSelectedBanner(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xl font-display font-bold text-primary">{dragonStones}</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-display font-bold">{selectedBanner.name}</h2>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="text-xl font-display mb-4">Featured Characters</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedBanner.featuredCharacters.slice(0, 8).map((char) => (
                    <div key={char.id} className="space-y-1">
                      <div className="aspect-square relative">
                        <img 
                          src={char.imageUrl} 
                          alt={char.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <Badge className="w-full justify-center text-xs">{char.rarity}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              onClick={handleSingleSummon}
              disabled={dragonStones < 5}
              className="dokkan-gradient min-w-[160px]"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              SINGLE (5)
            </Button>
            <Button 
              size="lg"
              onClick={handleMultiSummon}
              disabled={dragonStones < 50}
              className="dokkan-gradient min-w-[160px]"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              MULTI (50)
            </Button>
          </div>
        </div>
      </div>
    );
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
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xl font-display font-bold text-primary">{dragonStones}</span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-display font-bold mb-2">SUMMON</h2>
          <p className="text-muted-foreground">Select a banner</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {activeBanners.map((banner) => (
            <Card 
              key={banner.id}
              className="cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => setSelectedBanner(banner)}
            >
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-display font-bold">{banner.name}</h3>
                <div className="grid grid-cols-4 gap-2">
                  {banner.featuredCharacters.slice(0, 4).map((char) => (
                    <div key={char.id} className="aspect-square relative">
                      <img 
                        src={char.imageUrl} 
                        alt={char.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
                <Button className="w-full dokkan-gradient">
                  SUMMON
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}