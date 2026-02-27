import { Star, Check, UserCheck, Wallet } from "lucide-react"

const features = [
    {
        icon: Star,
        title: "Quality Cleaning",
        description: "We don't cut corners, we clean them. High standards for every job."
    },
    {
        icon: UserCheck,
        title: "Professional Staff",
        description: "Fully trained, vetted, and insured professionals you can trust."
    },
    {
        icon: Wallet,
        title: "Affordable Rates",
        description: "Premium service without the premium price tag. Competitive pricing."
    }
]

export default function Features() {
    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {features.map((f, i) => (
                        <div key={i} className="flex flex-col items-center p-6 space-y-4">
                            <div className="bg-secondary/20 p-4 rounded-full text-primary">
                                <f.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">{f.title}</h3>
                            <p className="text-muted-foreground">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}