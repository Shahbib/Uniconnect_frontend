"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Save, User, Settings, Trophy, BookOpen, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicUrl, setProfilePicUrl] = useState("/placeholder.svg?height=96&width=96");
  const [uploading, setUploading] = useState(false);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    university: "MIT",
    major: "Computer Science",
    year: "Senior",
    bio: "Passionate computer science student with interests in machine learning and web development. Always eager to learn new technologies and collaborate on innovative projects.",
    location: "Cambridge, MA",
    website: "https://johndoe.dev",
    github: "johndoe",
    linkedin: "john-doe",
  });

  // Store profile data and picture in localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("profileData", JSON.stringify(profileData));
    }
  }, [profileData]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("profilePicUrl", profilePicUrl);
    }
  }, [profilePicUrl]);

  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "Python",
    "Machine Learning",
    "Node.js",
    "MongoDB",
    "AWS",
    "Git",
  ])

  const [interests, setInterests] = useState([
    "Web Development",
    "Artificial Intelligence",
    "Data Science",
    "Open Source",
    "Startups",
    "Research",
  ])

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Save profile data
    console.log("Saving profile data:", profileData)
    // Show success message
  }

  const achievements = [
    {
      title: "First ML Project",
      description: "Completed first machine learning project with 94% accuracy",
      date: "Dec 2024",
      icon: Trophy,
    },
    {
      title: "Study Material Contributor",
      description: "Shared 10+ study materials with the community",
      date: "Nov 2024",
      icon: BookOpen,
    },
    {
      title: "Team Player",
      description: "Successfully completed 3 team projects",
      date: "Oct 2024",
      icon: Users,
    },
  ]

  const stats = [
    { label: "Posts Created", value: "24" },
    { label: "Teams Joined", value: "3" },
    { label: "Materials Shared", value: "12" },
    { label: "Reputation Points", value: "1,247" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-slate-600 mt-2">Manage your account information and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            {/* Profile Picture */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-6">
                <Avatar className="h-24 w-24 ring-4 ring-blue-200">
                  <AvatarImage src={profilePicUrl} />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 relative"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Change Picture"}
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={async (e) => {
                      const file = e.target.files && e.target.files[0];
                      if (!file) return;
                      setUploading(true);
                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const token = localStorage.getItem("token");
                        const res = await fetch("http://localhost:9000/student/profile-picture", {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${token}`
                          },
                          body: formData
                        });
                        const data = await res.json();
                        if (data.success && data.user && data.user.profilePictureUrl) {
                          setProfilePicUrl(data.user.profilePictureUrl);
                        } else {
                          alert(data.message || "Failed to upload profile picture");
                        }
                      } catch (err) {
                        alert("Error uploading profile picture");
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                  <p className="text-sm text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="userName">User Name</Label>
                    <Input
                      id="userName"
                      value={profileData.firstName + ' ' + profileData.lastName}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="universityEmail">University Email</Label>
                    <Input
                      id="universityEmail"
                      type="email"
                      value={profileData.email}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Select
                      value={profileData.university}
                      onValueChange={(value) => handleInputChange("university", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DU">DU</SelectItem>
                        <SelectItem value="RMSTU">RMSTU</SelectItem>
                        <SelectItem value="UIU">UIU</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Major</Label>
                    <Input
                      id="major"
                      value={profileData.major}
                      onChange={(e) => handleInputChange("major", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Connect your social profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={profileData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      placeholder="username"
                      value={profileData.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      value={profileData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
                <CardDescription>Showcase your skills and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-3 ml-1 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                    onClick={() => setShowSkillInput((v) => !v)}
                    title="Add Skill"
                  >
                    <span className="text-xl leading-none">+</span>
                  </button>
                  {showSkillInput && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm"
                        placeholder="Enter skill"
                        value={newSkill}
                        autoFocus
                        onChange={e => setNewSkill(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && newSkill.trim()) {
                            setSkills(prev => [...prev, newSkill.trim()]);
                            setNewSkill("");
                            setShowSkillInput(false);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          if (newSkill.trim()) {
                            setSkills(prev => [...prev, newSkill.trim()]);
                            setNewSkill("");
                            setShowSkillInput(false);
                          }
                        }}
                      >Add</Button>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-base font-medium">Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-3 ml-1 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                    onClick={() => setShowInterestInput((v) => !v)}
                    title="Add Interest"
                  >
                    <span className="text-xl leading-none">+</span>
                  </button>
                  {showInterestInput && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm"
                        placeholder="Enter interest"
                        value={newInterest}
                        autoFocus
                        onChange={e => setNewInterest(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && newInterest.trim()) {
                            setInterests(prev => [...prev, newInterest.trim()]);
                            setNewInterest("");
                            setShowInterestInput(false);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          if (newInterest.trim()) {
                            setInterests(prev => [...prev, newInterest.trim()]);
                            setNewInterest("");
                            setShowInterestInput(false);
                          }
                        }}
                      >Add</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6 mt-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{achievement.title}</h3>
                      <p className="text-sm text-slate-600">{achievement.description}</p>
                    </div>
                    <Badge variant="outline">{achievement.date}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Settings Coming Soon</h3>
                  <p className="text-slate-600">Advanced settings and preferences will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
