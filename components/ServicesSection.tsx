import { Shield, Home, Hammer, Sparkles, Building2, Grid, Leaf, PackageOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
    {
        icon: Building2,
        title: "🏠 Residential House Cleaning Miami",
        description: "Your home should be your retreat, not another chore on your to-do list. Our residential house cleaning in Miami covers every inch of your living space with precision and care.",
        listLabel: "What we cover:",
        listItems: [
            "Full kitchen cleaning, countertops, stovetop, sink, exterior appliances",
            "Bathroom sanitization — toilets, showers, tubs, mirrors, floors",
            "Bedroom dusting, vacuuming, and linen changes (on request)",
            "Living area dusting, wiping, and floor care",
            "Interior windows, baseboards, and light switches",
        ],
        footer: "Available as one-time, weekly, bi-weekly, or monthly visits.",
    },
    {
        icon: Building2,
        title: "🏢 Commercial & Office Cleaning Miami",
        description: "A clean workplace isn't a luxury — it's a business necessity. Studies show that employees in clean environments are up to 15% more productive and take fewer sick days. Our commercial cleaning services in Miami keep your workplace professional, hygienic, and welcoming without disrupting your operations.",
        listLabel: "We serve:",
        listItems: [
            "Corporate offices and coworking spaces",
            "Medical, dental, and healthcare facilities",
            "Retail shops and showrooms",
            "Restaurants and hospitality venues",
            "Gyms and wellness centers",
            "Schools and childcare facilities",
        ],
        footer: "We work evenings, weekends, and before business hours — on your schedule.",
    },
    {
        icon: Search,
        title: "🔍 Deep Cleaning Services Miami",
        description: "When a standard clean just won't cut it, our deep cleaning service goes where others don't. We target grout lines, behind appliances, inside cabinets, ceiling fans, window tracks, and every overlooked corner that accumulates months of buildup.",
        listLabel: "Perfect for:",
        listItems: [
            "First-time professional cleaning clients",
            "Post-renovation or construction cleanup",
            "Pre- and post-event cleaning",
            "Seasonal spring or end-of-year cleans",
        ],
        footer: null,
    },
    {
        icon: PackageOpen,
        title: "📦 Move-In / Move-Out Cleaning Miami",
        description: "Moving is stressful. Let us handle the cleaning so you can focus on the transition. Our move-in/move-out cleaning is one of the most requested services across Miami's high-turnover rental market — from Edgewater condos to Kendall family homes.",
        listLabel: null,
        listItems: [],
        footer: "We clean every surface, cabinet, appliance, and floor so the property is spotless — giving landlords peace of mind and helping tenants secure their full security deposits.",
    },
    {
        icon: Leaf,
        title: "🌿 Green & Eco-Friendly Cleaning",
        description: "We care about your family's health and South Florida's environment. Our eco-friendly cleaning packages use non-toxic, biodegradable, EPA-certified products that are safe for children, pets, and those with allergies — without compromising on results.",
        listLabel: null,
        listItems: [],
        footer: null,
    },
    {
        icon: Sparkles,
        title: "Restaurant Cleaning",
        description: "Deep grease cleaning, sanitization, and health code compliance.",
        listLabel: null,
        listItems: [],
        footer: null,
    },
    {
        icon: Grid,
        title: "Carpet Cleaning",
        description: "Deep steam cleaning to remove stains and allergens.",
        listLabel: null,
        listItems: [],
        footer: null,
    },
    {
        icon: Sparkles,
        title: "Floor Cleaning",
        description: "Stripping, waxing, and polishing for all floor types.",
        listLabel: null,
        listItems: [],
        footer: null,
    },
    {
        icon: Hammer,
        title: "Construction Cleaning",
        description: "Post-construction debris removal and detailed dusting.",
        listLabel: null,
        listItems: [],
        footer: null,
    },
    {
        icon: Shield,
        title: "Pressure Washing",
        description: "Exterior cleaning for driveways, walkways, and buildings.",
        listLabel: null,
        listItems: [],
        footer: null,
    },
    {
        icon: Home,
        title: "Window Cleaning",
        description: "Interior and exterior window cleaning for a streak-free shine.",
        listLabel: null,
        listItems: [],
        footer: null,
    },
    {
        icon: Building2,
        title: "Custom Services",
        description: "Tailored cleaning solutions for your specific needs.",
        listLabel: null,
        listItems: [],
        footer: null,
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
                            <p className="text-muted-foreground mb-4">{service.description}</p>

                            {service.listLabel && (
                                <p className="font-semibold text-primary mb-2 text-sm">{service.listLabel}</p>
                            )}
                            {service.listItems && service.listItems.length > 0 && (
                                <ul className="space-y-1.5 mb-4">
                                    {service.listItems.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {service.footer && (
                                <p className="text-muted-foreground text-sm italic mb-4">{service.footer}</p>
                            )}

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
