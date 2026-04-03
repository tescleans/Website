const reasons = [
    {
        title: "Rigorously Vetted, Trained Professionals",
        description: "Every cleaner is background-checked, reference-verified, and trained using our proprietary cleaning protocol. You'll always know exactly who is coming into your space.",
    },
    {
        title: "Our Satisfaction Guarantee: We Make It Right",
        description: "If you're not 100% happy with any part of your clean, contact us within 24 hours and we will return at absolutely no charge. No debates. No hassle. Just results.",
    },
    {
        title: "Upfront, Transparent Pricing",
        description: "You receive a detailed written quote before we start. What you see is what you pay — always. No surprise charges, no upselling at the door, no hidden fees.",
    },
    {
        title: "Consistent Teams Assigned to You",
        description: "Unlike companies that send a different stranger every time, we assign consistent cleaning professionals to your account so you build familiarity and trust with the same faces.",
    },
    {
        title: "Fully Licensed, Bonded & Insured",
        description: "We carry complete general liability insurance and workers' compensation. You're fully protected, and so are we. This is non-negotiable for us — and should be for you too.",
    },
    {
        title: "Miami-Born, Miami-Focused",
        description: "We're not a national chain on autopilot. We understand Miami's humidity, tile floors, mold risks, and open-concept layouts — and we clean accordingly.",
    },
]

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-semibold uppercase tracking-wide">Why Choose Us</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary">Why Miami Chooses Total Excellence Services, Inc</h2>
                    <p className="mt-4 text-muted-foreground">
                        There's no shortage of cleaning companies in Miami. So what makes us different? Here's what our clients tell us keeps them coming back.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <div key={index} className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-2xl mt-0.5 flex-shrink-0">✅</span>
                            <div>
                                <h3 className="text-lg font-bold text-primary mb-2">{reason.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
