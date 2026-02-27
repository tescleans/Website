"use client"

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const images = [
    '/assets/work/1.jpg',
    '/assets/work/2.jpg',
    '/assets/work/3.jpg',
    '/assets/work/4.jpg',
    '/assets/work/5.jpg',
    '/assets/work/6.jpg',
]

export default function RecentWork() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
        Autoplay({ delay: 4000, stopOnInteraction: false }),
    ])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

    const onInit = useCallback((emblaApi: any) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: any) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-neutral-100">
                        Our Recent Work
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Browse through our latest projects and see the standard of excellence we deliver.
                    </p>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                        <div className="flex">
                            {images.map((src, index) => (
                                <div className="flex-[0_0_100%] md:flex-[0_0_60%] min-w-0 pl-4 md:pl-8 relative aspect-video" key={index}>
                                    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800 group">
                                        <Image
                                            src={src}
                                            alt={`Tes Cleaning completed project example ${index + 1} - Miami Lakes`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-black/90 shadow-lg flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:scale-110 hover:bg-white transition-all duration-300 z-10 hidden md:flex backdrop-blur-sm"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-black/90 shadow-lg flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:scale-110 hover:bg-white transition-all duration-300 z-10 hidden md:flex backdrop-blur-sm"
                        onClick={scrollNext}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex justify-center gap-3 mt-8">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-300",
                                index === selectedIndex
                                    ? "bg-primary w-8"
                                    : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}