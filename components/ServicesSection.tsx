import { Shield, Home, Hammer, Sparkles, Building2, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
    {
        icon: Building2,
        title: "Residential House Cleaning Miami",
        description: "Professional cleaning for offices, retail stores, and commercial spaces."
    },
    {
        icon: Home,
        title: "Residential Cleaning",
        description: "Keep your home pristine with our detailed cleaning plans."
    },
    {
        icon: Sparkles,
        title: "Restaurant Cleaning",
        description: "Deep grease cleaning, sanitization, and health code compliance."
    },
    {
        icon: Grid,
        title: "Carpet Cleaning",
        description: "Deep steam cleaning to remove stains and allergens."
    },
    {
        icon: Sparkles,
        title: "Floor Cleaning",
        description: "Stripping, waxing, and polishing for all floor types."
    },
    {
        icon: Hammer,
        title: "Construction Cleaning",
        description: "Post-construction debris removal and detailed dusting."
    },
    {
        icon: Shield,
        title: "Pressure Washing",
        description: "Exterior cleaning for driveways, walkways, and buildings."
    },
    {
        icon: Home, // Reusing icons is fine or import new ones
        title: "Window Cleaning",
        description: "Interior and exterior window cleaning for a streak-free shine."
    },
    {
        icon: Building2,
        title: "Custom Services",
        description: "Tailored cleaning solutions for your specific needs."
    },
]

export default function ServicesSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-semibold uppercase tracking-wide">Our Services</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Our Same-Day Cleaning Services in Miami Include</h2>
                    <p className="mt-4 text-muted-foreground">
                    Whether you need a one-time refresh or ongoing professional maintenance, we have a cleaning solution tailored to your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
                            <p className="text-muted-foreground mb-6 line-clamp-2">{service.description}</p>
                            <Link href="/services" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
                                Learn More →
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/book">
                        <Button size="lg">Book a Service Now</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
