import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, HelpCircle, Users, Sparkles } from "lucide-react"
import type { AITest } from "@/types/learning"
import { LearningUtils } from "@/utils/learning-utils"
import React, { useState } from "react";
import { TestInterface } from "./test-interface";

interface TestCardProps {
  test: AITest
}

export function TestCard({ test }: TestCardProps) {
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [testStarted, setTestStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleStartClick = () => {
    setShowLevelSelect(true);
  };

  const handleLevelSelect = async (level: string) => {
    setSelectedLevel(level);
    setShowLevelSelect(false);
    // Call API to generate questions
    try {
      const res = await fetch("/mcq/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill_name: test.title,
          skill_level: parseFloat(level.replace(/[^\d.]/g, "")),
          num_questions: test.questions || 20,
        }),
      });
      const data = await res.json();
      // Map API response to expected format for TestInterface
      const mappedQuestions = (data.questions || []).map((q: any, idx: number) => ({
        id: idx + 1,
        question: q.question || q.text || `Question ${idx + 1}`,
        options: q.options || q.choices || [],
        answer: q.answer || "",
      }));
      setQuestions(mappedQuestions);
      setCorrectAnswers(mappedQuestions.map((q: any) => q.answer));
      setTestStarted(true);
    } catch (err) {
      setQuestions([]);
      setTestStarted(true);
    }
  };

  const handleFinish = (answers: string[]) => {
    setUserAnswers(answers);
    setShowResults(true);
  };

  const handleClose = () => {
    setTestStarted(false);
    setShowResults(false);
    setSelectedLevel("");
    setQuestions([]);
    setUserAnswers([]);
    setCorrectAnswers([]);
  };

  return (
    <>
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
          {showLevelSelect ? (
            <div className="space-y-2">
              <div className="font-semibold mb-2">Select Level to Start Test:</div>
              {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map((level) => (
                <Button key={level} className="w-full" onClick={() => handleLevelSelect(level)}>
                  {level}
                </Button>
              ))}
            </div>
          ) : (
            <>
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
                  {test.questions || 20} questions
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  20 minutes
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
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" onClick={handleStartClick}>
                Start Test
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      {testStarted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="w-full h-full flex items-center justify-center relative">
            {!showResults ? (
              <TestInterface questions={questions} duration={20} level={selectedLevel} onFinish={handleFinish} />
            ) : (
              <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg h-[80vh] overflow-y-auto flex flex-col relative">
                <button className="absolute top-4 right-4 text-xl font-bold bg-gray-200 rounded-full px-3 py-1 hover:bg-gray-300" onClick={handleClose}>×</button>
                <h2 className="text-2xl font-bold mb-6">Test Results</h2>
                {questions.map((q, idx) => (
                  <div key={q.id} className="mb-6 pb-4 border-b">
                    <div className="font-semibold mb-2">Question {idx + 1}</div>
                    <div className="mb-2">{q.question}</div>
                    <div className="mb-2">Your answer: <span className={userAnswers[idx] === q.answer ? "text-green-600" : "text-red-600"}>{userAnswers[idx] || "Not answered"}</span></div>
                    <div>Correct answer: <span className="text-green-600">{q.answer}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
