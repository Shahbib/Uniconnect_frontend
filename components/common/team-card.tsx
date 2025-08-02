import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogIn, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type Team = {
  id: number;
  name: string;
  members: number;
  role: string;
  status: string;
  lastActivity: string;
  avatar?: string;
};

export function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 relative">
        {/* Horizontal 3-dots icon in true upper right corner */}
        <div className="absolute top-4 right-4 z-10 flex items-center justify-center">
          <MoreHorizontal className="h-7 w-7 text-slate-400" style={{ transform: "rotate(90deg)" }} />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={team.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {team.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{team.name}</h3>
              <p className="text-sm text-slate-600">
                {team.members} members • {team.role}
              </p>
            </div>
            {/* No badge in top row */}
          </div>
          <div className="flex items-center justify-end">
            <Badge
              variant={team.status === "Active" ? "default" : "secondary"}
              className={team.status === "Active" ? "bg-green-500" : "bg-slate-400"}
            >
              {team.status}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Link href={`/teams/${team.id}/chat`} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                <LogIn className="h-4 w-4 mr-2" />
                Enter Team
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
