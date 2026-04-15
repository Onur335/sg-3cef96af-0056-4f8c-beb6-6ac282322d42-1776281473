import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Sparkles, Plus, Trash2 } from "lucide-react";
import { getUserProfile, addDragonStones, resetUserData, saveUserProfile } from "@/lib/storage";
import { ALL_BANNERS } from "@/data/banners";
import type { Banner } from "@/types/dokkan";

export default function AdminPage() {
  const [dragonStones, setDragonStones] = useState(0);
  const [addAmount, setAddAmount] = useState("100");
  const [banners, setBanners] = useState<Banner[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    updateData();
  }, []);

  const updateData = () => {
    const profile = getUserProfile();
    setDragonStones(profile.dragonStones);
    setBanners(ALL_BANNERS);
  };

  const handleAddStones = () => {
    const amount = parseInt(addAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }
    addDragonStones(amount);
    updateData();
  };

  const handleToggleBanner = (bannerId: string) => {
    const updatedBanners = banners.map(b => 
      b.id === bannerId ? { ...b, isActive: !b.isActive } : b
    );
    setBanners(updatedBanners);
  };

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset ALL data? This cannot be undone!")) {
      resetUserData();
      updateData();
      alert("Data reset successfully!");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
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
          <h2 className="text-4xl font-display font-bold mb-2">ADMIN PANEL</h2>
          <p className="text-destructive text-sm">⚠️ Only for personal use</p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          <Card className="p-6">
            <h3 className="text-2xl font-display font-bold mb-4">Dragon Stones</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="Amount"
                  className="flex-1"
                />
                <Button onClick={handleAddStones} className="dokkan-gradient min-w-[120px]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stones
                </Button>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => { setAddAmount("100"); handleAddStones(); }}
                  className="flex-1"
                >
                  +100
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => { setAddAmount("500"); handleAddStones(); }}
                  className="flex-1"
                >
                  +500
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => { setAddAmount("1000"); handleAddStones(); }}
                  className="flex-1"
                >
                  +1000
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-display font-bold mb-4">Banner Management</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Activate/Deactivate banners to control which ones appear in the summon menu
            </p>
            <div className="space-y-3">
              {banners.map((banner) => (
                <div 
                  key={banner.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex-1">
                    <h4 className="font-display font-bold">{banner.name}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {banner.startDate}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {banner.featuredCharacters.length} Featured
                      </Badge>
                    </div>
                  </div>
                  <Switch
                    checked={banner.isActive}
                    onCheckedChange={() => handleToggleBanner(banner.id)}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-destructive/50">
            <h3 className="text-2xl font-display font-bold mb-4 text-destructive">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Reset all data including Dragon Stones, Character Box, and Summon History
            </p>
            <Button 
              variant="destructive" 
              onClick={handleResetData}
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Reset All Data
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}