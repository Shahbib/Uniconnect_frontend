import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import type { SkillProgress } from "@/types/learning"
import { LearningUtils } from "@/utils/learning-utils"

interface SkillsProgressProps {
  skills: SkillProgress[]
}

export function SkillsProgress({ skills }: SkillsProgressProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Skills Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">{skill.skill}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={LearningUtils.getSkillLevelBadgeVariant(skill.level)} className="text-xs">
                    {skill.level}
                  </Badge>
                </div>
              </div>
              <Progress value={skill.progress} className="h-2" />
              <p className="text-xs text-slate-500">{skill.progress}% complete</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
