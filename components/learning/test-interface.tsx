import React, { useState, useEffect } from "react";
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
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish(answers);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, answers, onFinish]);

  const handleOptionSelect = (qIdx: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = option;
    setAnswers(newAnswers);
  };

  const handleFinish = () => {
    onFinish(answers);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg h-[80vh] overflow-y-auto flex flex-col">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 py-2">
        <span className="font-bold text-lg">Level: {level}</span>
        <span className="font-bold text-lg">Time Left: {minutes}:{seconds.toString().padStart(2, "0")}</span>
        <Button onClick={handleFinish} className="ml-4">Finish Test</Button>
      </div>
      <div className="flex-1">
        {questions.map((q, qIdx) => (
          <div key={q.id} className="mb-8 pb-6 border-b">
            <div className="font-semibold mb-2">Question {qIdx + 1} of {questions.length}</div>
            <div className="mb-2 text-base">{q.question}</div>
            <div className="space-y-2">
              {q.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={answers[qIdx] === option ? "default" : "outline"}
                  className="w-full text-left"
                  onClick={() => handleOptionSelect(qIdx, option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
