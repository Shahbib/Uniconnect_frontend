"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Users,
  Star,
  MessageSquare,
  Heart,
  Plus,
  Bed,
  Bath,
} from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ResidenceFinder() {
  type Listing = {
    id: number;
    title: string;
    location: string;
    university: string;
    distance: string;
    price: string;
    type: string;
    bedrooms: string;
    bathrooms: string;
    amenities: string[];
    images: string[];
    owner: string;
    ownerAvatar: string;
    rating: number;
    reviews: number;
    description: string;
    availableFrom: string;
    posted: string;
    verified: boolean;
    lookingFor: string;
  }
  const [showModal, setShowModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState<{ name: string; listing: string } | null>(null)
  const [chatMessage, setChatMessage] = useState("")
  const [messages, setMessages] = useState<Array<{
    text: string;
    sender: "user" | "owner";
    timestamp: Date;
  }>>([])
  const [myListings, setMyListings] = useState<Listing[]>([])
  const [selectedType, setSelectedType] = useState("all")
  const [universitySearch, setUniversitySearch] = useState("")
  const [form, setForm] = useState<{
    title: string;
    location: string;
    university: string;
    distance: string;
    price: string;
    type: string;
    bedrooms: string;
    bathrooms: string;
    amenities: string;
    image: File | null;
    description: string;
    availableFrom: string;
    lookingFor: string;
  }>({
    title: "",
    location: "",
    university: "",
    distance: "",
    price: "",
    type: "Apartment",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    image: null,
    description: "",
    availableFrom: "",
    lookingFor: "",
  })
  const [searchLocation, setSearchLocation] = useState("")
  const [priceSort, setPriceSort] = useState("")

  const listings = [
    {
      id: 1,
      title: "Cozy 2BR Apartment Near Campus",
      location: "Cambridge, MA",
      distance: "0.5 miles from MIT",
      price: 1200,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["WiFi", "Parking", "Laundry", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Sarah Kim",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "MIT",
      rating: 4.8,
      reviews: 12,
      description:
        "Perfect for students! Fully furnished apartment with all utilities included. Walking distance to campus and public transport.",
      availableFrom: "Jan 2024",
      posted: "2 days ago",
      verified: true,
      lookingFor: "Graduate student, non-smoker, clean",
    },
    {
      id: 2,
      title: "Shared House with Study Room",
      location: "Palo Alto, CA",
      distance: "1.2 miles from Stanford",
      price: 900,
      type: "House",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Study Room", "Garden", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Alex Chen",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "Stanford",
      rating: 4.6,
      reviews: 8,
      description:
        "Looking for a responsible roommate to share this beautiful house. Dedicated study room and quiet neighborhood.",
      availableFrom: "Feb 2024",
      posted: "1 week ago",
      verified: true,
      lookingFor: "PhD student preferred, quiet, responsible",
    },
    {
      id: 3,
      title: "Studio Near Harvard Square",
      location: "Cambridge, MA",
      distance: "0.3 miles from Harvard",
      price: 1500,
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Gym", "Concierge", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Emma Davis",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "Harvard",
      rating: 4.9,
      reviews: 15,
      description:
        "Modern studio in the heart of Harvard Square. Perfect for graduate students who want independence and convenience.",
      availableFrom: "Mar 2024",
      posted: "3 days ago",
      verified: false,
      lookingFor: "Graduate student, professional",
    },
    {
      id: 4,
      title: "Room in Tech House",
      location: "Berkeley, CA",
      distance: "0.8 miles from UC Berkeley",
      price: 800,
      type: "Room",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Coworking Space", "Kitchen", "Parking"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Michael Johnson",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "UC Berkeley",
      rating: 4.7,
      reviews: 9,
      description:
        "Join our tech-focused house! Great for CS students and entrepreneurs. Regular hackathons and study sessions.",
      availableFrom: "Jan 2024",
      posted: "5 days ago",
      verified: true,
      lookingFor: "CS/Engineering student, tech enthusiast",
    },
    {
      id: 5,
      title: "Cozy 2BR Apartment Near Campus",
      location: "Cambridge, MA",
      distance: "0.5 miles from MIT",
      price: 1200,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["WiFi", "Parking", "Laundry", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Sarah Kim",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "MIT",
      rating: 4.8,
      reviews: 12,
      description:
        "Perfect for students! Fully furnished apartment with all utilities included. Walking distance to campus and public transport.",
      availableFrom: "Jan 2024",
      posted: "2 days ago",
      verified: true,
      lookingFor: "Graduate student, non-smoker, clean",
    },
    {
      id: 6,
      title: "Shared House with Study Room",
      location: "Palo Alto, CA",
      distance: "1.2 miles from Stanford",
      price: 900,
      type: "House",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Study Room", "Garden", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Alex Chen",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "Stanford",
      rating: 4.6,
      reviews: 8,
      description:
        "Looking for a responsible roommate to share this beautiful house. Dedicated study room and quiet neighborhood.",
      availableFrom: "Feb 2024",
      posted: "1 week ago",
      verified: true,
      lookingFor: "PhD student preferred, quiet, responsible",
    },
    {
      id: 7,
      title: "Studio Near Harvard Square",
      location: "Cambridge, MA",
      distance: "0.3 miles from Harvard",
      price: 1500,
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Gym", "Concierge", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Emma Davis",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "Harvard",
      rating: 4.9,
      reviews: 15,
      description:
        "Modern studio in the heart of Harvard Square. Perfect for graduate students who want independence and convenience.",
      availableFrom: "Mar 2024",
      posted: "3 days ago",
      verified: false,
      lookingFor: "Graduate student, professional",
    },
    {
      id: 8,
      title: "Room in Tech House",
      location: "Berkeley, CA",
      distance: "0.8 miles from UC Berkeley",
      price: 800,
      type: "Room",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Coworking Space", "Kitchen", "Parking"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Michael Johnson",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "UC Berkeley",
      rating: 4.7,
      reviews: 9,
      description:
        "Join our tech-focused house! Great for CS students and entrepreneurs. Regular hackathons and study sessions.",
      availableFrom: "Jan 2024",
      posted: "5 days ago",
      verified: true,
      lookingFor: "CS/Engineering student, tech enthusiast",
    },
    {
      id: 9,
      title: "Cozy 2BR Apartment Near Campus",
      location: "Cambridge, MA",
      distance: "0.5 miles from MIT",
      price: 1200,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["WiFi", "Parking", "Laundry", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Sarah Kim",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "MIT",
      rating: 4.8,
      reviews: 12,
      description:
        "Perfect for students! Fully furnished apartment with all utilities included. Walking distance to campus and public transport.",
      availableFrom: "Jan 2024",
      posted: "2 days ago",
      verified: true,
      lookingFor: "Graduate student, non-smoker, clean",
    },
    {
      id: 10,
      title: "Shared House with Study Room",
      location: "Palo Alto, CA",
      distance: "1.2 miles from Stanford",
      price: 900,
      type: "House",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Study Room", "Garden", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Alex Chen",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "Stanford",
      rating: 4.6,
      reviews: 8,
      description:
        "Looking for a responsible roommate to share this beautiful house. Dedicated study room and quiet neighborhood.",
      availableFrom: "Feb 2024",
      posted: "1 week ago",
      verified: true,
      lookingFor: "PhD student preferred, quiet, responsible",
    },
    {
      id: 11,
      title: "Studio Near RMSTU",
      location: "Cambridge, MA",
      distance: "0.3 miles from RMSTU",
      price: 1500,
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Gym", "Concierge", "Kitchen"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Emma Davis",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "RMSTU",
      rating: 4.9,
      reviews: 15,
      description:
        "Modern studio in the heart of Harvard Square. Perfect for graduate students who want independence and convenience.",
      availableFrom: "Mar 2024",
      posted: "3 days ago",
      verified: false,
      lookingFor: "Graduate student, professional",
    },
    {
      id: 12,
      title: "Room in Tech House",
      location: "Berkeley, CA",
      distance: "0.8 miles from UC Berkeley",
      price: 800,
      type: "Room",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Coworking Space", "Kitchen", "Parking"],
      images: ["/placeholder.svg?height=200&width=300"],
      owner: "Michael Johnson",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      university: "UC Berkeley",
      rating: 4.7,
      reviews: 9,
      description:
        "Join our tech-focused house! Great for CS students and entrepreneurs. Regular hackathons and study sessions.",
      availableFrom: "Jan 2024",
      posted: "5 days ago",
      verified: true,
      lookingFor: "CS/Engineering student, tech enthusiast",
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
              Find Residence
            </h1>
            <p className="text-slate-600">Discover your perfect student accommodation</p>
          </div>

          <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Post Listing
          </Button>
      {/* Post Listing Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
            <button className="absolute top-2 right-2 text-slate-400 hover:text-slate-600" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Post a New Listing</h2>
            <div className="max-h-[70vh] overflow-y-auto pr-2">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  let imageUrl = form.image ? URL.createObjectURL(form.image) : "/placeholder.svg?height=200&width=300";
                  setMyListings(prev => [
                    {
                      id: Date.now(),
                      title: form.title,
                      location: form.location,
                      university: form.university,
                      distance: form.distance,
                      price: form.price,
                      type: form.type,
                      bedrooms: form.bedrooms,
                      bathrooms: form.bathrooms,
                      amenities: form.amenities.split(",").map(a => a.trim()),
                      images: [imageUrl],
                      owner: "You",
                      ownerAvatar: "/placeholder.svg?height=32&width=32",
                      rating: 0,
                      reviews: 0,
                      description: form.description,
                      availableFrom: form.availableFrom,
                      posted: "just now",
                      verified: false,
                      lookingFor: form.lookingFor,
                    },
                    ...prev
                  ]);
                  setShowModal(false);
                  setForm({
                    title: "",
                    location: "",
                    university: "",
                    distance: "",
                    price: "",
                    type: "Apartment",
                    bedrooms: "",
                    bathrooms: "",
                    amenities: "",
                    image: null,
                    description: "",
                    availableFrom: "",
                    lookingFor: "",
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block font-semibold mb-1">Title</label>
                  <input className="w-full border rounded px-3 py-2" required placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input className="w-full border rounded px-3 py-2" required placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Nearest University</label>
                  <input className="w-full border rounded px-3 py-2" required placeholder="Nearest University" value={form.university} onChange={e => setForm(f => ({ ...f, university: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Distance</label>
                  <input className="w-full border rounded px-3 py-2" required placeholder="Distance (e.g. 0.5 miles from MIT)" value={form.distance} onChange={e => setForm(f => ({ ...f, distance: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Price</label>
                  <input className="w-full border rounded px-3 py-2" required type="number" min="0" placeholder="Price" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Type</label>
                  <select className="w-full border rounded px-3 py-2" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Studio</option>
                    <option>Room</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Bedroom Number</label>
                  <input className="w-full border rounded px-3 py-2" required type="number" min="0" placeholder="Bedroom Number" value={form.bedrooms} onChange={e => setForm(f => ({ ...f, bedrooms: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Bathroom Number</label>
                  <input className="w-full border rounded px-3 py-2" required type="number" min="0" placeholder="Bathroom Number" value={form.bathrooms} onChange={e => setForm(f => ({ ...f, bathrooms: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Amenities (comma separated)</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="Amenities (comma separated)" value={form.amenities} onChange={e => setForm(f => ({ ...f, amenities: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Image</label>
              <input className="w-full border rounded px-3 py-2" type="file" accept="image/*" onChange={e => {
                const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                setForm(f => ({ ...f, image: file }));
              }} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea className="w-full border rounded px-3 py-2" required placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Available Date</label>
                  <input className="w-full border rounded px-3 py-2" required type="date" placeholder="Available Date" value={form.availableFrom} onChange={e => setForm(f => ({ ...f, availableFrom: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Looking For</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="Looking For" value={form.lookingFor} onChange={e => setForm(f => ({ ...f, lookingFor: e.target.value }))} />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold">Post Listing</button>
              </form>
            </div>
          </div>
        </div>
      )}
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Room">Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search by university name..."
                    value={universitySearch}
                    onChange={(e) => setUniversitySearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low to High</SelectItem>
                  <SelectItem value="high">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Browse Listings
            </TabsTrigger>
            <TabsTrigger value="mylisting" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              My Listing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {([...listings]
                .filter(listing => {
                  const typeMatch = selectedType === "all" || listing.type === selectedType;
                  const universityMatch = !universitySearch || listing.university.toLowerCase() === universitySearch.toLowerCase();
                  return typeMatch && universityMatch;
                })
                .sort((a, b) => {
                  if (priceSort === "low") return a.price - b.price;
                  if (priceSort === "high") return b.price - a.price;
                  return 0;
                })
              ).map((listing) => (
                <Card key={listing.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {listing.verified && <Badge className="absolute top-3 right-3 bg-green-500">Verified</Badge>}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/70 text-white">${listing.price}/month</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{listing.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                        <MapPin className="h-4 w-4" />
                        {listing.location} • {listing.distance}
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">{listing.description}</p>

                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {listing.bedrooms} bed
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {listing.bathrooms} bath
                      </div>
                      <Badge variant="outline">{listing.type}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {listing.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={listing.ownerAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {listing.owner
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{listing.owner}</p>
                          <p className="text-xs text-slate-500">{listing.university}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{listing.rating}</span>
                        <span className="text-xs text-slate-500">({listing.reviews})</span>
                      </div>
                    </div>

                    <div className="text-sm text-slate-600">
                      <p>
                        <strong>Looking for:</strong> {listing.lookingFor}
                      </p>
                      <p>
                        <strong>Available:</strong> {listing.availableFrom}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        onClick={() => {
                          setSelectedOwner({
                            name: listing.owner,
                            listing: listing.title
                          });
                          setShowChatModal(true);
                        }}
                      >
                        Contact Owner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>


          <TabsContent value="mylisting" className="space-y-6 mt-6">
            {myListings.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">My Listing</h3>
                  <p className="text-slate-600">No listings posted yet. Use the Post Listing button above.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myListings.map((listing) => (
                  <Card key={listing.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={listing.images[0] || "/placeholder.svg"}
                        alt={listing.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <button
                        className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 shadow hover:bg-red-600 transition"
                        title="Delete Listing"
                        onClick={() => setMyListings(prev => prev.filter(l => l.id !== listing.id))}
                      >
                        &#10005;
                      </button>
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-black/70 text-white">${listing.price}/month</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{listing.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                          <MapPin className="h-4 w-4" />
                          {listing.location} • {listing.distance}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                          <span className="font-medium">{listing.university}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{listing.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {listing.bedrooms} bed
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {listing.bathrooms} bath
                        </div>
                        <Badge variant="outline">{listing.type}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {listing.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={listing.ownerAvatar || "/placeholder.svg"} />
                          <AvatarFallback>YO</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{listing.owner}</p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">
                        <p>
                          <strong>Available:</strong> {listing.availableFrom}
                        </p>
                        <p>
                          <strong>Looking for:</strong> {listing.lookingFor}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Chat Modal */}
        {showChatModal && selectedOwner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
                onClick={() => {
                  setShowChatModal(false);
                  setSelectedOwner(null);
                  setChatMessage("");
                  setMessages([]);
                }}
              >
                ✕
              </button>

              <div className="mb-6">
                <h2 className="text-xl font-bold">Chat with {selectedOwner.name}</h2>
                <p className="text-sm text-slate-500">About: {selectedOwner.listing}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 h-80 mb-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-slate-500 py-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg py-2 px-4 max-w-[80%] ${
                          message.sender === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-slate-200 text-slate-800'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <span className={`text-xs ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && chatMessage.trim()) {
                      const newMessage = {
                        text: chatMessage.trim(),
                        sender: 'user' as const,
                        timestamp: new Date()
                      };
                      setMessages(prev => [...prev, newMessage]);
                      setChatMessage("");
                      
                      // Simulate owner response after 1 second
                      setTimeout(() => {
                        const responseMessage = {
                          text: "Thank you for your interest! What would you like to know about the property?",
                          sender: 'owner' as const,
                          timestamp: new Date()
                        };
                        setMessages(prev => [...prev, responseMessage]);
                      }, 1000);
                    }
                  }}
                />
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    if (chatMessage.trim()) {
                      const newMessage = {
                        text: chatMessage.trim(),
                        sender: 'user' as const,
                        timestamp: new Date()
                      };
                      setMessages(prev => [...prev, newMessage]);
                      setChatMessage("");
                      
                      // Simulate owner response after 1 second
                      setTimeout(() => {
                        const responseMessage = {
                          text: "Thank you for your interest! What would you like to know about the property?",
                          sender: 'owner' as const,
                          timestamp: new Date()
                        };
                        setMessages(prev => [...prev, responseMessage]);
                      }, 1000);
                    }
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
