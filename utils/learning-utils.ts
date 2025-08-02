import type { AITest } from "@/types/learning"

export class LearningUtils {
  static getDifficultyColor(difficulty: string): string {
    const colors = {
      beginner: "bg-green-100 text-green-700",
      intermediate: "bg-yellow-100 text-yellow-700",
      advanced: "bg-red-100 text-red-700",
    }
    return colors[difficulty.toLowerCase() as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  static filterTests(tests: AITest[], searchTerm: string, selectedSubject: string): AITest[] {
    return tests.filter((test) => {
      const matchesSearch = this.matchesSearchTerm(test, searchTerm)
      const matchesSubject = this.matchesSubject(test, selectedSubject)
      return matchesSearch && matchesSubject
    })
  }

  private static matchesSearchTerm(test: AITest, searchTerm: string): boolean {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    return (
      test.title.toLowerCase().includes(searchLower) ||
      test.subject.toLowerCase().includes(searchLower) ||
      test.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  }

  private static matchesSubject(test: AITest, selectedSubject: string): boolean {
    return !selectedSubject || selectedSubject === "all" || test.subject === selectedSubject
  }

  static calculateProgress(completed: number, total: number): number {
    return Math.round((completed / total) * 100)
  }

  static getSkillLevelBadgeVariant(level: string): "default" | "secondary" | "outline" {
    switch (level.toLowerCase()) {
      case "advanced":
        return "default"
      case "intermediate":
        return "secondary"
      default:
        return "outline"
    }
  }
}
