import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Plus, Star, TrendingUp, Users, Filter } from "lucide-react";
import { categories } from "@/lib/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAuth } from "@/lib/auth";

const featuredTierLists = [
  {
    id: "1",
    title: "Anime Characters",
    author: "anime_fan",
    likes: 1234,
    thumbnail: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e",
  },
  {
    id: "2",
    title: "Pokemon Gen 1",
    author: "pokefan",
    likes: 892,
    thumbnail: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3",
  },
  {
    id: "3",
    title: "Marvel Heroes",
    author: "comiclover",
    likes: 567,
    thumbnail: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative py-32 px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Create & Share Amazing
                <br />
                <span className="text-primary">Tier Lists</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Drag, drop, and organize anything into beautiful tier lists.
                Share your rankings with the world and discover what others
                think.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="gap-2 text-base"
                  onClick={() =>
                    navigate(isAuthenticated ? "/create" : "/login")
                  }
                >
                  <Plus className="w-5 h-5" /> Create New Tier List
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base"
                  onClick={() => navigate("/explore")}
                >
                  Explore Lists
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 px-8 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-3 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
              <Users className="w-10 h-10 text-primary" />
              <h3 className="text-3xl font-bold">10,000+</h3>
              <p className="text-muted-foreground text-lg">Active Users</p>
            </Card>
            <Card className="p-8 space-y-3 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
              <Star className="w-10 h-10 text-primary" />
              <h3 className="text-3xl font-bold">50,000+</h3>
              <p className="text-muted-foreground text-lg">
                Tier Lists Created
              </p>
            </Card>
            <Card className="p-8 space-y-3 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
              <TrendingUp className="w-10 h-10 text-primary" />
              <h3 className="text-3xl font-bold">1M+</h3>
              <p className="text-muted-foreground text-lg">Monthly Views</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Featured Lists Section */}
      <div className="py-24 px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Featured Tier Lists</h2>
              <p className="text-muted-foreground">
                Discover popular rankings from our community
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTierLists.map((list) => (
              <Card
                key={list.id}
                className="group overflow-hidden cursor-pointer bg-background/50 hover:bg-background transition-all duration-300 border-primary/10 hover:border-primary/20"
                onClick={() => navigate(`/tier-list/${list.id}`)}
              >
                <div
                  className="h-48 bg-cover bg-center transform transition-transform group-hover:scale-105 duration-300"
                  style={{ backgroundImage: `url(${list.thumbnail})` }}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{list.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${list.author}`}
                      alt={list.author}
                      className="w-5 h-5 rounded-full"
                    />
                    {list.author} • {list.likes.toLocaleString()} likes
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
