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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Camera, Save, User, Settings, Trophy, BookOpen, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ProfilePage() {
  const stats = [
    { label: "Posts Created", value: "24" },
    { label: "Teams Joined", value: "3" },
    { label: "Materials Shared", value: "12" },
    { label: "Reputation Points", value: "1,247" },
  ];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicUrl, setProfilePicUrl] = useState("/placeholder.svg?height=96&width=96");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    studentEmail: "",
    username: "",
    email: "",
    university: "",
    major: "",
    location: "",
    bio: "",
    website: "",
    github: "",
    linkedin: "",
    dateOfBirth: "",
    profilePictureUrl: "",
    profilePicturePublicId: "",
    interests: [] as string[],
    skills: [] as string[],
    createdAt: "",
    role: "",
    isVerified: false,
    studentAccountVerified: false,
    phoneNumber: "",
  });

  // Fetch profile data from backend and auto-fill all fields
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
    fetch("http://localhost:9000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `query GetCurrentUser { getCurrentUser { id email firstName lastName username phoneNumber profilePictureUrl profilePicturePublicId dateOfBirth bio location role isVerified studentAccountVerified studentEmail university major website linkedin github interests skills createdAt } }`,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Profile fetch response:", data);
        if (data.data && data.data.getCurrentUser) {
          const user = data.data.getCurrentUser;
          setProfileData(prev => ({
            ...prev,
            ...user,
            username: user.username || "",
            interests: Array.isArray(user.interests) ? user.interests : [],
            skills: Array.isArray(user.skills) ? user.skills : [],
            phoneNumber: user.phoneNumber || "",
          }));
          if (user.profilePictureUrl) {
            setProfilePicUrl(user.profilePictureUrl);
          }
        } else if (data.errors) {
          alert(data.errors[0]?.message || "Failed to fetch profile.");
        }
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        alert("Error fetching profile. Please try again.");
      });
  }, []);

  // Store profile data and picture in localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("profileData", JSON.stringify(profileData));
      if (profileData.profilePictureUrl) {
        localStorage.setItem("profilePicUrl", profileData.profilePictureUrl);
      }
    }
  }, [profileData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("profilePicUrl", profilePicUrl);
    }
  }, [profilePicUrl]);

  // Use backend skills/interests for UI
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    setSkills(Array.isArray(profileData.skills) ? profileData.skills : []);
    setInterests(Array.isArray(profileData.interests) ? profileData.interests : []);
  }, [profileData.skills, profileData.interests]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const input = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      university: profileData.university,
      major: profileData.major,
      location: profileData.location,
      bio: profileData.bio,
      website: profileData.website,
      github: profileData.github,
      linkedin: profileData.linkedin,
      // // dateOfBirth: profileData.dateOfBirth,
      // interests: Array.isArray(profileData.interests) ? profileData.interests : [],
      // skills: Array.isArray(profileData.skills) ? profileData.skills : [],
    };
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
    try {
      const res = await fetch("http://localhost:9000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `mutation UpdateUserProfile($input: UserProfileInput!) { updateUserProfile(input: $input) { id email firstName lastName phoneNumber bio dateOfBirth university major website linkedin github location interests skills } }`,
          variables: { input },
        }),
      });
      const data = await res.json();
      console.log("Mutation response:", data); // Debug log full response
      if (data.data && data.data.updateUserProfile) {
        setProfileData(prev => ({ ...prev, ...data.data.updateUserProfile }));
        alert("Profile updated successfully!");
      } else {
        console.error(data.errors); // Debug log errors
        alert(data.errors?.[0]?.message || "Failed to update profile.");
      }
    } catch (error) {
      alert("Failed to update profile. Please try again.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Sync skills and interests to profileData
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setProfileData(prev => ({ ...prev, skills: updatedSkills }));
      setNewSkill("");
      setShowSkillInput(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      const updatedInterests = [...interests, newInterest.trim()];
      setInterests(updatedInterests);
      setProfileData(prev => ({ ...prev, interests: updatedInterests }));
      setNewInterest("");
      setShowInterestInput(false);
    }
  };

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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
                            Authorization: `Bearer ${token}`,
                          },
                          body: formData,
                        });
                        const data = await res.json();
                        if (data.success && data.user && data.user.profilePictureUrl) {
                          setProfilePicUrl(data.user.profilePictureUrl);
                          setProfileData(prev => ({ ...prev, profilePictureUrl: data.user.profilePictureUrl }));
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
                  <Label htmlFor="universityEmail">University Email</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="universityEmail"
                      type="email"
                      value={profileData.studentEmail || ""}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed flex-1"
                    />
                    {profileData.studentAccountVerified ? (
                      <>
                        <Badge className="bg-green-500 text-white">Verified</Badge>
                        <Button size="icon" disabled className="bg-green-500 hover:bg-green-600 text-white rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge className="bg-yellow-400 text-white">Not Verified</Badge>
                        <Button size="icon" disabled className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 17a5 5 0 100-10 5 5 0 000 10z" />
                          </svg>
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username || ""}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
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
                    <Label htmlFor="github">GitHub Username</Label>
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
                    className="mt-3 ml-1 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                    disabled={saving}
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
                            handleAddSkill();
                          }
                        }}
                      />
                      <Button size="sm" onClick={handleAddSkill}>Add</Button>
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
                            handleAddInterest();
                          }
                        }}
                      />
                      <Button size="sm" onClick={handleAddInterest}>Add</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 flex items-center"
                disabled={saving}
              >
                {saving ? (
                  <span className="mr-2 animate-spin inline-block">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  </span>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {saving ? "Saving..." : "Save Changes"}
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
            {/* Student Email Verification Box */}
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle>Verify Student Email</CardTitle>
                <CardDescription>Enter your university email to verify your student status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <Input
                    type="email"
                    placeholder="Enter your .edu email"
                    value={profileData.studentEmail || ""}
                    onChange={e => setProfileData(prev => ({ ...prev, studentEmail: e.target.value }))}
                    className="flex-1"
                    disabled={profileData.studentAccountVerified}
                    readOnly={profileData.studentAccountVerified}
                  />
                  {profileData.studentAccountVerified ? (
                    <Button disabled className="bg-green-500 text-white">Verified</Button>
                  ) : (
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                      onClick={async () => {
                        const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
                        try {
                          const formData = new URLSearchParams();
                          formData.append("studentEmail", profileData.studentEmail || "");
                          const res = await fetch("http://localhost:9000/student/verify-student-email", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/x-www-form-urlencoded",
                              Authorization: `Bearer ${token}`,
                            },
                            body: formData.toString(),
                          });
                          const data = await res.json();
                          if (data.success) {
                            alert("Student verification email sent. Please check your student email inbox.");
                          } else {
                            alert(data.message || "Verification failed.");
                          }
                        } catch {
                          alert("Verification failed. Please try again.");
                        }
                      }}
                    >Verify</Button>
                  )}
                </div>
              </CardContent>
            </Card>
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
  );
}