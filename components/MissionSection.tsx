import Image from "next/image"

export default function MissionSection() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Content */}
                    <div className="flex-1 space-y-8 z-10">
                        <div className="space-y-4">
                            <h4 className="text-secondary font-semibold uppercase tracking-wider text-sm">About Us</h4>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                                Our Mission
                            </h2>
                        </div>

                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Our Company’s goal is to professionally clean and service each of our customer’s facilities and buildings to the best of our abilities and in the highest standard possible.
                            </p>
                            <blockquote className="border-l-4 border-secondary pl-6 italic text-xl text-primary font-medium">
                                “Cleaning with the Spirit of Excellence”
                            </blockquote>
                            <p>
                                At Total Excellence Services Inc., we understand that our customers want as few hassles as possible and therefore Total Excellence Services Inc. shall provide strong management and direction for each project to ensure services are delivered to you in a smooth and hassle free manner.
                            </p>
                        </div>
                    </div>

                    {/* Right Images (Creative Layout) */}
                    <div className="flex-1 relative w-full h-[500px] flex items-center justify-center">
                        {/* Decorative Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl -z-10" />

                        {/* Image 1: Main Large */}
                        <div className="relative z-20 w-3/4 h-3/4 shadow-2xl rounded-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="/assets/mission/1.jpg"
                                alt="Tes Cleaning team member ensuring high quality"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Image 2: Overlay Top Right */}
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 shadow-xl rounded-xl overflow-hidden z-30 border-4 border-white transform translate-y-8 -translate-x-8 hover:scale-105 transition-transform duration-500">
                            <Image
                                src="/assets/mission/2.jpg"
                                alt="Detailed cleaning of office equipment"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Image 3: Overlay Bottom Left */}
                        <div className="absolute bottom-0 left-0 w-2/5 h-2/5 shadow-xl rounded-xl overflow-hidden z-30 border-4 border-white transform -translate-y-4 translate-x-4 hover:scale-105 transition-transform duration-500">
                            <Image
                                src="/assets/mission/3.jpg"
                                alt="Spotless clean floor reflection"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}