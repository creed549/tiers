import { useState } from "react";
import TierGrid from "../TierGrid";
import ItemBank from "../ItemBank";
import TierCustomization from "../TierCustomization";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categories } from "@/lib/categories";

interface Item {
  id: string;
  imageUrl: string;
}

interface Tier {
  label: string;
  color: string;
  items: Item[];
}

export default function CreateTierList() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tiers, setTiers] = useState<Tier[]>([
    { label: "S", color: "bg-red-500", items: [] },
    { label: "A", color: "bg-orange-500", items: [] },
    { label: "B", color: "bg-yellow-500", items: [] },
    { label: "C", color: "bg-green-500", items: [] },
    { label: "D", color: "bg-blue-500", items: [] },
    { label: "F", color: "bg-purple-500", items: [] },
  ]);

  const handleItemDrop = (tierLabel: string, itemId: string) => {
    setTiers((prevTiers) => {
      // Remove item from its current tier if it exists
      const newTiers = prevTiers.map((tier) => ({
        ...tier,
        items: tier.items.filter((item) => item.id !== itemId),
      }));

      // Add item to new tier
      return newTiers.map((tier) => {
        if (tier.label === tierLabel) {
          return {
            ...tier,
            items: [
              ...tier.items,
              {
                id: itemId,
                imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${itemId}`,
              },
            ],
          };
        }
        return tier;
      });
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="title">Tier List Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your tier list title"
            />
          </div>
          <div className="space-y-2 w-[200px]">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <TierGrid tiers={tiers} onItemDrop={handleItemDrop} />
          </div>
          <div className="space-y-6">
            <TierCustomization
              tiers={tiers.map((t) => ({
                id: t.label,
                label: t.label,
                color: t.color,
              }))}
              onUpdateTier={(id, label, color) => {
                setTiers((prevTiers) =>
                  prevTiers.map((tier) =>
                    tier.label === id ? { ...tier, label, color } : tier,
                  ),
                );
              }}
              onAddTier={() => {
                setTiers((prevTiers) => [
                  ...prevTiers,
                  { label: "New", color: "bg-gray-500", items: [] },
                ]);
              }}
              onRemoveTier={(id) => {
                setTiers((prevTiers) =>
                  prevTiers.filter((tier) => tier.label !== id),
                );
              }}
            />
          </div>
        </div>

        <ItemBank
          onItemDrop={(tierLabel, item) => handleItemDrop(tierLabel, item.id)}
        />

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Tier List</Button>
        </div>
      </div>
    </div>
  );
}
