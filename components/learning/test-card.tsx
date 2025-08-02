import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, HelpCircle, Users, Sparkles } from "lucide-react"
import type { AITest } from "@/types/learning"
import { LearningUtils } from "@/utils/learning-utils"

interface TestCardProps {
  test: AITest
}

export function TestCard({ test }: TestCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{test.title}</CardTitle>
            <p className="text-slate-600 mt-1">{test.subject}</p>
          </div>
          <div className="flex flex-col gap-2 ml-3">
            <Badge className={LearningUtils.getDifficultyColor(test.difficulty)}>{test.difficulty}</Badge>
            {test.aiGenerated && (
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-slate-700 leading-relaxed">{test.description}</p>

        <div className="flex flex-wrap gap-2">
          {test.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <HelpCircle className="h-4 w-4" />
            {test.questions} questions
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {test.duration}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            {test.rating}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {test.attempts} attempts
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Start Test
        </Button>
      </CardContent>
    </Card>
  )
}
