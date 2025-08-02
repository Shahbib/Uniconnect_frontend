import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"
import type { LeaderboardUser } from "@/types/learning"
import { CommonUtils } from "@/utils/common"

interface LeaderboardProps {
  users: LeaderboardUser[]
}

export function Leaderboard({ users }: LeaderboardProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-slate-500"
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {users.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              user.isCurrentUser ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50"
            }`}
          >
            <div className={`font-bold text-lg ${getRankColor(user.rank)}`}>#{user.rank}</div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{CommonUtils.generateInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className={`text-sm font-medium ${user.isCurrentUser ? "text-blue-900" : "text-slate-900"}`}>
                {user.name}
                {user.isCurrentUser && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    You
                  </Badge>
                )}
              </p>
              <p className="text-xs text-slate-500">{user.xp.toLocaleString()} XP</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
