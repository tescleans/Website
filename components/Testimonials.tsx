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

"use client"

import { useState } from "react"
import Link from "next/link"

const faqs = [
    {
        question: "Are your cleaners background-checked?",
        answer: "Absolutely. Every member of our team undergoes a thorough background check and identity verification before their first assignment. Your safety is our baseline, not an afterthought.",
    },
    {
        question: "Do I need to be home during the cleaning?",
        answer: "Not at all. Many of our clients provide a key or door code and go about their day. With our fully insured, vetted team, you can leave with complete confidence.",
    },
    {
        question: "Do you supply your own cleaning products and equipment?",
        answer: "Yes, we bring everything. Professional-grade vacuums, mops, microfiber cloths, and cleaning solutions are all included. You don't need to provide a single item.",
    },
    {
        question: "Are your products safe for children and pets?",
        answer: "Yes. We offer both standard and eco-friendly cleaning options. Our green products are non-toxic, biodegradable, and certified safe for kids and pets. Just let us know your preference when booking.",
    },
    {
        question: "What if I'm not satisfied with the cleaning?",
        answer: "Contact us within 24 hours of your appointment and we will return for a full re-clean at no additional charge. Our satisfaction guarantee is real — not just a tagline.",
    },
    {
        question: "Can I book a recurring cleaning plan?",
        answer: "Yes, and we recommend it. Our weekly, bi-weekly, and monthly plans come at discounted rates, include priority scheduling, and ensure you always work with the same assigned cleaning team.",
    },
    {
        question: "How do I get started?",
        answer: null, // rendered separately due to links
    },
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-primary font-semibold uppercase tracking-wide">FAQ</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Frequently Asked Questions About Our Miami Cleaning Services</h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left flex items-center justify-between px-6 py-5 gap-4"
                            >
                                <span className="text-primary font-semibold text-base">{faq.question}</span>
                                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold text-lg transition-transform duration-200"
                                    style={{ transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)" }}>
                                    +
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-5">
                                    {faq.answer ? (
                                        <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                                    ) : (
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Simply call us at{" "}
                                            <Link href="tel:7862861850" className="text-primary font-semibold hover:underline underline-offset-4">
                                                (786) 286-185
                                            </Link>
                                            , fill out our online quote form at{" "}
                                            <Link href="https://tescleans.com/" target="_blank" className="text-primary font-semibold hover:underline underline-offset-4">
                                                tescleans.com
                                            </Link>
                                            , or send us a message. We typically respond within a few hours and can often schedule within the same week.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
