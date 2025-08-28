
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
  const [currentPage, setCurrentPage] = useState(1)

  // Reset page when filters change
  function handleSearchChange(term: string) {
    setSearchTerm(term)
    setCurrentPage(1)
  }
  function handleSubjectChange(subject: string) {
    setSelectedSubject(subject)
    setCurrentPage(1)
  }
  const testsPerPage = 12

  // Data
  const aiGeneratedTests = LearningDataService.getAIGeneratedTests()
  const achievements = LearningDataService.getAchievements()
  const subjects = LearningDataService.getSubjects()
  const filteredTests = LearningUtils.filterTests(aiGeneratedTests, searchTerm, selectedSubject)
  const totalPages = Math.ceil(filteredTests.length / testsPerPage)
  const paginatedTests = filteredTests.slice((currentPage - 1) * testsPerPage, currentPage * testsPerPage)

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
            {/* Search box only, no filters dropdown or more filters button */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={e => handleSearchChange(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTests.length > 0 ? (
                paginatedTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-8">No tests found.</div>
              )}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || filteredTests.length === 0}
              >
                Previous
              </button>
              {[...Array(totalPages > 0 ? totalPages : 1)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setCurrentPage(idx + 1)}
                  disabled={filteredTests.length === 0}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages > 0 ? totalPages : 1))}
                disabled={currentPage === (totalPages > 0 ? totalPages : 1) || filteredTests.length === 0}
              >
                Next
              </button>
            </div>
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
