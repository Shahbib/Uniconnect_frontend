// Core Types
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  university: string
  major: string
  year: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  skills: string[]
  interests: string[]
  reputation: number
  level: number
  xp: number
}

export interface Post {
  id: number
  author: string
  authorAvatar: string
  university: string
  major: string
  time: string
  content: string
  likes: number
  comments: number
  shares: number
  tags: string[]
  achievement?: string
}

export interface Team {
  id: number
  name: string
  description: string
  leader: string
  members: number
  maxMembers: number
  skills: string[]
  location: string
  deadline: string
  type: "Hackathon" | "Research" | "Startup" | "Study Group"
  avatar: string
  status: "Active" | "Completed" | "Recruiting"
  lastActivity: string
  role?: string
}

export interface StudyMaterial {
  id: number
  title: string
  subject: string
  course: string
  author: string
  authorAvatar: string
  university: string
  type: "PDF" | "Video" | "Image" | "Document"
  pages?: number
  duration?: string
  rating: number
  downloads: number
  views: number
  comments: number
  likes: number
  uploadDate: string
  tags: string[]
  aiScore: number
  description: string
  verified: boolean
}

export interface Residence {
  id: number
  title: string
  location: string
  distance: string
  price: number
  type: "Apartment" | "House" | "Studio" | "Room"
  bedrooms: number
  bathrooms: number
  amenities: string[]
  images: string[]
  owner: string
  ownerAvatar: string
  university: string
  rating: number
  reviews: number
  description: string
  availableFrom: string
  posted: string
  verified: boolean
  lookingFor: string
}

export interface Roommate {
  id: number
  name: string
  university: string
  major: string
  year: string
  budget: string
  location: string
  preferences: string[]
  interests: string[]
  avatar: string
  rating: number
  bio: string
  verified: boolean
  lookingFor: string
}
