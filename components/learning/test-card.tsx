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
  // State declarations
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [testStarted, setTestStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // ESC key closes modal
  React.useEffect(() => {
    if (!testStarted && !isGenerating) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [testStarted, isGenerating]);

  const handleStartClick = () => {
    setShowLevelSelect(true);
  };

  const handleLevelSelect = async (level: string) => {
    setSelectedLevel(level);
    setShowLevelSelect(false);
    setIsGenerating(true);
    // Call API to generate questions
    try {
      const skillLevelNum = Number(level.replace(/[^\d]/g, ""));
      const token = localStorage.getItem('token'); // Get JWT from localStorage
      const headers: Record<string, string> = {
        "Content-Type": "application/json"
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        console.warn("No JWT token found in localStorage. Login may be required.");
      }
      const res = await fetch("http://localhost:9000/mcq/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({
          skill_name: test.title,
          skill_level: skillLevelNum,
          num_questions: 10,
        }),
      });
      const text = await res.text();
      let data: { questions?: any[] } = {};
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.warn("Response is not valid JSON");
      }
      const mappedQuestions = (data.questions || []).map((q: any, idx: number) => ({
        id: q.number || idx + 1,
        question: q.question || `Question ${idx + 1}`,
        options: q.options ? Object.values(q.options) : [],
        answer: q.correct_answer || "",
      }));
  setQuestions(mappedQuestions); // Only 10 questions requested
  setCorrectAnswers(mappedQuestions.map((q: any) => q.answer));
  setTestStarted(true);
  setTimeout(() => setIsGenerating(false), 0);
    } catch (err) {
      console.error("Error during fetch /mcq/generate:", err);
  setQuestions([]);
  setTestStarted(true);
  setTimeout(() => setIsGenerating(false), 0);
    }
  };

  const handleFinish = (answers: string[]) => {
    setUserAnswers(answers);
    if (isGenerating) return; // Prevent double request
    setIsGenerating(true);
    setShowResults(true);
  };

  const handleClose = () => {
  setTestStarted(false);
  setShowResults(false);
  setSelectedLevel("");
  setQuestions([]);
  setUserAnswers([]);
  setCorrectAnswers([]);
  setIsGenerating(false);
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
                    10 questions
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
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                    Generating...
                  </span>
                ) : (
                  "Start Test"
                )}
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
              (() => {
                // Calculate result summary
                let totalRight = 0, totalWrong = 0, totalSkipped = 0;
                const getStatusIcon = (userAns: string, correctAns: string) => {
                  if (!userAns) return <span className="ml-2 text-gray-500">0</span>; // Not answered
                  if (userAns === correctAns) return <span className="ml-2 text-green-600">✔️</span>;
                  if (userAns === "skipped") return <span className="ml-2 text-yellow-500">skipped</span>;
                  return <span className="ml-2 text-red-600">❌</span>;
                };
                questions.forEach((q, idx) => {
                  const userAns = userAnswers[idx];
                  if (!userAns) totalSkipped++;
                  else if (userAns === q.answer) totalRight++;
                  else totalWrong++;
                });
                return (
                  <div className="max-w-4xl mx-auto bg-white rounded shadow-lg h-[80vh] flex flex-col relative">
                    {/* Cross button top right */}
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none z-20"
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <div className="p-8 flex-1 overflow-y-auto">
                      <h2 className="text-2xl font-bold mb-6">Test Results</h2>
                      <div className="flex gap-8 mb-8 text-lg font-semibold">
                        <span className="text-green-600">Right: {totalRight}</span>
                        <span className="text-red-600">Wrong: {totalWrong}</span>
                        <span className="text-gray-500">Skipped: {totalSkipped}</span>
                      </div>
                      {questions.map((q, idx) => (
                        <div key={q.id} className="mb-6 pb-4 border-b flex items-center">
                          <div className="font-semibold mb-2 w-32">Question {idx + 1}</div>
                          <div className="mb-2 flex-1">{q.question}</div>
                          <div className="mb-2 w-48 flex items-center">
                            <span>Your answer: </span>
                            <span
                              className={
                                userAnswers[idx] === q.answer
                                  ? "text-green-600 ml-2"
                                  : !userAnswers[idx]
                                  ? "text-gray-500 ml-2"
                                  : "text-red-600 ml-2"
                              }
                            >
                              {userAnswers[idx] || "Not answered"}
                            </span>
                            {getStatusIcon(userAnswers[idx], q.answer)}
                          </div>
                          <div className="ml-4">
                            Correct: <span className="text-green-600">{q.answer}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Finish Button always at the bottom of modal content */}
                    <div className="w-full flex justify-center bg-white py-4 border-t">
                      <Button
                        onClick={handleClose}
                        className="px-8 py-3 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow"
                      >
                        Finish
                      </Button>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      )}
    </>
  )
  }
