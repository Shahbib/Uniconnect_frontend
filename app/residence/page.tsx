"use client"

import { useState, useEffect } from "react"
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
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [myListings, setMyListings] = useState<Listing[]>([]);

  type Listing = {
    id: number;
    title: string;
    location: string;
    university: string;
    distance?: string;
    price: string;
    type?: string;
    bedrooms?: string;
    bathrooms?: string;
    amenities?: string[];
    images: string[];
    owner: string;
    ownerAvatar: string;
    rating?: number;
    reviews?: number;
    description: string;
    availableFrom: string;
    posted: string;
    verified?: boolean;
    lookingFor?: string;
    contactDetail: string;
  }
  const [posting, setPosting] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState<{ name: string; listing: string } | null>(null)
  const [chatMessage, setChatMessage] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  
  const [selectedType, setSelectedType] = useState("all")
  const [priceSort, setPriceSort] = useState("")
  const [universitySearch, setUniversitySearch] = useState("")
  const [messages, setMessages] = useState<Array<{
    text: string;
    sender: "user" | "owner";
    timestamp: Date;
  }>>([])
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
    contactDetail: string;
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
    contactDetail: "",
  })
 


  useEffect(() => {
    // Fetch user's listings from backend using GraphQL
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
    fetch("http://localhost:9000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query: `query GetMyRoomMates { getMyRoomMates { id email location nearestUniversity price imageUrl description availableDate contactDetail createdAt } }`
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.getMyRoomMates) {
          setMyListings(
            data.data.getMyRoomMates.map((roommate: any) => ({
              id: roommate.id,
              title: roommate.location,
              location: roommate.location,
              university: roommate.nearestUniversity,
              distance: "",
              price: roommate.price,
              type: "Apartment",
              bedrooms: "",
              bathrooms: "",
              amenities: [],
              images: [roommate.imageUrl || "/placeholder.svg?height=200&width=300"],
              owner: roommate.email,
              ownerAvatar: "/placeholder.svg?height=32&width=32",
              rating: 0,
              reviews: 0,
              description: roommate.description,
              availableFrom: roommate.availableDate,
              posted: roommate.createdAt,
              verified: false,
              lookingFor: "",
              contactDetail: roommate.contactDetail,
            }))
          );
        }
      })
      .catch(() => {
        // fallback or error handling
      });
    // Fetch all listings from backend using GraphQL
    fetch("http://localhost:9000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query: `query GetAllRoomMates { getAllRoomMates { id email location nearestUniversity price imageUrl description availableDate contactDetail createdAt } }`
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.getAllRoomMates) {
          setListings(
            data.data.getAllRoomMates.map((roommate: any) => ({
              id: roommate.id,
              title: roommate.location,
              location: roommate.location,
              university: roommate.nearestUniversity,
              distance: "",
              price: roommate.price,
              type: "Apartment",
              bedrooms: "",
              bathrooms: "",
              amenities: [],
              images: [roommate.imageUrl || "/placeholder.svg?height=200&width=300"],
              owner: roommate.email,
              ownerAvatar: "/placeholder.svg?height=32&width=32",
              rating: 0,
              reviews: 0,
              description: roommate.description,
              availableFrom: roommate.availableDate,
              posted: roommate.createdAt,
              verified: false,
              lookingFor: "",
              contactDetail: roommate.contactDetail,
            }))
          );
        }
      })
      .catch(() => {
        // fallback or error handling
      });
  }, []);

  const [contactModal, setContactModal] = useState<{ open: boolean; contact: string | null }>({ open: false, contact: null });

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
                  setPosting(true);
                  const formData = new FormData();
                  if (form.image) formData.append("image", form.image);
                  formData.append("location", form.location);
                  formData.append("nearestUniversity", form.university);
                  formData.append("price", form.price);
                  formData.append("description", form.description);
                  formData.append("availableDate", form.availableFrom);
                  formData.append("contactDetail", form.contactDetail);
                  // You can add more fields if backend expects them
                  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
                  fetch("http://localhost:9000/roommate", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`
                    },
                    body: formData
                  })
                  .then(async res => {
                    const data = await res.json();
                    if (data.success && data.roommate) {
                      // Add to local listings for instant feedback
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
                      images: [data.roommate.imageUrl || "/placeholder.svg?height=200&width=300"],
                      owner: "You",
                      ownerAvatar: "/placeholder.svg?height=32&width=32",
                      rating: 0,
                      reviews: 0,
                      description: form.description,
                      availableFrom: form.availableFrom,
                      posted: "just now",
                      verified: false,
                      lookingFor: form.lookingFor,
                      contactDetail: form.contactDetail,
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
                        contactDetail: "",
                      });
                    } else {
                      alert(data.message || "Failed to post listing");
                    }
                  })
                  .catch(() => {
                    alert("Failed to post listing. Please try again.");
                  })
                  .finally(() => {
                    setPosting(false);
                  });
                }}
                className="space-y-4"
              >
                
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input className="w-full border rounded px-3 py-2" required placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Nearest University</label>
                  <input className="w-full border rounded px-3 py-2" required placeholder="Nearest University" value={form.university} onChange={e => setForm(f => ({ ...f, university: e.target.value }))} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Price</label>
                  <input className="w-full border rounded px-3 py-2" required type="number" min="0" placeholder="Price" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
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
                  <label className="block font-semibold mb-1">Contact details</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="Contact details" value={form.contactDetail} onChange={e => setForm(f => ({ ...f, contactDetail: e.target.value }))} />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold" disabled={posting}>
                  {posting ? (
                    <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block animate-spin mr-2"></span>
                  ) : null}
                  {posting ? "Posting..." : "Post Listing"}
                </button>
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
              {listings
                .filter(listing => {
                  const typeMatch = selectedType === "all" || listing.type === selectedType;
                  const universityMatch = !universitySearch || listing.university.toLowerCase().includes(universitySearch.toLowerCase());
                  return typeMatch && universityMatch;
                })
                .sort((a, b) => {
                  if (priceSort === "low") return Number(a.price) - Number(b.price);
                  if (priceSort === "high") return Number(b.price) - Number(a.price);
                  return 0;
                })
                .map((listing) => (
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
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                          <MapPin className="h-4 w-4" />
                          {listing.location} {listing.distance ? `• ${listing.distance}` : ""}
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{listing.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={listing.ownerAvatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {listing.owner.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{listing.owner}</p>
                            <p className="text-xs text-slate-500">{listing.university}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">
                        <p>
                          <strong>Available:</strong> {listing.availableFrom}
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                          onClick={() => {
                            setContactModal({ open: true, contact: listing.contactDetail });
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
                {myListings
                  .filter(listing => {
                    return !universitySearch || (listing.university && listing.university.toLowerCase().includes(universitySearch.toLowerCase()));
                  })
                  .sort((a, b) => {
                    if (priceSort === "low") return Number(a.price) - Number(b.price);
                    if (priceSort === "high") return Number(b.price) - Number(a.price);
                    return 0;
                  })
                  .map((listing) => (
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
                          disabled={deletingId === listing.id}
                          onClick={() => {
                            setDeletingId(listing.id);
                            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
                            fetch(`http://localhost:9000/roommate/${listing.id}`, {
                              method: "DELETE",
                              headers: {
                                Authorization: `Bearer ${token}`
                              }
                            })
                            .then(res => {
                              if (res.ok) {
                                setMyListings(prev => prev.filter(l => l.id !== listing.id));
                              } else {
                                alert("Failed to delete listing.");
                              }
                            })
                            .catch(() => {
                              alert("Failed to delete listing.");
                            })
                            .finally(() => {
                              setDeletingId(null);
                            });
                          }}
                        >
                          {deletingId === listing.id ? (
                            <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block animate-spin"></span>
                          ) : (
                            <span>&#10005;</span>
                          )}
                        </button>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-black/70 text-white">${listing.price}/month</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                            <MapPin className="h-4 w-4" />
                            {listing.location} {listing.distance ? `• ${listing.distance}` : ""}
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{listing.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={listing.ownerAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {listing.owner.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{listing.owner}</p>
                              <p className="text-xs text-slate-500">{listing.university}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-slate-600">                    
                          <p>
                            <strong>Available:</strong> {listing.availableFrom}
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

        {/* Contact Modal */}
        {contactModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xs p-6 relative">
              <button
                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
                onClick={() => setContactModal({ open: false, contact: null })}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Contact Details</h2>
              <div className="text-slate-700 text-center">
                {contactModal.contact ? (
                  <span>{contactModal.contact}</span>
                ) : (
                  <span>No contact details available.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
