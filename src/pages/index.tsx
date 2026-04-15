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
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold dokkan-gradient bg-clip-text text-transparent">
            DOKKAN BATTLE
          </h1>
          <p className="text-xl text-muted-foreground">Gacha Simulator</p>
          
          <Card className="inline-block px-8 py-4 bg-card/50 border-primary/30">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Dragon Stones</p>
                <p className="text-3xl font-display font-bold text-primary">{dragonStones}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          <Link href="/summon">
            <Card className="p-6 hover:border-primary/50 transition-all cursor-pointer group">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full dokkan-gradient flex items-center justify-center group-hover:energy-glow transition-all">
                  <Sparkles className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">SUMMON</h3>
                  <p className="text-sm text-muted-foreground">Pull for characters</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/box">
            <Card className="p-6 hover:border-primary/50 transition-all cursor-pointer group">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center group-hover:energy-glow transition-all">
                  <Box className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">CHARACTER BOX</h3>
                  <p className="text-sm text-muted-foreground">View your collection</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin">
            <Card className="p-6 hover:border-destructive/50 transition-all cursor-pointer group">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-destructive flex items-center justify-center group-hover:shadow-lg transition-all">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">ADMIN</h3>
                  <p className="text-sm text-muted-foreground">Manage settings</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}