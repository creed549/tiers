import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    // In a real app, this would update the user's profile
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-6 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
            />
            <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold mb-2">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Input value={user?.role || "user"} disabled />
          </div>

          <div className="space-y-2">
            <Label>Member Since</Label>
            <Input value="January 2024" disabled />
          </div>

          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
