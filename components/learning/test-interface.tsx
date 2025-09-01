import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer?: string;
}

interface TestInterfaceProps {
  questions: Question[];
  duration: number; // in minutes
  level: string;
  onFinish: (answers: string[]) => void;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({ questions, duration, level, onFinish }) => {
  // ...existing code...
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [showResults, setShowResults] = useState(false);
  // ...existing code...

  const handleOptionSelect = (qIdx: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = option;
    setAnswers(newAnswers);
  };

  const handleFinish = () => {
  setShowResults(true);
  };

  // ...existing code...
        const optionLabels = ['A', 'B', 'C', 'D'];
        if (!showResults) {
          return (
            <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg h-[80vh] overflow-y-auto flex flex-col">
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 py-2">
                <span className="font-bold text-lg">Level: {level}</span>
                <Button onClick={handleFinish} className="ml-4">Finish Test</Button>
              </div>
              <div className="flex-1">
                {questions.map((q, qIdx) => (
                  <div key={q.id} className="mb-8 pb-6 border-b">
                    <div className="font-semibold mb-2">Question {qIdx + 1} of {questions.length}</div>
                    <div className="mb-2 text-base">{q.question}</div>
                    <div className="space-y-2">
                      {q.options.slice(0, 4).map((option, idx) => (
                        <Button
                          key={idx}
                          variant={answers[qIdx] === optionLabels[idx] ? "default" : "outline"}
                          className="w-full text-left justify-start"
                          onClick={() => handleOptionSelect(qIdx, optionLabels[idx])}
                        >
                          <span className="font-bold mr-2">{optionLabels[idx]}</span>
                          <span>{option}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Results summary
        let totalRight = 0, totalWrong = 0, totalSkipped = 0;
        const getStatusIcon = (userAns: string, correctAns: string) => {
          if (!userAns) return (
            <Circle className="ml-2 text-gray-500" size={20}>
              <title>Not answered</title>
            </Circle>
          );
          if (userAns === correctAns) return (
            <CheckCircle2 className="ml-2 text-green-600" size={20}>
              <title>Correct</title>
            </CheckCircle2>
          );
          return (
            <XCircle className="ml-2 text-red-600" size={20}>
              <title>Wrong</title>
            </XCircle>
          );
        };
        questions.forEach((q, idx) => {
          const userAns = answers[idx];
          if (!userAns) totalSkipped++;
          else if (userAns === q.answer) totalRight++;
          else totalWrong++;
        });

        return (
          <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg h-[80vh] overflow-y-auto flex flex-col">
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
                  <span className={answers[idx] === q.answer ? "text-green-600 ml-2" : (!answers[idx] ? "text-gray-500 ml-2" : "text-red-600 ml-2")}>{answers[idx] || "Not answered"}</span>
                  {getStatusIcon(answers[idx], q.answer ?? "")}
                </div>
                <div className="ml-4">Correct: <span className="text-green-600">{q.answer}</span></div>
              </div>
            ))}
          </div>
        );
};
