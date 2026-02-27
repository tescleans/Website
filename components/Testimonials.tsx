"use client"

import React from 'react'
import { Quote, Star, ArrowRight, PenSquare } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { Button } from './ui/button'
import { formatDistanceToNow } from "date-fns"
import { Review } from '@/lib/getReviews'

export default function Testimonials({ reviews = [] }: { reviews: Review[] }) {
    const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 5000, stopOnInteraction: false }),
    ])

    // Use only top 12 reviews Max
    const displayReviews = reviews.slice(0, 12)

    return (
        <section className="py-24 bg-primary overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-secondary rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Read honest reviews from our satisfied customers.
                    </p>
                </div>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex -ml-6">
                        {displayReviews.map((review, i) => (
                            <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-6 min-w-0">
                                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 h-full flex flex-col hover:bg-white/15 transition-colors duration-300">
                                    <div className="flex justify-between items-start mb-6">
                                        <Quote className="h-8 w-8 text-secondary opacity-80" />
                                        <div className="flex gap-1">
                                            {[...Array(review.rating.value)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-white/90 italic mb-8 leading-relaxed flex-grow line-clamp-6">&quot;{review.text}&quot;</p>

                                    <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary-foreground flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                                            {review.author.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{review.author.name}</p>
                                            <p className="text-xs text-secondary/90">
                                                {formatDistanceToNow(new Date(review.publishedAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
                    <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="gap-2 font-semibold text-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
                    >
                        <Link href="/testimonials" className="flex items-center">
                            View All Reviews
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="gap-2 font-semibold bg-transparent text-white border-white/20 hover:bg-white hover:text-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
                    >
                        <a
                            href="https://google.com/maps/place//data=!4m3!3m2!1s0x88d9a5096c988ab3:0x20cebbe48e25e8a2!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            Write a Review
                            <PenSquare className="w-4 h-4 ml-2" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}