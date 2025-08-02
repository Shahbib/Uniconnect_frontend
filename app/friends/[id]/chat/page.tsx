"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, ArrowLeft, ImageIcon } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ChatMessage {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "image" | "file"
  isRead: boolean
}

interface Friend {
  id: string
  firstName: string
  lastName: string
  avatar: string
  university: string
  major: string
  status: "online" | "offline" | "away"
  lastSeen: string
}

export default function FriendChatPage() {
  const params = useParams()
  const friendId = params.id as string
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUserId = "current-user" // This would come from auth context

  // Mock friend data - in real app, this would be fetched based on friendId
  const friend: Friend = {
    id: friendId,
    firstName: "Alice",
    lastName: "Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    university: "MIT",
    major: "Computer Science",
    status: "online",
    lastSeen: "now",
  }

  // Mock messages - in real app, this would be fetched from API
  const mockMessages: ChatMessage[] = [
    {
      id: "1",
      senderId: friendId,
      content: "Hey! How's your computer science project going?",
      timestamp: "2024-01-20T10:00:00Z",
      type: "text",
      isRead: true,
    },
    {
      id: "2",
      senderId: currentUserId,
      content:
        "It's going well! Just finished the algorithm implementation. How about your data structures assignment?",
      timestamp: "2024-01-20T10:05:00Z",
      type: "text",
      isRead: true,
    },
    {
      id: "3",
      senderId: friendId,
      content: "That's awesome! I'm still working on the binary tree part. Could you help me with it later?",
      timestamp: "2024-01-20T10:10:00Z",
      type: "text",
      isRead: true,
    },
    {
      id: "4",
      senderId: currentUserId,
      content: "Of course! I'd be happy to help. Want to do a video call this evening?",
      timestamp: "2024-01-20T10:15:00Z",
      type: "text",
      isRead: true,
    },
    {
      id: "5",
      senderId: friendId,
      content: "Perfect! Let's do it at 7 PM. Thanks so much! 🙏",
      timestamp: "2024-01-20T10:20:00Z",
      type: "text",
      isRead: false,
    },
  ]

  useEffect(() => {
    setMessages(mockMessages)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUserId,
        content: message.trim(),
        timestamp: new Date().toISOString(),
        type: "text",
        isRead: false,
      }

      setMessages((prev) => [...prev, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-0 shadow-lg h-[calc(100vh-200px)] flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b bg-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/friends">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>

                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {friend.firstName[0]}
                      {friend.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(friend.status)}`}
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    {friend.firstName} {friend.lastName}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {friend.status === "online"
                      ? "Online"
                      : friend.status === "away"
                        ? "Away"
                        : `Last seen ${friend.lastSeen}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[70%] ${msg.senderId === currentUserId ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {msg.senderId !== currentUserId && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {friend.firstName[0]}
                          {friend.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`rounded-lg px-4 py-2 ${
                        msg.senderId === currentUserId
                          ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                          : "bg-white border shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.senderId === currentUserId ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="border-t bg-white rounded-b-lg p-4">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <ImageIcon className="h-4 w-4" />
              </Button>

              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />

              <Button size="sm" variant="outline">
                <Smile className="h-4 w-4" />
              </Button>

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
      </main>
    </div>
  )
}
