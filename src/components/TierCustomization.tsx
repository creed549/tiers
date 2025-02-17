import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ChromeIcon, PlusIcon, Trash2Icon } from "lucide-react";

interface TierCustomizationProps {
  tiers?: Array<{
    id: string;
    label: string;
    color: string;
  }>;
  onUpdateTier?: (id: string, label: string, color: string) => void;
  onAddTier?: () => void;
  onRemoveTier?: (id: string) => void;
}

const TierCustomization = ({
  tiers = [
    { id: "1", label: "S", color: "#ef4444" },
    { id: "2", label: "A", color: "#f97316" },
    { id: "3", label: "B", color: "#eab308" },
    { id: "4", label: "C", color: "#84cc16" },
    { id: "5", label: "D", color: "#06b6d4" },
    { id: "6", label: "F", color: "#8b5cf6" },
  ],
  onUpdateTier = () => {},
  onAddTier = () => {},
  onRemoveTier = () => {},
}: TierCustomizationProps) => {
  return (
    <Card className="w-[300px] h-[400px] p-4 bg-background overflow-y-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Customize Tiers</h3>
          <Button
            variant="outline"
            size="icon"
            onClick={onAddTier}
            className="h-8 w-8"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          {tiers.map((tier) => (
            <div key={tier.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Label>Label</Label>
                  <Input
                    value={tier.label}
                    onChange={(e) =>
                      onUpdateTier(tier.id, e.target.value, tier.color)
                    }
                    className="h-8"
                  />
                </div>
                <div className="flex-1">
                  <Label className="flex items-center gap-1">
                    <ChromeIcon className="h-4 w-4" /> Color
                  </Label>
                  <Input
                    type="color"
                    value={tier.color}
                    onChange={(e) =>
                      onUpdateTier(tier.id, tier.label, e.target.value)
                    }
                    className="h-8"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveTier(tier.id)}
                  className="h-8 w-8 mt-6"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TierCustomization;
