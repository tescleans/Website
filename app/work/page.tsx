import Image from "next/image"

const images = [
    '/assets/work/1.jpg',
    '/assets/work/2.jpg',
    '/assets/work/3.jpg',
    '/assets/work/4.jpg',
    '/assets/work/5.jpg',
    '/assets/work/6.jpg',
]

export default function WorkPage() {
    return (
        <div className="pt-32 pb-20 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50">Our Work</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                        See the difference we make. A showcase of our cleaning excellence handling residential and commercial properties.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((src, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-neutral-200 dark:bg-neutral-900">
                            <Image
                                src={src}
                                alt={`Tes Cleaning portfolio project ${i + 1} demonstrating excellence in cleaning`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}