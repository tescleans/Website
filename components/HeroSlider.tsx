"use client"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

// Fallback slides
const defaultSlides = [
    {
        id: "1",
        image_url: "/assets/sliderimages/1.jpg",
        title: "Cleaning with a Spirit of Excellence",
        subtitle: "Serving South Florida Since 2008. Professional, Reliable, & Detailed.",
        cta_text: "Book Now",
        cta_link: "/book"
    },
    {
        id: "2",
        image_url: "/assets/sliderimages/2.jpg",
        title: "Quality Cleaning Services",
        subtitle: "Residential & Commercial cleaning tailored to your needs.",
        cta_text: "Our Services",
        cta_link: "/services"
    },
    {
        id: "3",
        image_url: "/assets/sliderimages/3.jpg",
        title: "Professional Staff",
        subtitle: "Trained, Insured, and dedicated to your satisfaction.",
        cta_text: "Contact Us",
        cta_link: "/contact"
    }
]

export default function HeroSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [slides, setSlides] = useState<any[]>(defaultSlides)

    // Fetch slides from Supabase
    useEffect(() => {
        const fetchSlides = async () => {
            const { data, error } = await supabase
                .from('slides')
                .select('*')
                .order('sort_order', { ascending: true })

            if (data && data.length > 0) {
                setSlides(data)
            }
        }
        fetchSlides()
    }, [])

    // Simple autoplay effect
    useEffect(() => {
        if (emblaApi) {
            const autoplay = setInterval(() => {
                emblaApi.scrollNext()
            }, 6000)
            return () => clearInterval(autoplay)
        }
    }, [emblaApi])

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black text-white" ref={emblaRef}>
            <div className="flex h-full w-full">
                {slides.map((slide, index) => (
                    <div key={slide.id || index} className="relative flex-[0_0_100%] h-full w-full min-w-0">
                        <Image
                            src={slide.image_url || slide.image} // Handle both db snake_case and local camelCase if leftovers
                            alt={slide.title}
                            fill
                            className="object-cover opacity-60"
                            priority={index === 0}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center text-center">
                            <div className="container px-6 space-y-6 max-w-4xl animate-in fade-in zoom-in duration-1000">
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-md">
                                    {slide.title}
                                </h2>
                                <p className="text-xl md:text-2xl text-gray-200 drop-shadow-sm max-w-2xl mx-auto font-light">
                                    {slide.subtitle}
                                </p>
                                <div className="pt-8">
                                    <Link href={slide.cta_link || slide.link || "/book"}>
                                        <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-white text-primary hover:bg-gray-100">
                                            {slide.cta_text || slide.cta}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
