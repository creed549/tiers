import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  role: "user" | "admin";
  tierLists: number;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", email: "admin@example.com", role: "admin", tierLists: 5 },
    { id: "2", email: "user@example.com", role: "user", tierLists: 3 },
  ]);

  return (
    <Card className="w-full h-full p-6 bg-background">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Tier Lists</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.tierLists}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Total Users</h3>
              <p className="text-2xl">{users.length}</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Total Tier Lists</h3>
              <p className="text-2xl">
                {users.reduce((acc, user) => acc + user.tierLists, 0)}
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Active Users</h3>
              <p className="text-2xl">2</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
