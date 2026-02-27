import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const packages = [
    {
        name: "Commercial Cleaning",
        price: "Contact for Quote",
        duration: "Flexible Schedule",
        features: ["Office Spaces", "Retail Stores", "Common Areas", "Sanitization"],
        color: "bg-blue-50 border-blue-100"
    },
    {
        name: "Residential Cleaning",
        price: "Contact for Quote",
        duration: "Flexible Schedule",
        features: ["Deep Cleaning", "Standard Maintenance", "Move-in/Move-out", "Attention to Detail"],
        color: "bg-green-50 border-green-100"
    },
    {
        name: "Restaurant Cleaning",
        price: "Contact for Quote",
        duration: "After Hours",
        features: ["Kitchen Deep Clean", "Dining Area", "Floor Degreasing", "Health Code Compliance"],
        color: "bg-orange-50 border-orange-100"
    },
    {
        name: "Carpet Cleaning",
        price: "Contact for Quote",
        duration: "Per Area",
        features: ["Steam Cleaning", "Stain Removal", "Odor Elimination", "Upholstery Options"],
        color: "bg-purple-50 border-purple-100"
    },
    {
        name: "Pressure Washing",
        price: "Contact for Quote",
        duration: "Per Job",
        features: ["Driveways & Walkways", "Building Exteriors", "Decks & Patios", "Graffiti Removal"],
        color: "bg-gray-50 border-gray-200"
    },
    {
        name: "Floor Cleaning",
        price: "Contact for Quote",
        duration: "Per Job",
        features: ["Stripping & Waxing", "Buffing & Polishing", "Tile & Grout", "All Surface Types"],
        color: "bg-indigo-50 border-indigo-100"
    },
    {
        name: "Construction Cleaning",
        price: "Contact for Quote",
        duration: "Project Based",
        features: ["Post-Construction", "Debris Removal", "Detailed Dusting", "Ready for Occupancy"],
        color: "bg-yellow-50 border-yellow-100"
    },
    {
        name: "Window Cleaning",
        price: "Contact for Quote",
        duration: "Per Job",
        features: ["Interior & Exterior", "Screens & Tracks", "Skylights", "Streak-Free Finish"],
        color: "bg-cyan-50 border-cyan-100"
    },
    {
        name: "Custom Services",
        price: "Contact for Quote",
        duration: "Tailored to You",
        features: ["Special Events", "Emergency Cleaning", "Specific Requests", "And More..."],
        color: "bg-rose-50 border-rose-100"
    }
]

const addOns = [
    "Laundry Wash & Dry",
    "Inside Cabinets",
    "Inside Fridge",
    "Inside Oven",
    "Interior Walls",
    "Interior Windows"
]

export default function ServicesPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Services</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Choose the perfect cleaning package for your needs. From routine maintenance to deep cleaning.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <div key={i} className={`rounded-3xl p-8 border ${pkg.color} relative overflow-hidden flex flex-col hover:shadow-lg transition-shadow`}>
                            <h3 className="text-2xl font-bold text-primary mb-2">{pkg.name}</h3>
                            <div className="text-3xl font-bold text-gray-900 mb-1">{pkg.price}</div>
                            <div className="text-sm text-muted-foreground mb-6">{pkg.duration}</div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {pkg.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-2 text-gray-700">
                                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/book" className="w-full">
                                <Button className="w-full" size="lg">Book Now</Button>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12">Additional Services</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {addOns.map((addon, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border shadow-sm">
                                <div className="h-2 w-2 rounded-full bg-secondary shrink-0"></div>
                                <span className="font-medium text-primary">{addon}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}