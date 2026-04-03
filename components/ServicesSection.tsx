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
        description: "A clean workplace isn't a luxury — it's a business necessity. Our commercial cleaning keeps your space professional, hygienic, and welcoming without disrupting your operations.",
        listLabel: "We serve:",
        listItems: [
            "Corporate offices and coworking spaces",
            "Medical, dental, and healthcare facilities",
            "Retail shops and showrooms",
            "Restaurants and hospitality venues",
            "Gyms, schools, and childcare facilities",
        ],
        footer: "We work evenings, weekends, and before business hours — on your schedule.",
    },
    {
        icon: Search,
        title: "🔍 Deep Cleaning Services Miami",
        description: "When a standard clean just won't cut it, our deep cleaning goes where others don't — grout lines, behind appliances, inside cabinets, ceiling fans, and every overlooked corner.",
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
        description: "Moving is stressful — let us handle the cleaning. Our move-in/move-out service covers every surface, cabinet, appliance, and floor so the property is spotless.",
        listLabel: "Great for:",
        listItems: [
            "Tenants looking to secure their full security deposit",
            "Landlords preparing a unit for new occupants",
            "Buyers wanting a fresh start in a new home",
        ],
        footer: "Serving Edgewater condos, Kendall family homes, and everywhere in between.",
    },
    {
        icon: Leaf,
        title: "🌿 Green & Eco-Friendly Cleaning",
        description: "We care about your family's health and South Florida's environment. Our eco-friendly packages use non-toxic, biodegradable, EPA-certified products safe for kids, pets, and allergy sufferers.",
        listLabel: "Why go green:",
        listItems: [
            "No harsh chemicals or toxic residues",
            "Safe for children, pets, and sensitive skin",
            "Better for Miami's air and waterways",
        ],
        footer: "Same powerful results — without the chemical footprint.",
    },
    {
        icon: Sparkles,
        title: "🍽️ Restaurant Cleaning",
        description: "Kitchens, dining areas, and restrooms demand a higher standard. Our restaurant cleaning tackles heavy grease, sanitizes food-contact surfaces, and keeps you health-code compliant.",
        listLabel: "We handle:",
        listItems: [
            "Hood and exhaust vent degreasing",
            "Kitchen equipment and floor scrubbing",
            "Dining room and restroom sanitization",
        ],
        footer: "Scheduled around your hours so service never interrupts business.",
    },
    {
        icon: Grid,
        title: "🧹 Carpet Cleaning",
        description: "Dirt, allergens, and odors hide deep in carpet fibers. Our hot-water extraction method reaches what vacuuming can't, leaving carpets fresh, bright, and dry within hours.",
        listLabel: "Includes:",
        listItems: [
            "Pre-treatment of stains and high-traffic zones",
            "Deep steam extraction cleaning",
            "Deodorizing and allergen reduction",
        ],
        footer: "Safe for all carpet types including wool, nylon, and berber.",
    },
    {
        icon: Sparkles,
        title: "✨ Floor Cleaning",
        description: "From hardwood to tile to vinyl, every floor type needs the right treatment. We strip old wax buildup, apply fresh protective coats, and restore the shine your floors deserve.",
        listLabel: "Floor types we service:",
        listItems: [
            "Hardwood — clean, condition, and polish",
            "Tile and grout — deep scrub and seal",
            "Vinyl and LVP — strip, wax, and buff",
        ],
        footer: "Regular floor maintenance extends the life of your flooring significantly.",
    },
    {
        icon: Hammer,
        title: "🔨 Construction Cleaning",
        description: "Post-construction sites need more than a broom. We remove dust, debris, adhesive residue, and fine particles left behind so your space is move-in ready from day one.",
        listLabel: "Our process covers:",
        listItems: [
            "Debris and material removal",
            "Fine dust wipe-down on all surfaces",
            "Window, fixture, and floor detailing",
        ],
        footer: "Available for residential builds, commercial fit-outs, and renovation projects.",
    },
    {
        icon: Shield,
        title: "💧 Pressure Washing",
        description: "Miami's humidity and salt air leave driveways, walkways, and building exteriors looking grimy fast. Our pressure washing blasts away mold, mildew, and stains to restore curb appeal.",
        listLabel: "We pressure wash:",
        listItems: [
            "Driveways, sidewalks, and parking lots",
            "Building facades and exterior walls",
            "Pool decks, patios, and fences",
        ],
        footer: "Soft-wash options available for delicate surfaces.",
    },
    {
        icon: Home,
        title: "🪟 Window Cleaning",
        description: "Streak-free windows make a big difference — inside and out. Our window cleaning team handles residential and commercial properties using professional tools for a spotless, clear finish.",
        listLabel: "Service includes:",
        listItems: [
            "Interior and exterior glass cleaning",
            "Screen removal and cleaning",
            "Sill and frame wipe-down",
        ],
        footer: "Available as a standalone service or add-on to any cleaning package.",
    },
    {
        icon: Building2,
        title: "⚙️ Custom Services",
        description: "Don't see exactly what you need? We build custom cleaning plans around your schedule, space, and specific requirements — no cookie-cutter packages.",
        listLabel: "Popular custom requests:",
        listItems: [
            "One-room or single-area cleanings",
            "Event setup and breakdown cleaning",
            "Recurring specialized maintenance",
        ],
        footer: "Contact us and we'll put together a plan that fits perfectly.",
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
