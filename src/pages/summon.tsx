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

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      AGL: "bg-blue-500",
      TEQ: "bg-green-500",
      INT: "bg-purple-500",
      STR: "bg-red-500",
      PHY: "bg-orange-500",
    };
    return colors[type] || "bg-indigo-500";
  };

  if (!mounted) {
    return null;
  }

  if (showResults) {
    return (
      <div className="min-h-screen">
        <div className="container py-12">
          <div className="text-center space-y-8">
            <h2 className="text-5xl font-display font-bold animate-pulse">SUMMON RESULTS</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {pulledCharacters.map((char, idx) => (
                <Card 
                  key={idx}
                  className={`p-4 ${getCardClassName(char.rarity)} bg-card/90 backdrop-blur-sm transition-all hover:scale-105`}
                >
                  <div className={`aspect-square relative mb-3 rounded-lg overflow-hidden ${getTypeColor(char.type)}`}>
                    <img 
                      src={char.imageUrl} 
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className="w-full justify-center mb-2 font-bold text-xs">{char.rarity}</Badge>
                  <Badge variant="outline" className="w-full justify-center mb-2 font-semibold text-xs">{char.type}</Badge>
                  <p className="text-xs text-center font-semibold line-clamp-2">{char.name}</p>
                </Card>
              ))}
            </div>

            <Button onClick={closeResults} size="lg" className="dokkan-gradient text-lg px-12 py-6 font-bold">
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedBanner) {
    return (
      <div className="min-h-screen">
        <div className="container py-8 space-y-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSelectedBanner(null)} className="hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-2xl font-display font-bold text-primary">{dragonStones}</span>
            </div>
          </div>

          <div className="text-center space-y-6">
            <h2 className="text-4xl font-display font-bold">{selectedBanner.name}</h2>
            
            <div className="max-w-5xl mx-auto">
              <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30">
                <h3 className="text-2xl font-display font-bold mb-6">FEATURED CHARACTERS</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedBanner.featuredCharacters.slice(0, 8).map((char) => (
                    <div key={char.id} className="space-y-2">
                      <div className={`aspect-square relative rounded-lg overflow-hidden ${getTypeColor(char.type)} border-2 border-primary/30`}>
                        <img 
                          src={char.imageUrl} 
                          alt={char.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge className="w-full justify-center text-xs font-bold">{char.rarity}</Badge>
                      <p className="text-xs text-center font-semibold line-clamp-2">{char.name}</p>
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
              className="dokkan-gradient min-w-[180px] text-lg py-6 font-bold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              SINGLE (5)
            </Button>
            <Button 
              size="lg"
              onClick={handleMultiSummon}
              disabled={dragonStones < 50}
              className="dokkan-gradient min-w-[180px] text-lg py-6 font-bold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              MULTI (50)
            </Button>
          </div>
        </div>
      </div>
    );
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
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-2xl font-display font-bold text-primary">{dragonStones}</span>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-5xl font-display font-bold">SUMMON</h2>
          <p className="text-xl text-muted-foreground font-semibold">Select a banner</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {activeBanners.map((banner) => (
            <Card 
              key={banner.id}
              className="cursor-pointer hover:border-primary/60 transition-all bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 hover:scale-105"
              onClick={() => setSelectedBanner(banner)}
            >
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-display font-bold text-center">{banner.name}</h3>
                <div className="grid grid-cols-4 gap-2">
                  {banner.featuredCharacters.slice(0, 4).map((char) => (
                    <div key={char.id} className={`aspect-square relative rounded-md overflow-hidden ${getTypeColor(char.type)} border border-primary/20`}>
                      <img 
                        src={char.imageUrl} 
                        alt={char.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <Button className="w-full dokkan-gradient font-bold">
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