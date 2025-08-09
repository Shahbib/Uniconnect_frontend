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
  description: string
  sizes: string[]
  uploadedAt: string
  tags?: string[]
  lastModified?: string
  images: string[] // array of image URLs
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
  // Remove selectedFile, not needed for multiple images
  const [myUploads, setMyUploads] = useState<Upload[]>([])
  const [myNotes, setMyNotes] = useState<Upload[]>([])
  const [favorites, setFavorites] = useState<any[]>([])

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
      pages: 45,
      rating: 4.8,
      downloads: 1234,
      views: 5678,
      comments: 23,
      likes: 156,
      uploadDate: "2 Aug 2025",
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
      duration: "3h 45m",
      rating: 4.9,
      downloads: 892,
      views: 3421,
      comments: 45,
      likes: 234,
      uploadDate: "9 Aug 2025",
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
      pages: 28,
      rating: 4.6,
      downloads: 567,
      views: 2134,
      comments: 12,
      likes: 89,
      uploadDate: "5 Aug 2025",
      tags: ["Calculus", "Integration", "Mathematics"],
      aiScore: 88,
      description:
        "Detailed notes on various integration techniques including substitution, integration by parts, and partial fractions.",
      verified: false,
    },
    {
      id: 1,
      title: "Data Structures and Algorithms - Complete Notes",
      subject: "Computer Science",
      course: "CS 201",
      author: "Sarah Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      university: "MIT",
      pages: 45,
      rating: 4.8,
      downloads: 1234,
      views: 5678,
      comments: 23,
      likes: 156,
      uploadDate: "2 Aug 2025",
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
      duration: "3h 45m",
      rating: 4.9,
      downloads: 892,
      views: 3421,
      comments: 45,
      likes: 234,
      uploadDate: "9 Aug 2025",
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
      pages: 28,
      rating: 4.6,
      downloads: 567,
      views: 2134,
      comments: 12,
      likes: 89,
      uploadDate: "5 Aug 2025",
      tags: ["Calculus", "Integration", "Mathematics"],
      aiScore: 88,
      description:
        "Detailed notes on various integration techniques including substitution, integration by parts, and partial fractions.",
      verified: false,
    },
    {
      id: 1,
      title: "Data Structures and Algorithms - Complete Notes",
      subject: "Computer Science",
      course: "CS 201",
      author: "Sarah Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      university: "MIT",
      pages: 45,
      rating: 4.8,
      downloads: 1234,
      views: 5678,
      comments: 23,
      likes: 156,
      uploadDate: "2 Aug 2025",
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
      duration: "3h 45m",
      rating: 4.9,
      downloads: 892,
      views: 3421,
      comments: 45,
      likes: 234,
      uploadDate: "9 Aug 2025",
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
      pages: 28,
      rating: 4.6,
      downloads: 567,
      views: 2134,
      comments: 12,
      likes: 89,
      uploadDate: "5 Aug 2025",
      tags: ["Calculus", "Integration", "Mathematics"],
      aiScore: 88,
      description:
        "Detailed notes on various integration techniques including substitution, integration by parts, and partial fractions.",
      verified: false,
    },
    {
      id: 1,
      title: "Data Structures and Algorithms - Complete Notes",
      subject: "Computer Science",
      course: "CS 201",
      author: "Sarah Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      university: "MIT",
      pages: 45,
      rating: 4.8,
      downloads: 1234,
      views: 5678,
      comments: 23,
      likes: 156,
      uploadDate: "2 Aug 2025",
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
      duration: "3h 45m",
      rating: 4.9,
      downloads: 892,
      views: 3421,
      comments: 45,
      likes: 234,
      uploadDate: "9 Aug 2025",
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
      pages: 28,
      rating: 4.6,
      downloads: 567,
      views: 2134,
      comments: 12,
      likes: 89,
      uploadDate: "5 Aug 2025",
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
  description: string
  files: File[]
  tags?: string[]
  }) => {
      await new Promise((res) => setTimeout(res, 1200))

      // Convert images to URLs for preview (in real app, upload to server)
      const images = data.files.map(file => URL.createObjectURL(file));
      const sizes = data.files.map(file => `${(file.size / 1024).toFixed(1)} KB`);

      const newMaterial: Upload = {
        id: myUploads.length + 1,
        title: data.title,
        subject: data.subject,
        course: data.course,
        description: data.description,
        sizes,
        uploadedAt: "just now",
        tags: data.tags || [],
        images,
      }

      setMyUploads((prev) => [newMaterial, ...prev])
      setMyNotes((prev) => [...prev, newMaterial])
      setUploadModalOpen(false)
    }

  // Helper to check if a card is favorited
  const isFavorited = (id: number, type: 'material' | 'upload') => {
    return favorites.some(fav => fav.id === id && fav.type === type);
  };

  // Add to favorites
  const handleAddFavorite = (item: any, type: 'material' | 'upload') => {
    if (!isFavorited(item.id, type)) {
      setFavorites(prev => [...prev, { ...item, type }]);
    }
  };

  // Remove from favorites
  const handleRemoveFavorite = (id: number, type: 'material' | 'upload') => {
    setFavorites(prev => prev.filter(fav => !(fav.id === id && fav.type === type)));
  };

  // Pagination state
  const [browsePage, setBrowsePage] = useState(1);
  const [uploadsPage, setUploadsPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Helper to paginate
  function paginate(array: any[], page: number) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return array.slice(start, start + ITEMS_PER_PAGE);
  }

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
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Browse Materials
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
              {paginate(materials, browsePage).map((material) => {
                function formatDate(dateString: string) {
                  const date = new Date(dateString);
                  if (isNaN(date.getTime())) return dateString;
                  return date.toLocaleDateString();
                }
                return (
                  <Card key={material.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {material.course} • {material.subject}
                            </CardDescription>
                          </div>
                        </div>
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
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{material.author}</p>
                          <p className="text-xs text-slate-500">
                            {material.university} • {formatDate(material.uploadDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {material.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {material.downloads}
                          </div>
                        </div>
                        {/* <div className="flex items-center gap-1">
                          <span className="text-xs">AI Score:</span>
                          <Badge variant="secondary">{material.aiScore}%</Badge>
                        </div> */}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant={isFavorited(material.id, 'material') ? "default" : "outline"} size="icon" className="bg-transparent" onClick={() => handleAddFavorite(material, 'material')}>
                          <Star className={isFavorited(material.id, 'material') ? "h-4 w-4 text-yellow-500" : "h-4 w-4"} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="flex justify-center mt-4">
              <Button disabled={browsePage === 1} onClick={() => setBrowsePage(browsePage - 1)} variant="outline" size="sm">Prev</Button>
              <span className="mx-2 text-sm">Page {browsePage} of {Math.ceil(materials.length / ITEMS_PER_PAGE)}</span>
              <Button disabled={browsePage === Math.ceil(materials.length / ITEMS_PER_PAGE)} onClick={() => setBrowsePage(browsePage + 1)} variant="outline" size="sm">Next</Button>
            </div>
          </TabsContent>

          <TabsContent value="my-uploads" className="space-y-6 mt-6">
            {myUploads.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Upload className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No uploads yet</h3>
                  <p className="text-slate-600 mb-6">Share your study materials with the community</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginate(myUploads, uploadsPage).map((upload) => (
                  <Card key={upload.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
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
                            {upload.sizes?.join(", ")} • {upload.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {upload.tags?.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {/* Show uploaded images */}
                      {/* {upload.images && upload.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {upload.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`upload-${idx}`} className="h-16 w-16 object-cover rounded border" />
                          ))}
                        </div>
                      )} */}
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>                        
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {myUploads.length > 0 && (
              <div className="flex justify-center mt-4">
                <Button disabled={uploadsPage === 1} onClick={() => setUploadsPage(uploadsPage - 1)} variant="outline" size="sm">Prev</Button>
                <span className="mx-2 text-sm">Page {uploadsPage} of {Math.ceil(myUploads.length / ITEMS_PER_PAGE)}</span>
                <Button disabled={uploadsPage === Math.ceil(myUploads.length / ITEMS_PER_PAGE)} onClick={() => setUploadsPage(uploadsPage + 1)} variant="outline" size="sm">Next</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6 mt-6">
            {favorites.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Star className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-slate-600 mb-6">Save materials you find helpful for quick access</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginate(favorites, favoritesPage).map((fav) => (
                  <Card key={fav.type + '-' + fav.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg leading-tight">{fav.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {fav.course} • {fav.subject}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-700 leading-relaxed">{fav.description}</p>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={fav.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {fav.author
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{fav.author}</p>
                          <p className="text-xs text-slate-500">
                            {fav.university} • {fav.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {fav.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveFavorite(fav.id, fav.type)}>
                          Remove from Favorites
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {favorites.length > 0 && (
              <div className="flex justify-center mt-4">
                <Button disabled={favoritesPage === 1} onClick={() => setFavoritesPage(favoritesPage - 1)} variant="outline" size="sm">Prev</Button>
                <span className="mx-2 text-sm">Page {favoritesPage} of {Math.ceil(favorites.length / ITEMS_PER_PAGE)}</span>
                <Button disabled={favoritesPage === Math.ceil(favorites.length / ITEMS_PER_PAGE)} onClick={() => setFavoritesPage(favoritesPage + 1)} variant="outline" size="sm">Next</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <FileUploadModal
          open={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(false)
          }}
          onUpload={handleMaterialUpload}
        />
      </main>
    </div>
  )
}
