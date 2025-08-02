
"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Paperclip,
  Code,
  FileText,
  ImageIcon,
  Users,
  Phone,
  Video,
  MoreVertical,
  Download,
  Eye,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import FileUploadModal from "@/components/FileUploadModal"
import CodeEditorModal from "@/components/CodeEditorModal"
import { useParams } from "next/navigation"

interface Message {
  id: number
  sender: string
  avatar: string
  content: string
  timestamp: Date
  type: "text" | "code" | "file" | "image"
  fileUrl?: string
  fileName?: string
  language?: string
}

export default function TeamChat() {
  const params = useParams()
  const teamId = params.id
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Sarah Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Hey team! I've uploaded the initial ML model. Check it out and let me know your thoughts.",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
    },
    {
      id: 2,
      sender: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      content: `def train_model(X_train, y_train):
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    return model

# Initial accuracy: 94.2%`,
      timestamp: new Date(Date.now() - 3000000),
      type: "code",
      language: "python",
    },
    {
      id: 3,
      sender: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Great work! I've reviewed the code and added some optimizations.",
      timestamp: new Date(Date.now() - 1800000),
      type: "text",
    },
    {
      id: 4,
      sender: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Dataset Analysis Report",
      timestamp: new Date(Date.now() - 900000),
      type: "file",
      fileName: "dataset_analysis.pdf",
      fileUrl: "/placeholder.pdf",
    },
  ])

  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // File upload modal state
  const [fileModalOpen, setFileModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Shared files state
  const [sharedFiles, setSharedFiles] = useState([
    {
      name: "ML_Model_v2.py",
      type: "code",
      size: "15.2 KB",
      uploadedBy: "Alex Chen",
      uploadedAt: "2 hours ago",
    }
  ])

  // Code editor modal state
  const [codeModalOpen, setCodeModalOpen] = useState(false)

  // Simulate file upload and add to sharedFiles
  const handleFileUpload = async (file: File) => {
    // Simulate upload delay
    await new Promise((res) => setTimeout(res, 1200));
    setSharedFiles((prev) => [
      {
        name: file.name,
        type: file.type.startsWith("image") ? "image" : file.name.endsWith(".py") ? "code" : "document",
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedBy: "You",
        uploadedAt: "just now",
      },
      ...prev,
    ]);

    // Add file message to chat
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        content: file.name,
        timestamp: new Date(),
        type: "file",
        fileName: file.name,
        fileUrl: "", // You can update this with a real URL if you have one
      },
    ]);
  }

  const teamMembers = [
    {
      name: "Sarah Kim",
      role: "Team Lead",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Alex Chen",
      role: "ML Engineer",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike Johnson",
      role: "Backend Dev",
      status: "away",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emma Davis",
      role: "Data Scientist",
      status: "offline",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike Johnson",
      role: "Backend Dev",
      status: "away",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sarah Kim",
      role: "Team Lead",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Alex Chen",
      role: "ML Engineer",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike Johnson",
      role: "Backend Dev",
      status: "away",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emma Davis",
      role: "Data Scientist",
      status: "offline",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike Johnson",
      role: "Backend Dev",
      status: "away",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      content: message,
      timestamp: new Date(),
      type: "text",
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "code":
        return Code
      case "document":
        return FileText
      case "image":
        return ImageIcon
      default:
        return FileText
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Team Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Team Header */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">AI Healthcare Project</CardTitle>
                    <p className="text-sm text-slate-600">4 members</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Team Members */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-72 overflow-y-auto">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.role}</p>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {member.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="chat" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="sharedfiles">Shared Files</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col">
                <Card className="border-0 shadow-lg flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-0" style={{ minHeight: 0, maxHeight: 'calc(100vh - 20rem)' }}>
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {msg.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{msg.sender}</span>
                            <span className="text-xs text-slate-500">
                              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>

                          {msg.type === "text" && (
                            <div className="bg-slate-100 rounded-lg p-3">
                              <p className="text-sm">{msg.content}</p>
                            </div>
                          )}

                          {msg.type === "code" && (
                            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="secondary" className="text-xs">
                                  {msg.language}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-400 hover:text-white"
                                  onClick={() => {
                                    if (msg.content) {
                                      navigator.clipboard.writeText(msg.content)
                                    }
                                  }}
                                >
                                  <Code className="h-3 w-3 mr-1" />
                                  Copy
                                </Button>
                              </div>
                              <pre className="text-sm text-green-400">
                                <code>{msg.content}</code>
                              </pre>
                            </div>
                          )}

                          {msg.type === "file" && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{msg.fileName}</p>
                                <p className="text-xs text-slate-500">Click to download</p>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>...</AvatarFallback>
                        </Avatar>
                        <div className="bg-slate-100 rounded-lg p-3">
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
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="icon" onClick={() => setFileModalOpen(true)}>
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    <Button variant="ghost" size="icon" onClick={() => setCodeModalOpen(true)}>
                      <Code className="h-4 w-4" />
                    </Button>
      {/* Code Editor Modal */}
      <CodeEditorModal
        open={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        onSend={(code, language) => {
          setMessages(prev => ([
            ...prev,
            {
              id: prev.length + 1,
              sender: "You",
              avatar: "/placeholder.svg?height=40&width=40",
              content: code,
              timestamp: new Date(),
              type: "code",
              language,
            },
          ]));
        }}
      />
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="sharedfiles" className="flex-1 flex flex-col !mt-0">
                <Card className="border-0 shadow-none flex-1 flex flex-col">
                  <CardContent className="flex-1 overflow-y-auto space-y-3" style={{ minHeight: 0, maxHeight: 'calc(100vh - 20rem)' }}>
                    {sharedFiles.length === 0 ? (
                      <div className="text-center py-12 text-slate-500">No files uploaded yet.</div>
                    ) : (
                      sharedFiles.map((file, index) => {
                        const FileIcon = getFileIcon(file.type)
                        return (
                          <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                            <div className="p-2 rounded-lg bg-blue-100">
                              <FileIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-slate-500">
                                {file.size} • {file.uploadedBy} • {file.uploadedAt}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        )
                      })
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      {/* File Upload Modal */}
      <FileUploadModal
        open={fileModalOpen}
        onClose={() => { setFileModalOpen(false); setSelectedFile(null); }}
        onFileSelect={setSelectedFile}
        onUpload={handleFileUpload}
      />
    </div>
  )
}
