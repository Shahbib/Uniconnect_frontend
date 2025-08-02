"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Paperclip, Sparkles, BookOpen, Brain, Lightbulb, MessageSquare } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hi! I'm your AI study assistant. I have access to all your notes, skills, and achievements. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "Explain my Data Structures notes",
        "Quiz me on Machine Learning",
        "Suggest skills to learn next",
        "Help with my project",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
        suggestions: generateSuggestions(inputMessage),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("data structures")) {
      return "Based on your Data Structures notes, I can see you've covered arrays, linked lists, and trees. Your notes show strong understanding of time complexity analysis. Would you like me to create a quiz on binary trees or explain any specific concept in more detail?"
    }

    if (lowerInput.includes("machine learning") || lowerInput.includes("ml")) {
      return "I see you've been working on machine learning projects! Your notes cover supervised learning algorithms like linear regression and decision trees. Your recent sentiment analysis project achieved 94% accuracy - impressive! What specific ML topic would you like to explore further?"
    }

    if (lowerInput.includes("skills") || lowerInput.includes("learn")) {
      return "Based on your current skill set (JavaScript, React, Python) and your interest in AI/ML, I recommend focusing on: 1) Deep Learning frameworks like TensorFlow or PyTorch, 2) Cloud platforms (AWS/GCP), 3) System Design principles. Which area interests you most?"
    }

    if (lowerInput.includes("project")) {
      return "Looking at your profile, you have experience with web development and machine learning. For your next project, consider: 1) A full-stack ML application, 2) Contributing to open-source projects, 3) Building a portfolio website. What type of project are you thinking about?"
    }

    return (
      "I understand you're asking about '" +
      input +
      "'. Based on your learning history and notes, I can provide personalized guidance. Could you be more specific about what you'd like to know or learn?"
    )
  }

  const generateSuggestions = (input: string): string[] => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("data structures")) {
      return [
        "Create a binary tree quiz",
        "Explain graph algorithms",
        "Compare sorting algorithms",
        "Practice coding problems",
      ]
    }

    if (lowerInput.includes("machine learning")) {
      return ["Explain neural networks", "Compare ML algorithms", "Suggest ML projects", "Review your ML notes"]
    }

    return ["Show my learning progress", "Suggest study schedule", "Find related resources", "Create practice quiz"]
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const quickActions = [
    { icon: BookOpen, label: "Review Notes", color: "bg-blue-500" },
    { icon: Brain, label: "Take Quiz", color: "bg-purple-500" },
    { icon: Lightbulb, label: "Get Suggestions", color: "bg-yellow-500" },
    { icon: MessageSquare, label: "Study Help", color: "bg-green-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-[calc(100vh-3rem)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  AI Study Assistant
                </h1>
                <p className="text-slate-600">Your personalized learning companion</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-16 flex-col gap-2 hover:shadow-md transition-all bg-transparent"
                onClick={() => handleSuggestionClick(action.label)}
              >
                <div className={`p-2 rounded-full ${action.color} text-white`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Chat Messages */}
          <Card className="flex-1 border-0 shadow-lg flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-green-500" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        {message.sender === "user" ? (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>JD</AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div
                        className={`space-y-2 ${message.sender === "user" ? "items-end" : "items-start"} flex flex-col`}
                      >
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                              : "bg-white border shadow-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>

                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 hover:bg-blue-50 bg-transparent"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}

                        <span className="text-xs text-slate-500">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white border shadow-sm p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Ask me anything about your studies..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
