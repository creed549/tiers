import React from "react";
import TierRow from "./TierRow";
import { Card } from "./ui/card";

interface TierGridProps {
  tiers?: Array<{
    label: string;
    color: string;
    items: Array<{ id: string; imageUrl: string }>;
  }>;
  onItemDrop?: (tierLabel: string, itemId: string) => void;
}

const TierGrid = ({
  tiers = [
    {
      label: "S",
      color: "bg-red-500",
      items: [
        {
          id: "s1",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=s1",
        },
        {
          id: "s2",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=s2",
        },
      ],
    },
    {
      label: "A",
      color: "bg-orange-500",
      items: [
        {
          id: "a1",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=a1",
        },
      ],
    },
    {
      label: "B",
      color: "bg-yellow-500",
      items: [],
    },
    {
      label: "C",
      color: "bg-green-500",
      items: [],
    },
    {
      label: "D",
      color: "bg-blue-500",
      items: [],
    },
    {
      label: "F",
      color: "bg-purple-500",
      items: [],
    },
  ],
  onItemDrop = () => {},
}: TierGridProps) => {
  const handleDrop = (tierLabel: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    onItemDrop(tierLabel, itemId);
  };

  return (
    <Card className="w-full h-full bg-background p-4 space-y-2 overflow-y-auto">
      {tiers.map((tier) => (
        <TierRow
          key={tier.label}
          label={tier.label}
          color={tier.color}
          items={tier.items}
          onDrop={handleDrop(tier.label)}
        />
      ))}
    </Card>
  );
};

export default TierGrid;
