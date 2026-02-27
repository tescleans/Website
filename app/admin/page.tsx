"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, LogOut, FileText, Image as ImageIcon, Calendar } from "lucide-react"
import { format } from "date-fns"

export default function AdminPage() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [activeTab, setActiveTab] = useState("bookings")

    // Auth State
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Data State
    const [bookings, setBookings] = useState<any[]>([])
    const [posts, setPosts] = useState<any[]>([])
    const [slides, setSlides] = useState<any[]>([])

    // Check session on load
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            if (session?.user) fetchData()
        }
        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) fetchData()
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        // Fetch Bookings
        const { data: bookingsData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
        if (bookingsData) setBookings(bookingsData)

        // Fetch Posts (ignore error if table doesn't exist yet)
        const { data: postsData } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
        if (postsData) setPosts(postsData)

        // Fetch Slides
        const { data: slidesData } = await supabase.from('slides').select('*').order('sort_order', { ascending: true })
        if (slidesData) setSlides(slidesData)

        setLoading(false)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        setLoading(false)
        if (error) {
            toast.error("Login Failed", { description: error.message || "Invalid credentials." })
        } else {
            toast.success("Logged In Successfully")
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        toast.message("Logged out")
    }

    const updateBookingStatus = async (id: string, status: string) => {
        const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
        if (error) toast.error("Failed to update status")
        else {
            toast.success(`Booking marked as ${status}`)
            fetchData() // Refresh
        }
    }

    const createPost = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const title = (form.elements.namedItem('title') as HTMLInputElement).value
        const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value
        const image = (form.elements.namedItem('image') as HTMLInputElement).value

        const { error } = await supabase.from('posts').insert({ title, content, image_url: image })
        if (error) toast.error("Failed to create post: " + error.message)
        else {
            toast.success("Blog post created!")
            form.reset()
            fetchData()
        }
    }

    const updateSlide = async (id: string, updates: any) => {
        const { error } = await supabase.from('slides').update(updates).eq('id', id)
        if (error) toast.error("Failed to update slide")
        else {
            toast.success("Slide updated")
            fetchData()
        }
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-sm space-y-6 bg-white p-8 shadow-xl rounded-2xl border">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
                        <p className="text-muted-foreground mt-2 text-sm">Welcome back, please sign in.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@tescleans.com"
                                className="bg-gray-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-gray-50"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </form>
                    <div className="text-center text-xs text-muted-foreground">
                        {/* Demo credentials removed for production */}
                    </div>
                </div>
            </div>
        )
    }

    // AUTHENTICATED ADMIN VIEW
    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{user.email}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b pb-1 overflow-x-auto">
                    <TabButton active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")} icon={<Calendar className="w-4 h-4" />} label="Bookings" />
                    <TabButton active={activeTab === "blog"} onClick={() => setActiveTab("blog")} icon={<FileText className="w-4 h-4" />} label="Blog Posts" />
                    <TabButton active={activeTab === "slides"} onClick={() => setActiveTab("slides")} icon={<ImageIcon className="w-4 h-4" />} label="Home Slider" />
                </div>

                {/* BOOKINGS TAB */}
                {activeTab === "bookings" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Recent Bookings</h2>
                            <Button variant="outline" size="sm" onClick={fetchData}>Refresh</Button>
                        </div>

                        <div className="grid gap-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 text-xs font-bold rounded-full uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                            <h3 className="font-semibold text-lg">{booking.service}</h3>
                                        </div>
                                        <div className="text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                                            <p>📅 {format(new Date(booking.date), 'MMMM dd, yyyy')} at {booking.time}</p>
                                            <p>👤 {booking.name}</p>
                                            <p>📧 {booking.email}</p>
                                            <p>📞 {booking.phone}</p>
                                        </div>
                                        {booking.message && (
                                            <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                                                "{booking.message}"
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-start gap-2">
                                        {booking.status === 'pending' && (
                                            <>
                                                <Button size="sm" onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="bg-green-600 hover:bg-green-700">Confirm</Button>
                                                <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="text-red-600 hover:bg-red-50">Cancel</Button>
                                            </>
                                        )}
                                        {booking.status === 'confirmed' && (
                                            <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="text-red-600 hover:bg-red-50">Cancel Booking</Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {bookings.length === 0 && <p className="text-muted-foreground text-center py-10">No bookings yet.</p>}
                        </div>
                    </div>
                )}

                {/* BLOG TAB */}
                {activeTab === "blog" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Create Form */}
                            <div className="md:col-span-1">
                                <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-24">
                                    <h3 className="font-bold text-lg mb-4">Create New Post</h3>
                                    <form onSubmit={createPost} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Title</Label>
                                            <Input name="title" required placeholder="Cleaning Tips..." />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Image URL</Label>
                                            <Input name="image" placeholder="/assets/..." />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Content</Label>
                                            <Textarea name="content" required placeholder="Write your post here..." className="min-h-[100px]" />
                                        </div>
                                        <Button type="submit" className="w-full">Publish Post</Button>
                                    </form>
                                </div>
                            </div>

                            {/* List */}
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="font-bold text-lg">Published Posts ({posts.length})</h3>
                                {posts.length === 0 && (
                                    <div className="bg-white p-8 rounded-xl border text-center text-muted-foreground">
                                        <p>No posts found. Create one to get started.</p>
                                        <p className="text-xs mt-2 text-red-400">If you see an error, make sure you ran the SQL script to create the 'posts' table.</p>
                                    </div>
                                )}
                                {posts.map(post => (
                                    <div key={post.id} className="bg-white p-4 rounded-xl border flex gap-4">
                                        {post.image_url && (
                                            <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={post.image_url} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-bold">{post.title}</h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.content}</p>
                                            <p className="text-xs text-gray-400 mt-2">Published: {format(new Date(post.created_at), 'MMM dd, yyyy')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* SLIDES TAB */}
                {activeTab === "slides" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Homepage Slider Content</h2>
                            {/* <Button>+ New Slide</Button> */}
                        </div>

                        <div className="grid gap-6">
                            {slides.length === 0 && (
                                <div className="bg-white p-8 rounded-xl border text-center text-muted-foreground">
                                    <p>No custom slides found. The site is using default hardcoded slides.</p>
                                    <p className="text-sm mt-2 font-semibold">Run the provided SQL script to initialize the 'slides' table so you can edit them here.</p>
                                </div>
                            )}

                            {slides.map(slide => (
                                <div key={slide.id} className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-full md:w-48 aspect-video bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={slide.image_url} alt="" className="object-cover w-full h-full" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-xs">Preview</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4 w-full">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input
                                                    defaultValue={slide.title}
                                                    onBlur={(e) => updateSlide(slide.id, { title: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Subtitle</Label>
                                                <Input
                                                    defaultValue={slide.subtitle}
                                                    onBlur={(e) => updateSlide(slide.id, { subtitle: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Image Path</Label>
                                                <Input
                                                    defaultValue={slide.image_url}
                                                    onBlur={(e) => updateSlide(slide.id, { image_url: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>CTA Text</Label>
                                                <Input
                                                    defaultValue={slide.cta_text}
                                                    onBlur={(e) => updateSlide(slide.id, { cta_text: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">* Changes save automatically when you click outside the field.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}

function TabButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${active
                ? "bg-white text-primary shadow-md translate-y-[-2px]"
                : "bg-transparent text-muted-foreground hover:text-primary hover:bg-white/50"
                }`}
        >
            {icon} {label}
        </button>
    )
}