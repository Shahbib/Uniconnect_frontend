"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  MessageSquare,
  Trophy,
  Home,
  TrendingUp,
  Plus,
  Star,
  Calendar,
  Target,
  Edit,
  Settings,
  Eye,
  ThumbsUp,
  Share2,
  LogIn,
} from "lucide-react"
import { TeamCard } from "@/components/common/team-card"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function Dashboard() {
  // Demo: local comments per post (replace with backend integration as needed)
  type Comment = {
    text: string;
    author: string;
    date: string;
    time: string;
  };
  const [postComments, setPostComments] = useState<{ [key: number]: Comment[] }>({
    1: [
      { text: "Great job!", author: "Alex Chen", date: "2025-07-21", time: "10:15" },
      { text: "Impressive accuracy.", author: "Sarah Kim", date: "2025-07-21", time: "11:00" },
      { text: "Can you share the code?", author: "Mike Johnson", date: "2025-07-21", time: "12:30" }
    ],
    2: [
      { text: "I'm interested!", author: "Emma Davis", date: "2025-07-20", time: "09:45" },
      { text: "Frontend here.", author: "John Doe", date: "2025-07-20", time: "10:10" },
      { text: "Let's connect.", author: "Alex Chen", date: "2025-07-20", time: "10:30" }
    ],
    3: [
      { text: "Thanks for sharing!", author: "Sarah Kim", date: "2025-07-19", time: "14:00" },
      { text: "Very helpful.", author: "Mike Johnson", date: "2025-07-19", time: "14:15" },
      { text: "Can you upload more notes?", author: "Emma Davis", date: "2025-07-19", time: "15:00" },
      { text: "Awesome!", author: "John Doe", date: "2025-07-19", time: "15:30" },
      { text: "Love this!", author: "Alex Chen", date: "2025-07-19", time: "16:00" },
      { text: "Super useful.", author: "Sarah Kim", date: "2025-07-19", time: "16:30" }
    ]
  });

  // Add new comment to post
  const handlePostComment = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    if (commentText.trim()) {
      const now = new Date();
      const date = now.toISOString().slice(0, 10);
      const time = now.toTimeString().slice(0, 5);
      setPostComments((prev) => ({
        ...prev,
        [postId]: prev[postId]
          ? [...prev[postId], { text: commentText.trim(), author: "John Doe", date, time }]
          : [{ text: commentText.trim(), author: "John Doe", date, time }]
      }));
    }
    setOpenCommentId(null);
    setCommentText("");
    // Optionally show a toast or feedback
  };
  const [activeTab, setActiveTab] = useState("overview")
  const [openCommentId, setOpenCommentId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")

  const handleToggleComment = (postId: number) => {
    setOpenCommentId(openCommentId === postId ? null : postId)
    setCommentText("")
  }


  const stats = [
    { label: "Posts Created", value: "24", icon: MessageSquare, color: "bg-blue-500" },
    { label: "Teams Joined", value: "3", icon: Users, color: "bg-teal-500" },
    { label: "Materials Shared", value: "12", icon: BookOpen, color: "bg-purple-500" },
    { label: "Achievements", value: "8", icon: Trophy, color: "bg-cyan-500" },
  ]

  const myPosts = [
    {
      id: 1,
      content: "Just completed my machine learning project! Built a sentiment analysis model with 94% accuracy 🚀",
      likes: 42,
      comments: 8,
      shares: 3,
      time: "2 hours ago",
      tags: ["MachineLearning", "AI", "Python"],
    },
    {
      id: 2,
      content: "Looking for teammates for the upcoming hackathon. Need frontend developers and designers!",
      likes: 28,
      comments: 15,
      shares: 7,
      time: "1 day ago",
      tags: ["Hackathon", "TeamUp", "Frontend"],
    },
    {
      id: 3,
      content: "Sharing my notes on Data Structures and Algorithms. Hope it helps fellow students!",
      likes: 67,
      comments: 12,
      shares: 23,
      time: "3 days ago",
      tags: ["DataStructures", "StudyNotes", "Algorithms"],
    },
  ]

  const myTeams = [
    {
      id: 1,
      name: "AI Healthcare Project",
      members: 4,
      role: "Team Lead",
      status: "Active",
      lastActivity: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Web Dev Study Group",
      members: 8,
      role: "Member",
      status: "Active",
      lastActivity: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Hackathon Team Alpha",
      members: 5,
      role: "Developer",
      status: "Completed",
      lastActivity: "1 week ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const myMaterials = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      type: "PDF",
      downloads: 234,
      views: 1567,
      rating: 4.8,
      uploadDate: "1 week ago",
    },
    {
      id: 2,
      title: "React Hooks Complete Guide",
      type: "PDF",
      downloads: 189,
      views: 892,
      rating: 4.6,
      uploadDate: "2 weeks ago",
    },
    {
      id: 3,
      title: "Data Structures Cheat Sheet",
      type: "PDF",
      downloads: 456,
      views: 2341,
      rating: 4.9,
      uploadDate: "3 weeks ago",
    },
  ]

  const recentActivity = [
    {
      user: "Alex Chen",
      action: "liked your post about ML project",
      time: "2 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      user: "Sarah Kim",
      action: "joined your hackathon team",
      time: "4 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      user: "Mike Johnson",
      action: "downloaded your study material",
      time: "6 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      user: "Emma Davis",
      action: "commented on your post",
      time: "8 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const upcomingEvents = [
    { title: "Team Meeting - AI Project", date: "Today, 3:00 PM", type: "meeting" },
    { title: "Hackathon Submission", date: "Tomorrow", type: "deadline" },
    { title: "Study Group Session", date: "Dec 22", type: "study" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-4 ring-blue-200">
              <AvatarImage src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Welcome back, John! 👋
              </h1>
              <p className="text-slate-600">Computer Science • MIT • Senior</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/friends">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                <Users className="h-4 w-4" />
                Friend
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color} text-white`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.color}`}></div>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="teams">My Teams</TabsTrigger>
            <TabsTrigger value="materials">My Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Target className="h-5 w-5 text-blue-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/community">
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                  </Link>
                  <Link href="/teammates">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-teal-200 hover:bg-teal-50 bg-transparent"
                    >
                      <Users className="h-4 w-4 mr-2 text-teal-500" />
                      Find Teammates
                    </Button>
                  </Link>
                  <Link href="/study-materials">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                    >
                      <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                      Upload Notes
                    </Button>
                  </Link>
                  <Link href="/residence">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-cyan-200 hover:bg-cyan-50 bg-transparent"
                    >
                      <Home className="h-4 w-4 mr-2 text-cyan-500" />
                      Find Roommate
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <TrendingUp className="h-5 w-5 text-teal-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          event.type === "deadline"
                            ? "bg-red-500"
                            : event.type === "study"
                              ? "bg-blue-500"
                              : "bg-green-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{event.title}</p>
                        <p className="text-xs text-slate-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Skills Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Your Learning Progress
                </CardTitle>
                <CardDescription>Track your skill development and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { skill: "JavaScript", progress: 85, level: "Advanced" },
                    { skill: "React", progress: 70, level: "Intermediate" },
                    { skill: "Data Structures", progress: 60, level: "Intermediate" },
                    { skill: "Machine Learning", progress: 40, level: "Beginner" },
                    { skill: "System Design", progress: 30, level: "Beginner" },
                    { skill: "Database Design", progress: 75, level: "Advanced" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">{item.skill}</span>
                        <Badge
                          variant={
                            item.level === "Advanced"
                              ? "default"
                              : item.level === "Intermediate"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {item.level}
                        </Badge>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                      <p className="text-xs text-slate-500">{item.progress}% complete</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">My Posts</h2>
              <Link href="/community">
                <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Post
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {myPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-slate-800 leading-relaxed">{post.content}</p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1 text-slate-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <MessageSquare className="h-4 w-4 cursor-pointer" onClick={() => handleToggleComment(post.id)} />
                            <span className="text-sm">{postComments[post.id]?.length ?? post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm">{post.shares}</span>
                          </div>
                        </div>
                        <span className="text-sm text-slate-500">{post.time}</span>
                      </div>

                      {openCommentId === post.id && (
                        <div className="mt-4 border-t pt-4">
                          {/* Comments display section */}
                          <div className={
                            (postComments[post.id]?.length ?? 0) > 3
                              ? "max-h-32 overflow-y-auto border rounded-lg p-2 bg-slate-50 mb-2"
                              : "mb-2"
                          }>
                            {(postComments[post.id] ?? []).length === 0 ? (
                              <p className="text-sm text-slate-400">No comments yet.</p>
                            ) : (
                              (postComments[post.id] ?? []).map((comment, idx) => (
                                <div key={idx} className="py-1 px-2 text-sm text-slate-700 border-b last:border-b-0 flex flex-col relative">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-blue-700">{comment.author}</span>
                                    <span className="text-xs text-slate-400 absolute right-0 top-0">{comment.date} {comment.time}</span>
                                  </div>
                                  <span className="mt-1">{comment.text}</span>
                                </div>
                              ))
                            )}
                          </div>
                          <form onSubmit={(e) => handlePostComment(e, post.id)} className="space-y-2">
                            <textarea
                              className="w-full border rounded-lg p-2 text-sm"
                              rows={2}
                              placeholder="Write a comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              maxLength={220}
                            />
                            <div className="flex justify-end gap-2">
                              <Button type="button" variant="outline" size="sm" onClick={() => handleToggleComment(post.id)}>
                                Cancel
                              </Button>
                              <Button type="submit" size="sm" className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                                Post Comment
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="teams" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">My Teams</h2>
              <Link href="/teammates">
                <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Join New Team
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">My Study Materials</h2>
              <Link href="/study-materials">
                <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Material
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myMaterials.map((material) => (
                <Card key={material.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{material.title}</h3>
                          <p className="text-sm text-slate-600">{material.type}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{material.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {material.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {material.downloads}
                          </div>
                        </div>
                        <span className="text-xs">{material.uploadDate}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
