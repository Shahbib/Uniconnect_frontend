"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, MessageCircle, Users, Clock, Check, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/common/search-bar"
import Link from "next/link"

interface Friend {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  university: string
  major: string
  year: string
  status: "online" | "offline" | "away"
  lastSeen: string
  friendSince: string
}

interface FriendRequest {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  senderUniversity: string
  senderMajor: string
  sentAt: string
}

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [addFriendEmail, setAddFriendEmail] = useState("")
  const [addFriendSearch, setAddFriendSearch] = useState("")
  const [friendSuggestions, setFriendSuggestions] = useState([
    {
      id: "4",
      name: "Lisa Wang",
      university: "MIT",
      major: "Computer Science",
      mutualFriends: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "David Kim",
      university: "Stanford",
      major: "Data Science",
      mutualFriends: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "Maria Garcia",
      university: "Harvard",
      major: "Psychology",
      mutualFriends: 7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@mit.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "MIT",
      major: "Computer Science",
      year: "Junior",
      status: "online",
      lastSeen: "now",
      friendSince: "2024-01-15",
    },
    {
      id: "2",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob.smith@stanford.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "Stanford",
      major: "Data Science",
      year: "Senior",
      status: "away",
      lastSeen: "5 minutes ago",
      friendSince: "2024-02-20",
    },
    {
      id: "3",
      firstName: "Carol",
      lastName: "Davis",
      email: "carol.davis@berkeley.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "UC Berkeley",
      major: "Mathematics",
      year: "Sophomore",
      status: "offline",
      lastSeen: "2 hours ago",
      friendSince: "2024-03-10",
    },
  ])

  const friendRequests: FriendRequest[] = [
    {
      id: "1",
      senderId: "4",
      senderName: "David Wilson",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      senderUniversity: "Harvard",
      senderMajor: "Physics",
      sentAt: "2024-01-20",
    },
    {
      id: "2",
      senderId: "5",
      senderName: "Emma Brown",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      senderUniversity: "Yale",
      senderMajor: "Chemistry",
      sentAt: "2024-01-19",
    },
  ]

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

  const filteredFriends = friends.filter(
    (friend) =>
      `${friend.firstName} ${friend.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.major.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredSuggestions = friendSuggestions.filter(
    (user) =>
      user.name.toLowerCase().includes(addFriendSearch.toLowerCase()) ||
      user.university.toLowerCase().includes(addFriendSearch.toLowerCase()) ||
      user.major.toLowerCase().includes(addFriendSearch.toLowerCase())
  );

  const handleAddFriend = () => {
    if (addFriendEmail.trim()) {
      console.log("Sending friend request to:", addFriendEmail)
      setAddFriendEmail("")
    }
  }

  const handleAcceptRequest = (requestId: string) => {
    console.log("Accepting friend request:", requestId)
  }

  const handleRejectRequest = (requestId: string) => {
    console.log("Rejecting friend request:", requestId)
  }

  const handleAddSuggestedFriend = (user: {
    id: string;
    name: string;
    university: string;
    major: string;
    mutualFriends: number;
    avatar: string;
  }) => {
    setFriendSuggestions((prev) => prev.filter((u) => u.id !== user.id));
    setFriends((prev) => [
      ...prev,
      {
        id: user.id,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        email: "",
        avatar: user.avatar,
        university: user.university,
        major: user.major,
        year: "",
        status: "online",
        lastSeen: "now",
        friendSince: new Date().toISOString().slice(0, 10),
      },
    ])
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Friends
          </h1>
          <p className="text-slate-600 mt-2">Connect and chat with your university friends</p>
        </div>

        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              My Friends ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Requests ({friendRequests.length})
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Friends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="mt-6">
            <div className="space-y-6">
              {/* Search */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <SearchBar
                    placeholder="Search friends by name, university, or major..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                </CardContent>
              </Card>

              {/* Friends List */}
              <div className="grid gap-4">
                {filteredFriends.map((friend) => (
                  <Card key={friend.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {friend.firstName[0]}
                                {friend.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(friend.status)}`}
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">
                              {friend.firstName} {friend.lastName}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {friend.major} • {friend.year} at {friend.university}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {friend.status === "online"
                                  ? "Online"
                                  : friend.status === "away"
                                    ? "Away"
                                    : `Last seen ${friend.lastSeen}`}
                              </Badge>
                              <span className="text-xs text-slate-500">
                                Friends since {new Date(friend.friendSince).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link href={`/friends/${friend.id}/chat`}>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Chat
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredFriends.length === 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No friends found</h3>
                      <p className="text-slate-600">
                        {searchQuery ? "Try adjusting your search terms" : "Start by adding some friends!"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <div className="space-y-4">
              {friendRequests.map((request) => (
                <Card key={request.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.senderAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {request.senderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold text-slate-900">{request.senderName}</h3>
                          <p className="text-sm text-slate-600">
                            {request.senderMajor} at {request.senderUniversity}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Sent {new Date(request.sentAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAcceptRequest(request.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectRequest(request.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {friendRequests.length === 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
                    <p className="text-slate-600">You're all caught up with friend requests!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Add New Friend</CardTitle>
                <CardDescription>Search and add registered users to your friends list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SearchBar
                  placeholder="Search users by name, university, or major..."
                  value={addFriendSearch}
                  onChange={setAddFriendSearch}
                />
                <div className="grid gap-4">
                  {filteredSuggestions.map((user) => (
                    <Card key={user.id} className="border-0 shadow hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.university}</p>
                          <p className="text-xs text-slate-400">{user.major}</p>
                          <p className="text-xs text-slate-400">{user.mutualFriends} mutual friends</p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                          onClick={() => handleAddSuggestedFriend(user)}
                        >
                          Add
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredSuggestions.length === 0 && (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-8 text-center">
                        <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No users found</h3>
                        <p className="text-slate-600">Try adjusting your search terms</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
