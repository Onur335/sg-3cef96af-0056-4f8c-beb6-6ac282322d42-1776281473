import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Box, Settings } from "lucide-react";
import { getUserProfile } from "@/lib/storage";

export default function HomePage() {
  const [dragonStones, setDragonStones] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const profile = getUserProfile();
    setDragonStones(profile.dragonStones);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container py-12 space-y-12">
        <div className="text-center space-y-6">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-display font-bold dokkan-gradient bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
              DOKKAN BATTLE
            </h1>
            <div className="absolute inset-0 dokkan-gradient blur-3xl opacity-30 -z-10"></div>
          </div>
          <p className="text-2xl text-muted-foreground font-semibold tracking-wide">GACHA SIMULATOR</p>
          
          <Card className="inline-block px-10 py-6 bg-card/80 backdrop-blur-sm border-primary/40 shadow-2xl">
            <div className="flex items-center gap-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <p className="text-sm text-muted-foreground font-semibold tracking-wider">DRAGON STONES</p>
                <p className="text-5xl font-display font-bold text-primary drop-shadow-lg">{dragonStones}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <Link href="/summon">
            <Card className="p-8 hover:border-primary/60 transition-all cursor-pointer group bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20">
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl dokkan-gradient flex items-center justify-center group-hover:energy-glow transition-all group-hover:scale-110">
                  <Sparkles className="w-10 h-10 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">SUMMON</h3>
                  <p className="text-sm text-muted-foreground font-semibold">Pull for characters</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/box">
            <Card className="p-8 hover:border-secondary/60 transition-all cursor-pointer group bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-secondary/20">
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:energy-glow transition-all group-hover:scale-110">
                  <Box className="w-10 h-10 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">CHARACTER BOX</h3>
                  <p className="text-sm text-muted-foreground font-semibold">View collection</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin">
            <Card className="p-8 hover:border-destructive/60 transition-all cursor-pointer group bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-destructive/20">
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-destructive to-red-600 flex items-center justify-center group-hover:shadow-lg transition-all group-hover:scale-110">
                  <Settings className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">ADMIN</h3>
                  <p className="text-sm text-muted-foreground font-semibold">Manage settings</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}