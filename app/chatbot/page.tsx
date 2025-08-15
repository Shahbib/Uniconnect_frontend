"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Paperclip, Sparkles, BookOpen, Brain, Lightbulb, MessageSquare, Info } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

export default function AIChatbot() {
  const defaultWelcome: Message = {
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
  };
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatbot_messages");
      if (saved) {
        try {
          const parsed = JSON.parse(saved).map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) }));
          return parsed;
        } catch {}
      }
    }
    return [defaultWelcome];
  });
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom();
    // Save messages to localStorage on change
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Send message to backend /chat API
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:9000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ query: inputMessage, thread_id: "thread_123456" })
      });
      const data = await res.json();
      if (data.response) {
        const botResponse: Message = {
          id: messages.length + 2,
          content: data.response,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        const errorResponse: Message = {
          id: messages.length + 2,
          content: data.message || "Failed to get response from AI agent.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorResponse]);
      }
    } catch (err) {
      const errorResponse: Message = {
        id: messages.length + 2,
        content: "Network error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
    setIsTyping(false);
  }


  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
                    <Info className="h-4 w-4 text-green-700" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-xs text-sm whitespace-pre-line">
                  <strong>AI Chatbot</strong>
                  <br />
                  <br />
                  This assistant uses advanced AI to answer your study questions, suggest resources, quiz you, and help with projects.
                  <br />
                  <br />
                  Your messages are private and not shared with others.
                </PopoverContent>
              </Popover>
            </div>
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
              <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
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
