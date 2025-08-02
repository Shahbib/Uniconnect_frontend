"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Filter, MapPin, Clock, Star, Plus, MessageSquare, UserPlus, Settings } from "lucide-react"
import { TeamCard } from "@/components/common/team-card"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function TeammatesFinder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")

  const teams = [
    {
      id: 1,
      name: "AI Healthcare Hackathon",
      description:
        "Building an AI-powered diagnostic tool for early disease detection. Looking for ML engineers and healthcare domain experts.",
      leader: "Sarah Kim",
      members: 3,
      maxMembers: 5,
      skills: ["Machine Learning", "Python", "Healthcare", "TensorFlow"],
      location: "Boston, MA",
      deadline: "5 days left",
      type: "Hackathon",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Sustainable Tech Research",
      description:
        "Research project on renewable energy optimization using IoT sensors. Need embedded systems developers and data analysts.",
      leader: "Alex Chen",
      members: 2,
      maxMembers: 4,
      skills: ["IoT", "Data Analysis", "Embedded Systems", "Research"],
      location: "San Francisco, CA",
      deadline: "2 weeks left",
      type: "Research",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "EdTech Startup MVP",
      description:
        "Creating a personalized learning platform for K-12 students. Seeking frontend developers and UX designers.",
      leader: "Emma Davis",
      members: 4,
      maxMembers: 6,
      skills: ["React", "UX Design", "Education", "Node.js"],
      location: "New York, NY",
      deadline: "1 week left",
      type: "Startup",
      avatar: "/placeholder.svg?height=60&width=60",
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
      avatar: "/placeholder.svg?height=60&width=60",
      description: "Building an AI-powered diagnostic tool for early disease detection.",
    },
    {
      id: 2,
      name: "Web Dev Study Group",
      members: 8,
      role: "Member",
      status: "Active",
      lastActivity: "1 day ago",
      avatar: "/placeholder.svg?height=60&width=60",
      description: "Weekly study sessions on modern web development technologies.",
    },
    {
      id: 3,
      name: "Hackathon Team Alpha",
      members: 5,
      role: "Developer",
      status: "Completed",
      lastActivity: "1 week ago",
      avatar: "/placeholder.svg?height=60&width=60",
      description: "Successfully completed the university hackathon with 2nd place finish.",
    },
  ]

  const individuals = [
    {
      id: 1,
      name: "Michael Johnson",
      university: "MIT",
      major: "Computer Science",
      year: "Junior",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      interests: ["Web Development", "Cloud Computing", "Startups"],
      rating: 4.8,
      projects: 12,
      location: "Cambridge, MA",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Passionate full-stack developer with experience in building scalable web applications. Love working on innovative projects that solve real-world problems.",
    },
    {
      id: 2,
      name: "Lisa Wang",
      university: "Stanford",
      major: "Data Science",
      year: "Senior",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      interests: ["AI/ML", "Data Visualization", "Research"],
      rating: 4.9,
      projects: 8,
      location: "Palo Alto, CA",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Data science enthusiast with a strong background in machine learning and statistical analysis. Experienced in turning data into actionable insights.",
    },
    {
      id: 3,
      name: "David Rodriguez",
      university: "UC Berkeley",
      major: "Electrical Engineering",
      year: "Graduate",
      skills: ["Arduino", "C++", "IoT", "Circuit Design"],
      interests: ["Hardware", "IoT", "Robotics"],
      rating: 4.7,
      projects: 15,
      location: "Berkeley, CA",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Hardware engineer passionate about IoT and embedded systems. Love creating innovative solutions that bridge the physical and digital worlds.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Find Teammates
            </h1>
            <p className="text-slate-600">Connect with talented students for your next project</p>
          </div>

          <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
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
                    placeholder="Search teams, projects, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="ml">Machine Learning</SelectItem>
                  <SelectItem value="design">UI/UX Design</SelectItem>
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
        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Find Teams
            </TabsTrigger>
            <TabsTrigger value="my-teams" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              My Teams
            </TabsTrigger>
            <TabsTrigger value="individuals" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Find Individuals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams.map((team) => (
                <Card
                  key={team.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={team.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {team.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <p className="text-sm text-slate-600">Led by {team.leader}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          team.type === "Hackathon" ? "default" : team.type === "Research" ? "secondary" : "outline"
                        }
                      >
                        {team.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-700 text-sm leading-relaxed">{team.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {team.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {team.members}/{team.maxMembers} members
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {team.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock className="h-4 w-4" />
                        {team.deadline}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                        Join Team
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-teams" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">My Teams</h2>
              <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                <Plus className="h-4 w-4 mr-2" />
                Create New Team
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="individuals" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {individuals.map((person) => (
                <Card
                  key={person.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{person.name}</h3>
                        <p className="text-sm text-slate-600">{person.university}</p>
                        <p className="text-sm text-slate-600">
                          {person.major} • {person.year}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">{person.bio}</p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-slate-800 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {person.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-slate-800 mb-2">Interests</h4>
                        <div className="flex flex-wrap gap-1">
                          {person.interests.map((interest, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {person.rating}
                      </div>
                      <div>{person.projects} projects</div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {person.location}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                        Invite
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
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
