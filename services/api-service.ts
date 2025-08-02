import type { User, Post, Team, StudyMaterial, Residence, Roommate } from "@/types"
import type { Course, AITest, Achievement, SkillProgress, LeaderboardUser } from "@/types/learning"

export class ApiService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

  private static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // User API
  static async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`)
  }

  static async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  // Posts API
  static async getPosts(): Promise<Post[]> {
    return this.request<Post[]>("/posts")
  }

  static async createPost(postData: Omit<Post, "id">): Promise<Post> {
    return this.request<Post>("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    })
  }

  // Teams API
  static async getTeams(): Promise<Team[]> {
    return this.request<Team[]>("/teams")
  }

  static async joinTeam(teamId: number, userId: string): Promise<void> {
    return this.request<void>(`/teams/${teamId}/join`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    })
  }

  // Study Materials API
  static async getStudyMaterials(): Promise<StudyMaterial[]> {
    return this.request<StudyMaterial[]>("/study-materials")
  }

  static async uploadStudyMaterial(materialData: Omit<StudyMaterial, "id">): Promise<StudyMaterial> {
    return this.request<StudyMaterial>("/study-materials", {
      method: "POST",
      body: JSON.stringify(materialData),
    })
  }

  // Residence API
  static async getResidences(): Promise<Residence[]> {
    return this.request<Residence[]>("/residences")
  }

  static async getRoommates(): Promise<Roommate[]> {
    return this.request<Roommate[]>("/roommates")
  }

  // Learning API
  static async getCourses(): Promise<Course[]> {
    return this.request<Course[]>("/courses")
  }

  static async getAITests(): Promise<AITest[]> {
    return this.request<AITest[]>("/ai-tests")
  }

  static async getAchievements(): Promise<Achievement[]> {
    return this.request<Achievement[]>("/achievements")
  }

  static async getSkillProgress(): Promise<SkillProgress[]> {
    return this.request<SkillProgress[]>("/skill-progress")
  }

  static async getLeaderboard(): Promise<LeaderboardUser[]> {
    return this.request<LeaderboardUser[]>("/leaderboard")
  }
}
