"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Award,
  Users,
  UserPlus,
  Calendar,
  Sparkles,
  Trophy,
  Target,
} from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function CommunityHub() {
  const [openCommentId, setOpenCommentId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [postComments, setPostComments] = useState<{ [key: number]: { text: string; author: string; date: string; time: string }[] }>({})

  const handleToggleComment = (postId: number) => {
    setOpenCommentId(openCommentId === postId ? null : postId)
    setCommentText("")
  }

  const handlePostComment = (e: React.FormEvent, postId: number) => {
    e.preventDefault()
    if (commentText.trim()) {
      const now = new Date()
      const date = now.toLocaleDateString()
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setPostComments((prev) => ({
        ...prev,
        [postId]: prev[postId]
          ? [...prev[postId], { text: commentText.trim(), author: "John Doe", date, time }]
          : [{ text: commentText.trim(), author: "John Doe", date, time }],
      }))
      setCommentText("")
      // Do not close the comment box after posting
    }
  }
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "MIT",
      major: "Computer Science",
      time: "2 hours ago",
      content:
        "Just completed my first machine learning project! Built a sentiment analysis model that achieved 94% accuracy. The journey from data preprocessing to model deployment was incredible. Special thanks to my study group for the support! 🚀",
      likes: 42,
      comments: 8,
      shares: 3,
      tags: ["MachineLearning", "AI", "Python"],
      achievement: "First ML Project",
    },
    {
      id: 2,
      author: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "Stanford",
      major: "Data Science",
      time: "4 hours ago",
      content:
        "Looking for teammates for the upcoming Google Summer of Code! I'm working on an open-source data visualization library. Need frontend developers and UX designers. Let's build something amazing together!",
      likes: 28,
      comments: 15,
      shares: 7,
      tags: ["GSoC", "OpenSource", "DataViz", "TeamUp"],
      achievement: null,
    },
    {
      id: 3,
      author: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "Harvard",
      major: "Psychology",
      time: "6 hours ago",
      content:
        'Excited to share that our research paper on "Digital Wellness in University Students" has been accepted for publication! This wouldn\'t have been possible without the amazing collaboration with students from 5 different universities.',
      likes: 67,
      comments: 12,
      shares: 9,
      tags: ["Research", "Psychology", "DigitalWellness"],
      achievement: "Published Research",
    },
  ])

  const [newPost, setNewPost] = useState("")

  const friendSuggestions = [
    {
      name: "Lisa Wang",
      university: "MIT",
      major: "Computer Science",
      mutualFriends: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "David Kim",
      university: "Stanford",
      major: "Data Science",
      mutualFriends: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Maria Garcia",
      university: "Harvard",
      major: "Psychology",
      mutualFriends: 7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const trendingTopics = [
    { topic: "#MachineLearning", posts: 234 },
    { topic: "#Hackathon2024", posts: 189 },
    { topic: "#StudyTips", posts: 156 },
    { topic: "#OpenSource", posts: 143 },
    { topic: "#Research", posts: 98 },
  ]

  const upcomingEvents = [
    {
      title: "AI/ML Workshop",
      date: "Dec 25",
      attendees: 45,
      type: "workshop",
    },
    {
      title: "Hackathon Registration",
      date: "Dec 28",
      attendees: 120,
      type: "hackathon",
    },
    {
      title: "Study Group Meetup",
      date: "Dec 30",
      attendees: 15,
      type: "study",
    },
  ]

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "Your University",
        major: "Computer Science",
        time: "Just now",
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        tags: [],
        achievement: null,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Friend Suggestions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserPlus className="h-5 w-5 text-blue-500" />
                  Friend Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {friendSuggestions.map((friend, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {friend.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{friend.name}</p>
                      <p className="text-xs text-slate-500">{friend.university}</p>
                      <p className="text-xs text-slate-400">{friend.mutualFriends} mutual friends</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-teal-500" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((trend, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between hover:bg-slate-50 p-2 rounded-lg cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-blue-600">{trend.topic}</p>
                      <p className="text-xs text-slate-500">{trend.posts} posts</p>
                    </div>
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-slate-900">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.date}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Users className="h-3 w-3" />
                      {event.attendees} attending
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Community Hub
                </h1>
                <p className="text-slate-600">Connect, share, and grow with fellow students</p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="bg-transparent border-blue-200">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent border-blue-200">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Create Post */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-500" />
                  Share Your Achievement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="What's your latest achievement or project? Share it with the community..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px] border-slate-200 focus:border-blue-300"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Add Tags
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Add Achievement
                        </Button>
                      </div>
                      <Button
                        onClick={handleCreatePost}
                        className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                      >
                        Share Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feed Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  All Posts
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6 mt-6">
                {posts.map((post) => (
                  <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-200">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-slate-900">{post.author}</h3>
                                {post.achievement && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                    <Trophy className="h-3 w-3 mr-1" />
                                    {post.achievement}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600">
                                {post.university} • {post.major}
                              </p>
                            </div>
                            <span className="text-sm text-slate-500">{post.time}</span>
                          </div>

                          <p className="text-slate-800 leading-relaxed">{post.content}</p>

                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-6">
                              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-red-500">
                                <Heart className="h-4 w-4 mr-1" />
                                {post.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-600 hover:text-blue-500"
                                onClick={() => handleToggleComment(post.id)}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Comment
                              </Button>
                              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-green-500">
                                <Share2 className="h-4 w-4 mr-1" />
                                {post.shares}
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-500">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>

                          {openCommentId === post.id && (
                            <div className="mt-4 space-y-2">
                              <div
                                className={
                                  (postComments[post.id]?.length ?? 0) > 0
                                    ? "max-h-40 overflow-y-auto border rounded-lg p-2 bg-slate-50 mb-2"
                                    : "mb-2"
                                }
                                style={{ scrollbarWidth: 'thin', scrollbarColor: '#38bdf8 #f1f5f9' }}
                              >
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
                                <Textarea
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6 mt-6">
                {posts
                  .filter((post) => post.achievement)
                  .map((post) => (
                    <Card
                      key={post.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-400"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 ring-2 ring-yellow-200">
                            <AvatarImage src={post.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-slate-900">{post.author}</h3>
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                    <Trophy className="h-3 w-3 mr-1" />
                                    {post.achievement}
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-600">
                                  {post.university} • {post.major}
                                </p>
                              </div>
                              <span className="text-sm text-slate-500">{post.time}</span>
                            </div>

                            <p className="text-slate-800 leading-relaxed">{post.content}</p>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                              <div className="flex items-center gap-6">
                                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-red-500">
                                  <Heart className="h-4 w-4 mr-1" />
                                  {post.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-500">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  {post.comments}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="projects" className="space-y-6 mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Target className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Project Posts</h3>
                    <p className="text-slate-600 mb-6">Posts about projects and collaborations will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="following" className="space-y-6 mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Following Feed</h3>
                    <p className="text-slate-600 mb-6">Posts from people you follow will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
