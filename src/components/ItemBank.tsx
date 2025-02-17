import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ItemBankProps {
  items?: Array<{ id: string; imageUrl: string }>;
  onItemDragStart?: (
    e: React.DragEvent,
    item: { id: string; imageUrl: string },
  ) => void;
  onFileUpload?: (files: FileList) => void;
}

const ItemBank = ({
  items = [
    { id: "1", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
    { id: "2", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
    { id: "3", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
    { id: "4", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=4" },
  ],
  onItemDragStart = () => {},
  onFileUpload = () => {},
}: ItemBankProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileUpload(e.target.files);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full h-[200px] bg-background p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Item Bank</h3>
        <div className="flex gap-2">
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
          <Button
            variant="outline"
            onClick={handleUploadClick}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Images
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Presets
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto p-2 bg-secondary/10 rounded-lg">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[80px] h-[80px] rounded-lg overflow-hidden bg-background flex-shrink-0 cursor-move"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", item.id);
              onItemDragStart(e, item);
            }}
          >
            <img
              src={item.imageUrl}
              alt="bank item"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ItemBank;
