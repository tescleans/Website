import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function IntroSection() {
    return (
        <section className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Bento Grid Images */}
                    <div className="w-full md:w-1/2 relative h-[500px]">
                        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gray-100 rounded-2xl overflow-hidden shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image src="/assets/sliderimages/1.jpg" alt="Professional commercial cleaning service in action" fill className="object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gray-100 rounded-2xl overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10 border-4 border-white">
                            <Image src="/assets/sliderimages/2.jpg" alt="Detailed residential cleaning service" fill className="object-cover" />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"></div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <span className="text-primary/70 font-semibold tracking-wider uppercase">About Us</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
                            Cleaning with a <span className="text-secondary-foreground underline decoration-secondary decoration-4 underline-offset-4">Spirit of Excellence</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Total Excellence Services, Inc. was founded in April of 2008 and since 2013 we have been providing professional cleaning services for residential & commercial buildings.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Our Company’s goal is to professionally clean and service each of our customer’s facilities and buildings to the best of our abilities and in the highest standard possible.
                        </p>
                        <div className="pt-4">
                            <Link href="/about">
                                <Button variant="outline" size="lg">Learn More About Us</Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}