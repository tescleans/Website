"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
    /* Navbar Logic Update: Check pathname to determine default text color */
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const isHome = pathname === "/"

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Our Work", href: "/work" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "Careers", href: "/careers" },
        { name: "Contact Us", href: "/contact" },
    ]


    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled || !isHome
                    ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* Logo adjust size */}
                    <div className="relative w-24 h-24 overflow-hidden rounded-full border border-gray-100 bg-white">
                        <Image
                            src="/assets/logo-new.png"
                            alt="TES Logo"
                            fill
                            className="object-contain p-1"
                        />
                    </div>
                    <span className={cn("font-bold text-xl tracking-tight hidden sm:block", isScrolled || !isHome || mobileMenuOpen ? "text-primary" : "text-white mix-blend-difference")}>
                        Total Excellence
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-secondary",
                                isScrolled || !isHome ? "text-primary" : "text-white mix-blend-difference" // trick for hero overlay
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant={isScrolled || !isHome ? "default" : "secondary"} className="font-semibold" asChild>
                        <Link href="/book">Book Now</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className={cn("h-6 w-6", isScrolled || !isHome ? "text-primary" : "text-white")} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-primary hover:text-secondary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button className="w-full" asChild>
                        <Link href="/book" onClick={() => setMobileMenuOpen(false)}>Book Now</Link>
                    </Button>
                </div>
            )}
        </header>
    )
}