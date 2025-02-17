import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface TierRowProps {
  label?: string;
  color?: string;
  items?: Array<{ id: string; imageUrl: string }>;
  onDrop?: (e: React.DragEvent) => void;
}

const TierRow = ({
  label = "S",
  color = "bg-red-500",
  items = [
    { id: "1", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
    { id: "2", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
  ],
  onDrop = () => {},
}: TierRowProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card className={cn("flex h-[100px] w-full bg-background p-2 gap-2")}>
      <div
        className={cn(
          "flex items-center justify-center w-[100px] h-full rounded-lg",
          color,
        )}
      >
        <span className="text-2xl font-bold text-white">{label}</span>
      </div>

      <div
        className="flex-1 flex gap-2 items-center h-full p-2 bg-secondary/10 rounded-lg"
        onDrop={onDrop}
        onDragOver={handleDragOver}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-background"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", item.id);
            }}
          >
            <img
              src={item.imageUrl}
              alt="tier item"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TierRow;
