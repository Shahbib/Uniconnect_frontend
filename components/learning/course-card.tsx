import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, BookOpen } from "lucide-react"
import type { Course } from "@/types/learning"
import { LearningUtils } from "@/utils/learning-utils"

interface CourseCardProps {
  course: Course
  variant?: "default" | "compact"
}

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const isCompact = variant === "compact"

  return (
    <Card
      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${!isCompact ? "hover:-translate-y-1" : ""}`}
    >
      {!isCompact && (
        <div className="relative">
          <img
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={LearningUtils.getSkillLevelBadgeVariant(course.difficulty)}>{course.difficulty}</Badge>
          </div>
        </div>
      )}

      <CardHeader className={isCompact ? "pb-3" : ""}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={`leading-tight ${isCompact ? "text-base" : "text-lg"}`}>{course.title}</CardTitle>
            <p className={`text-slate-600 mt-1 ${isCompact ? "text-sm" : ""}`}>by {course.instructor}</p>
          </div>
          {isCompact && (
            <Badge variant={LearningUtils.getSkillLevelBadgeVariant(course.difficulty)} className="ml-2">
              {course.difficulty}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
          <p className="text-xs text-slate-500">
            {course.completedLessons} of {course.totalLessons} lessons completed
          </p>
        </div>

        {!isCompact && (
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.estimatedTime}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.totalLessons} lessons
            </div>
          </div>
        )}

        <div className="space-y-2">
          <p className={`font-medium text-slate-900 ${isCompact ? "text-sm" : ""}`}>Next: {course.nextLesson}</p>
          <Button
            className={`bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 ${isCompact ? "w-full text-sm h-8" : "w-full"}`}
          >
            <Play className={`mr-2 ${isCompact ? "h-3 w-3" : "h-4 w-4"}`} />
            Continue Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
