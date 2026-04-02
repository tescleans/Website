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
                        <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">More Than a Cleaning Company | We're Miami's Home & Business Care Partners
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                        We didn't start Total Excellence Services, Inc., because we saw a business opportunity. We started it because we saw a real problem: Miami families and business owners were struggling to find a cleaning service they could truly trust, one that showed up on time, did the job thoroughly, and treated their space with the same respect they would their own.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
So we built that company from the ground up.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
Since 2013, we have completed over 10,000 professional cleaning jobs across Miami-Dade County. We've cleaned everything from cozy Brickell studios to sprawling Coral Gables estates, from busy Downtown Miami law offices to high-traffic Wynwood retail spaces. That real-world experience shapes everything we do.                        </p>
                         <p className="text-muted-foreground leading-relaxed">
Our team isn't just trained, they're passionate. Every cleaner goes through a rigorous background check, hands-on training program, and ongoing quality reviews. We hold ourselves to a higher standard because we know that when you invite us into your space, you're placing your trust in us. We never take that lightly.
                        </p>
                         <p className="text-muted-foreground leading-relaxed">
We are proud members of the Miami business community. We hire locally, give back locally, and operate with the kind of accountability and transparency that only a truly local company can offer.
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
