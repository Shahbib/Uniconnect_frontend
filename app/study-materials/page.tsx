"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Upload,
  Search,
  Filter,
  Star,
  Download,
  Eye,
  MessageSquare,
  ThumbsUp,
  Share2,
  FileText,
  Video,
  ImageIcon,
  Plus,
  Bot,
  Send,
  Paperclip,
  Sparkles,
  Brain,
  Lightbulb,
  Target,
  Trash,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import FileUploadModal from "../../components/file-upload-modal"



interface Upload {
  id: number
  title: string
  subject: string
  course_code: string
  description: string
  sizes: string[]
  uploadedAt: string
  tags?: string[]
  lastModified?: string
  images: string[] // array of image URLs
}

export default function StudyMaterials() {
  // State for all materials
  const [materials, setMaterials] = useState<any[]>([]);
  // Get email from localStorage (previous version, capital 'E')
  const email = typeof window !== "undefined" ? (localStorage.getItem("Email") || "") : "";

  // Fetch uploads from GraphQL API
  useEffect(() => {
    if (!email) return;
    const fetchUploads = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:9000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          query: `query GetNotesByEmail($email: String!) { getNotesByEmail(email: $email) { id title subject course_code tags description folder_id urls createdAt isFavorite score feedback } }`,
          variables: { email },
        }),
      });
      const data = await res.json();
      if (data?.data?.getNotesByEmail) {
        setMyUploads(data.data.getNotesByEmail);
      }
    };
    fetchUploads();
  }, [email]);
  const [searchTerm, setSearchTerm] = useState("")
  // Fetch notes from backend using searchNotes GraphQL
  useEffect(() => {
    const fetchNotes = async (keyword: string) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:9000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          query: `query SearchNotes($keyword: String!) { searchNotes(keyword: $keyword) { id email title subject course_code tags description folder_id urls createdAt isFavorite score feedback } }`,
          variables: { keyword },
        }),
      });
      const data = await res.json();
      if (data?.data?.searchNotes) {
        setMaterials(data.data.searchNotes);
      } else {
        setMaterials([]);
      }
    };

    fetchNotes(searchTerm);
  }, [searchTerm]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [myUploads, setMyUploads] = useState<Upload[]>([])
  const [favorites, setFavorites] = useState<any[]>([])

  // Fetch favorite notes from backend
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:9000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          query: `query { getFavoriteNotes { id email title subject course_code tags description folder_id urls createdAt isFavorite score feedback } }`,
        }),
      });
      const data = await res.json();
      if (data?.data?.getFavoriteNotes) {
        setFavorites(data.data.getFavoriteNotes);
      } else {
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, []);

  // Material type is not used directly, so removed for brevity
  const [deletingId, setDeletingId] = useState<number | null>(null);
  // Helper to fetch uploads (for refresh)
  const fetchUploads = async () => {
    if (!email) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const res = await fetch("http://localhost:9000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        query: `query GetNotesByEmail($email: String!) { getNotesByEmail(email: $email) { id title subject course_code tags description folder_id urls createdAt isFavorite score feedback } }`,
        variables: { email },
      }),
    });
    const data = await res.json();
    if (data?.data?.getNotesByEmail) {
      setMyUploads(data.data.getNotesByEmail);
    }
  };
  // removed duplicate materials declaration; using stateful version only


  const handleMaterialUpload = async (data: {
    title: string;
    subject: string;
    course_code: string;
    description: string;
    files: File[];
    tags?: string[];
  }) => {
  await new Promise((res) => setTimeout(res, 1200));
  // ...existing code for upload (simulate or real upload)...
  setUploadModalOpen(false);
  // Refresh uploads from backend after upload
  fetchUploads();
  };

  // Helper to check if a card is favorited (by backend favorites)
  const isFavorited = (id: number, type: 'material' | 'upload', folder_id?: string) => {
    // For backend favorites, match by folder_id if available, else by id
    return favorites.some(fav => (folder_id ? fav.folder_id === folder_id : fav.id === id));
  };

  // Add to favorites
  const handleAddFavorite = (item: any, type: 'material' | 'upload') => {
    if (!isFavorited(item.id, type)) {
      setFavorites(prev => [...prev, { ...item, type }]);
    }
  };

  // Remove from favorites (with backend call and loading state)
  const [removingFavoriteId, setRemovingFavoriteId] = useState<number | null>(null);
  const handleRemoveFavorite = async (id: number, type: 'material' | 'upload', folder_id?: string) => {
    const userEmail = typeof window !== "undefined" ? (localStorage.getItem("Email") || "") : "";
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!userEmail) {
      alert('No email found. Please log in.');
      return;
    }
    if (!folder_id) {
      alert('No folder_id found for this note.');
      return;
    }
    setRemovingFavoriteId(id);
    try {
      const res = await fetch('http://localhost:9000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          query: `mutation RemoveFromFavorites($email: String!, $folder_id: String!) { removeFromFavorites(email: $email, folder_id: $folder_id) }`,
          variables: { email: userEmail, folder_id },
        }),
      });
      if (res.status === 401) {
        alert('You are not authorized. Please log in.');
        setRemovingFavoriteId(null);
        return;
      }
      let data = null;
      try {
        data = await res.json();
      } catch (jsonErr) {
        alert('Server error: Invalid response.');
        setRemovingFavoriteId(null);
        return;
      }
      if (data?.data?.removeFromFavorites) {
        setFavorites(prev => prev.filter(fav => !(fav.id === id && fav.type === type)));
      } else if (data?.errors && data.errors[0]?.message) {
        alert('Backend error: ' + data.errors[0].message);
      } else {
        alert('Unknown backend error.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error: Failed to remove from favorites');
    } finally {
      setRemovingFavoriteId(null);
    }
  };

  // Pagination state
  const [browsePage, setBrowsePage] = useState(1);
  const [uploadsPage, setUploadsPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Helper to paginate
  function paginate(array: any[], page: number) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return array.slice(start, start + ITEMS_PER_PAGE);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Study Materials
            </h1>
            <p className="text-slate-600">Share and discover quality study resources</p>
          </div>

          <Button
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
        </div>


  {/* Tabs */}

        {/* Tabs */}
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Browse Materials
            </TabsTrigger>
            <TabsTrigger value="my-uploads" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              My Uploads
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6 mt-6">
            {/* Search box only */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search study materials, course_code, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paginate(materials, browsePage).map((material) => {
                function formatDate(dateString: string) {
                  const date = new Date(dateString);
                  if (isNaN(date.getTime())) return dateString;
                  return date.toLocaleDateString();
                }
                return (
                  <Card key={material.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {material.course_code} • {material.subject}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-700 leading-relaxed">{material.description}</p>

                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={material.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {material.author
                              ? material.author.split(" ").map((n: string) => n[0]).join("")
                              : "NA"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{material.author}</p>
                          <p className="text-xs text-slate-500">
                            {material.university} • {formatDate(material.uploadDate)}
                          </p>
                          <p className="text-xs text-slate-500">
                            Uploader: {material.email || "Unknown"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(material.tags) && material.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {typeof tag === 'string' ? tag.replace(/^["'{\[]+|["'}\]]+$/g, '') : tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {material.downloads}
                          </div>
                        </div>
                        {/* <div className="flex items-center gap-1">
                          <span className="text-xs">AI Score:</span>
                          <Badge variant="secondary">{material.aiScore}%</Badge>
                        </div> */}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        {/* add to favorite button */}
                        <Button
                          variant={isFavorited(material.id, 'material', material.folder_id) ? "default" : "outline"}
                          size="icon"
                          className={
                            "bg-transparent" +
                            (isFavorited(material.id, 'material', material.folder_id)
                              ? " animate-pulse"
                              : "")
                          }
                          onClick={async () => {
                            if (!isFavorited(material.id, 'material', material.folder_id)) {
                              const userEmail = typeof window !== "undefined" ? (localStorage.getItem("Email") || "") : "";
                              const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                              if (!userEmail) {
                                alert('No email found. Please log in.');
                                return;
                              }
                              if (!material.folder_id) {
                                alert('No folder_id found for this note.');
                                return;
                              }
                              try {
                                const res = await fetch('http://localhost:9000/graphql', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                                  },
                                  body: JSON.stringify({
                                    query: `mutation AddToFavorites($email: String!, $folder_id: String!) { addToFavorites(email: $email, folder_id: $folder_id) { id email folder_id createdAt } }`,
                                    variables: { email: userEmail, folder_id: material.folder_id },
                                  }),
                                });
                                if (res.status === 401) {
                                  alert('You are not authorized. Please log in.');
                                  return;
                                }
                                let data = null;
                                try {
                                  data = await res.json();
                                } catch (jsonErr) {
                                  alert('Server error: Invalid response.');
                                  return;
                                }
                                if (data?.data?.addToFavorites) {
                                  handleAddFavorite(material, 'material');
                                } else if (data?.errors && data.errors[0]?.message) {
                                  alert('Backend error: ' + data.errors[0].message);
                                } else {
                                  alert('Unknown backend error.');
                                }
                              } catch (err) {
                                console.error(err);
                                alert('Network error: Failed to add to favorites');
                              }
                            }
                          }}
                        >
                          <Star className={isFavorited(material.id, 'material') ? "h-4 w-4 text-yellow-500" : "h-4 w-4"} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="flex justify-center mt-4">
              <Button disabled={browsePage === 1} onClick={() => setBrowsePage(browsePage - 1)} variant="outline" size="sm">Prev</Button>
              <span className="mx-2 text-sm">Page {browsePage} of {Math.ceil(materials.length / ITEMS_PER_PAGE)}</span>
              <Button disabled={browsePage === Math.ceil(materials.length / ITEMS_PER_PAGE)} onClick={() => setBrowsePage(browsePage + 1)} variant="outline" size="sm">Next</Button>
            </div>
          </TabsContent>

          <TabsContent value="my-uploads" className="space-y-6 mt-6">
            {myUploads.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Upload className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No uploads yet</h3>
                  <p className="text-slate-600 mb-6">Share your study materials with the community</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginate(myUploads, uploadsPage).map((upload) => (
                  <Card key={upload.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg leading-tight">{upload.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {upload.course_code} • {upload.subject}
                            </CardDescription>
                          </div>
                        </div>
                        {/* delete  my notes */}
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-transparent"
                          disabled={deletingId === upload.id}
                          onClick={async () => {
                            if (!upload.folder_id) {
                              alert('No folder_id found for this note.');
                              return;
                            }
                            setDeletingId(upload.id);
                            try {
                              const token = localStorage.getItem("token");
                              const res = await fetch('http://localhost:9000/notes', {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                                },
                                body: JSON.stringify({ folderId: upload.folder_id }),
                              });
                              if (res.ok) {
                                const data = await res.json();
                                if (data.success) {
                                  // Refresh uploads from backend after delete
                                  fetchUploads();
                                } else {
                                  alert('Delete failed: ' + (data.message || 'Unknown error'));
                                }
                              } else if (res.status === 401) {
                                alert('You are not authorized. Please log in.');
                              } else {
                                let message = 'Unknown error';
                                try {
                                  const data = await res.json();
                                  message = data.message || message;
                                } catch {}
                                alert('Delete failed: ' + message);
                              }
                            } catch (err) {
                              console.error(err);
                              alert('Network error: Failed to delete note.');
                            } finally {
                              setDeletingId(null);
                            }
                          }}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                          {deletingId === upload.id && (
                            <span className="ml-2 animate-spin h-4 w-4 border-2 border-t-transparent border-red-500 rounded-full inline-block align-middle"></span>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-700 leading-relaxed">{upload.description}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-xs text-slate-500">
                            {upload.sizes?.join(", ")} • {upload.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {upload.tags?.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {typeof tag === 'string' ? tag.replace(/^["'{\[]+|["'}\]]+$/g, '') : tag}
                          </Badge>
                        ))}
                      </div>
                      {/* Show uploaded images */}
                      {/* {upload.images && upload.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {upload.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`upload-${idx}`} className="h-16 w-16 object-cover rounded border" />
                          ))}
                        </div>
                      )} */}
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>                        
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {myUploads.length > 0 && (
              <div className="flex justify-center mt-4">
                <Button disabled={uploadsPage === 1} onClick={() => setUploadsPage(uploadsPage - 1)} variant="outline" size="sm">Prev</Button>
                <span className="mx-2 text-sm">Page {uploadsPage} of {Math.ceil(myUploads.length / ITEMS_PER_PAGE)}</span>
                <Button disabled={uploadsPage === Math.ceil(myUploads.length / ITEMS_PER_PAGE)} onClick={() => setUploadsPage(uploadsPage + 1)} variant="outline" size="sm">Next</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6 mt-6">
            {favorites.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Star className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-slate-600 mb-6">Save materials you find helpful for quick access</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginate(favorites, favoritesPage).map((fav) => (
                  <Card key={fav.type + '-' + fav.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg leading-tight">{fav.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {fav.course_code} • {fav.subject}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-700 leading-relaxed">{fav.description}</p>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={fav.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {(fav.author ? fav.author.split(" ").map((n: string) => n[0]).join("") : "NA")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{fav.author}</p>
                          <p className="text-xs text-slate-500">
                            {fav.university} • {fav.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(fav.tags) && fav.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {typeof tag === 'string' ? tag.replace(/^["'{\[]+|["'}\]]+$/g, '') : tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          asChild
                          disabled={fav.deleted === true || fav.exists === false || !fav.urls || fav.urls.length === 0}
                        >
                          <a
                            href={fav.urls && fav.urls.length > 0 ? fav.urls[0] : undefined}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={removingFavoriteId === fav.id || fav.deleted === true || fav.exists === false}
                          onClick={() => handleRemoveFavorite(fav.id, fav.type, fav.folder_id)}
                        >
                          Remove from Favorites
                          {removingFavoriteId === fav.id && (
                            <span className="ml-2 animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full inline-block align-middle"></span>
                          )}
                        </Button>
                        {(fav.deleted === true || fav.exists === false) && (
                          <span className="text-red-500 font-semibold ml-2">Deleted by uploader</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {favorites.length > 0 && (
              <div className="flex justify-center mt-4">
                <Button disabled={favoritesPage === 1} onClick={() => setFavoritesPage(favoritesPage - 1)} variant="outline" size="sm">Prev</Button>
                <span className="mx-2 text-sm">Page {favoritesPage} of {Math.ceil(favorites.length / ITEMS_PER_PAGE)}</span>
                <Button disabled={favoritesPage === Math.ceil(favorites.length / ITEMS_PER_PAGE)} onClick={() => setFavoritesPage(favoritesPage + 1)} variant="outline" size="sm">Next</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <FileUploadModal
          open={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(false)
          }}
          onUpload={handleMaterialUpload}
        />
      </main>
    </div>
  )
}
