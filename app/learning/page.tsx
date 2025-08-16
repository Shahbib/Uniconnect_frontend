
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/common/page-header"
import { TestCard } from "@/components/learning/test-card"
import { SearchFilters } from "@/components/learning/search-filters"
import { LearningDataService } from "@/data/learning-data"
import { LearningUtils } from "@/utils/learning-utils"


export default function LearningDashboard() {
  const [activeTab, setActiveTab] = useState("tests")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")

  // Data
  const aiGeneratedTests = LearningDataService.getAIGeneratedTests()
  const achievements = LearningDataService.getAchievements()
  const subjects = LearningDataService.getSubjects()
  const filteredTests = LearningUtils.filterTests(aiGeneratedTests, searchTerm, selectedSubject)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <PageHeader
          title="Learning Dashboard"
          description="Track your progress and test your knowledge with AI-generated assessments"
        />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="tests">AI Tests</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          {/* ai study */}
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
            {/* achivement */}
          </TabsContent>
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
