"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Upload,
  Search,
  Filter,
  Star,
  Download,
  Eye,
  MessageSquare,
  ThumbsUp,
  Share2,
  FileText,
  Video,
  ImageIcon,
  Plus,
  Bot,
  Send,
  Paperclip,
  Sparkles,
  Brain,
  Lightbulb,
  Target,
  Trash,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import FileUploadModal from "../../components/file-upload-modal"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

interface Upload {
  id: number
  title: string
  subject: string
  course: string
  type: string
  description: string
  size: string
  uploadedAt: string
  tags?: string // Added the tags property
  lastModified?: string // Added lastModified property
}

export default function StudyMaterials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
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
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [myUploads, setMyUploads] = useState<Upload[]>([])
  const [myNotes, setMyNotes] = useState<Upload[]>([
    {
      id: 1,
      title: "JavaScript ES6 Features",
      subject: "Web Development",
      lastModified: "2 hours ago",
      type: "PDF",
      course: "",
      description: "",
      size: "",
      uploadedAt: "",
      tags: ""
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      subject: "Frontend Development",
      lastModified: "1 day ago",
      type: "PDF",
      course: "",
      description: "",
      size: "",
      uploadedAt: "",
      tags: ""
    },
    {
      id: 3,
      title: "Database Design Principles",
      subject: "Computer Science",
      lastModified: "3 days ago",
      type: "PDF",
      course: "",
      description: "",
      size: "",
      uploadedAt: "",
      tags: ""
    },
    {
      id: 4,
      title: "Machine Learning Notes",
      subject: "Artificial Intelligence",
      lastModified: "1 week ago",
      type: "PDF",
      course: "",
      description: "",
      size: "",
      uploadedAt: "",
      tags: ""
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const materials = [
    {
      id: 1,
      title: "Data Structures and Algorithms - Complete Notes",
      subject: "Computer Science",
      course: "CS 201",
      author: "Sarah Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      university: "MIT",
      type: "PDF",
      pages: 45,
      rating: 4.8,
      downloads: 1234,
      views: 5678,
      comments: 23,
      likes: 156,
      uploadDate: "2 days ago",
      tags: ["Algorithms", "Data Structures", "Python", "Complexity"],
      aiScore: 95,
      description:
        "Comprehensive notes covering all major data structures including arrays, linked lists, trees, graphs, and their algorithms with Python implementations.",
      verified: true,
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals Video Lectures",
      subject: "Artificial Intelligence",
      course: "AI 301",
      author: "Alex Rodriguez",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      university: "Stanford",
      type: "Video",
      duration: "3h 45m",
      rating: 4.9,
      downloads: 892,
      views: 3421,
      comments: 45,
      likes: 234,
      uploadDate: "1 week ago",
      tags: ["Machine Learning", "Neural Networks", "TensorFlow"],
      aiScore: 92,
      description:
        "Video series covering supervised and unsupervised learning, neural networks, and practical implementations using TensorFlow.",
      verified: true,
    },
    {
      id: 3,
      title: "Calculus II - Integration Techniques",
      subject: "Mathematics",
      course: "MATH 152",
      author: "Emma Thompson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      university: "Harvard",
      type: "PDF",
      pages: 28,
      rating: 4.6,
      downloads: 567,
      views: 2134,
      comments: 12,
      likes: 89,
      uploadDate: "3 days ago",
      tags: ["Calculus", "Integration", "Mathematics"],
      aiScore: 88,
      description:
        "Detailed notes on various integration techniques including substitution, integration by parts, and partial fractions.",
      verified: false,
    },
  ]

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

    if (lowerInput.includes("javascript") || lowerInput.includes("js")) {
      return "Looking at your JavaScript ES6 notes, you've covered arrow functions, destructuring, and promises. Your React Hooks notes are particularly detailed. Would you like me to explain any specific concept or create practice exercises?"
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

    if (lowerInput.includes("javascript")) {
      return ["Explain closures", "Create React quiz", "Practice ES6 features", "Review async/await"]
    }

    return ["Show my learning progress", "Suggest study schedule", "Find related resources", "Create practice quiz"]
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleMaterialUpload = async (data: {
    title: string
    subject: string
    course: string
    type: string
    description: string
    file: File
    tags?: string
  }) => {
    await new Promise((res) => setTimeout(res, 1200))

    const newMaterial = {
      id: myUploads.length + 1,
      title: data.title,
      subject: data.subject,
      course: data.course,
      type: data.type,
      description: data.description,
      size: `${(data.file.size / 1024).toFixed(1)} KB`,
      uploadedAt: "just now",
      tags: data.tags || ""
    }

    setMyUploads((prev) => [newMaterial, ...prev])

    // Add the uploaded material to 'My Study'
    setMyNotes((prev) => [
      ...prev,
      {
        id: newMaterial.id,
        title: newMaterial.title,
        subject: newMaterial.subject,
        course: newMaterial.course,
        type: newMaterial.type,
        description: newMaterial.description,
        size: newMaterial.size,
        uploadedAt: newMaterial.uploadedAt,
        tags: newMaterial.tags
      },
    ])

    setUploadModalOpen(false)
  }

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return FileText
      case "video":
        return Video
      case "image":
        return ImageIcon
      default:
        return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "from-red-400 to-pink-500"
      case "video":
        return "from-blue-400 to-cyan-500"
      case "image":
        return "from-green-400 to-teal-500"
      default:
        return "from-gray-400 to-slate-500"
    }
  }

  const quickActions = [
    { icon: BookOpen, label: "Review Notes", color: "from-blue-500 to-cyan-500" },
    { icon: Brain, label: "Take Quiz", color: "from-purple-500 to-pink-500" },
    { icon: Lightbulb, label: "Get Suggestions", color: "from-yellow-500 to-orange-500" },
    { icon: Target, label: "Study Help", color: "from-green-500 to-teal-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Study Materials
            </h1>
            <p className="text-slate-600">Share and discover quality study resources</p>
          </div>

          <Button
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search study materials, courses, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Browse Materials
            </TabsTrigger>
            <TabsTrigger value="my-study" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              My Study
            </TabsTrigger>
            <TabsTrigger value="my-uploads" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              My Uploads
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {materials.map((material) => {
                const FileIcon = getFileIcon(material.type)
                return (
                  <Card key={material.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(material.type)} text-white`}>
                            <FileIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {material.course} • {material.subject}
                            </CardDescription>
                          </div>
                        </div>
                        {material.verified && (
                          <Badge className="bg-gradient-to-r from-green-400 to-teal-500 text-white ml-2">
                            AI Verified
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-700 leading-relaxed">{material.description}</p>

                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={material.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {material.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{material.author}</p>
                          <p className="text-xs text-slate-500">
                            {material.university} • {material.uploadDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{material.rating}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {material.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {material.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {material.downloads}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {material.comments}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">AI Score:</span>
                          <Badge variant="secondary">{material.aiScore}%</Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="icon" className="bg-transparent">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-transparent">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-transparent">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="my-study" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* My Notes */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    My Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 overflow-y-auto max-h-[400px]">
                  {myNotes.map((note) => {
                    const FileIcon = getFileIcon(note.type)
                    return (
                      <div
                        key={note.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(note.type)} text-white`}>
                          <FileIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900">{note.title}</p>
                          <p className="text-xs text-slate-500">{note.subject}</p>
                          <p className="text-xs text-slate-400">{note.lastModified}</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* AI Study Assistant */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg h-[600px] flex flex-col">
                  <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-teal-50">
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-blue-500" />
                      AI Study Assistant
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 ml-auto">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Powered
                      </Badge>
                    </CardTitle>
                    <CardDescription>Your personalized learning companion</CardDescription>
                  </CardHeader>

                  {/* Quick Actions */}
                  <div className="p-4 border-b">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-12 flex-col gap-1 hover:shadow-md transition-all bg-transparent"
                          onClick={() => handleSuggestionClick(action.label)}
                        >
                          <div className={`p-1 rounded-full bg-gradient-to-r ${action.color} text-white`}>
                            <action.icon className="h-3 w-3" />
                          </div>
                          <span className="text-xs">{action.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Chat Messages */}
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
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
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
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
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
                        className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-uploads" className="space-y-6 mt-6">
            {myUploads.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Upload className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No uploads yet</h3>
                  <p className="text-slate-600 mb-6">Share your study materials with the community</p>
                  <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Your First Material
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myUploads.map((upload) => {
                  const FileIcon = getFileIcon(upload.type)
                  return (
                    <Card key={upload.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(upload.type)} text-white`}>
                              <FileIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg leading-tight">{upload.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {upload.course} • {upload.subject}
                              </CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-transparent"
                            onClick={() => setMyUploads((prev) => prev.filter((item) => item.id !== upload.id))}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-slate-700 leading-relaxed">{upload.description}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <p className="text-xs text-slate-500">
                              {upload.size} • {upload.uploadedAt}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {upload.tags?.split(",").map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="icon" className="bg-transparent">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="bg-transparent">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="bg-transparent">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Star className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                <p className="text-slate-600 mb-6">Save materials you find helpful for quick access</p>
                <Button variant="outline" className="bg-transparent">
                  Browse Materials
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <FileUploadModal
          open={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(false)
            setSelectedFile(null)
          }}
          onUpload={handleMaterialUpload}
        />
      </main>
    </div>
  )
}
