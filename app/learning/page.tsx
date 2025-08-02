"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Brain, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/common/page-header"

// Components
import { StatsGrid } from "@/components/learning/stats-grid"
import { CourseCard } from "@/components/learning/course-card"
import { TestCard } from "@/components/learning/test-card"
import { SearchFilters } from "@/components/learning/search-filters"
import { SkillsProgress } from "@/components/learning/skills-progress"
import { Leaderboard } from "@/components/learning/leaderboard"

// Services and utilities
import { LearningDataService } from "@/data/learning-data"
import { LearningUtils } from "@/utils/learning-utils"

export default function LearningDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")

  // Data
  const learningStats = LearningDataService.getLearningStats()
  const currentCourses = LearningDataService.getCurrentCourses()
  const aiGeneratedTests = LearningDataService.getAIGeneratedTests()
  const achievements = LearningDataService.getAchievements()
  const skillProgress = LearningDataService.getSkillProgress()
  const leaderboard = LearningDataService.getLeaderboard()
  const subjects = LearningDataService.getSubjects()

  const filteredTests = LearningUtils.filterTests(aiGeneratedTests, searchTerm, selectedSubject)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <PageHeader
          title="Learning Dashboard"
          description="Track your progress and test your knowledge with AI-generated assessments"
        >
          </PageHeader>

        {/* Statistics Grid */}
        <StatsGrid stats={learningStats} />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tests">AI Tests</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
               

                {/* Skills Progress Section */}
                <SkillsProgress skills={skillProgress} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">

                {/* Leaderboard with scrollable card */}
                <div className="max-h-96 overflow-y-auto">
                  <Leaderboard users={leaderboard} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          {/* AI Tests Tab */}
          <TabsContent value="tests" className="space-y-6 mt-6">
            <SearchFilters
              searchTerm={searchTerm}
              selectedSubject={selectedSubject}
              subjects={subjects}
              onSearchChange={setSearchTerm}
              onSubjectChange={setSelectedSubject}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${achievement.color} text-white`}>
                        <achievement.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">{achievement.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{achievement.description}</p>
                        <Badge variant="outline" className="mt-2">
                          {achievement.date}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
