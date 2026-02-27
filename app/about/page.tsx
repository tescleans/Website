import Image from "next/image"

const team = [
    { name: "Patricia", role: "President and Training Manager", image: "/assets/team/patricia.png" },
    { name: "Jesse", role: "Vice President and Service Manager", image: "/assets/team/jesse.png" },
    { name: "Maria", role: "Staff", image: "/assets/team/maria.png" },
    { name: "Pedro", role: "Staff", image: "/assets/team/pedro.png" },
    { name: "Ashley", role: "Staff", image: "/assets/team/ashley.png" },
    { name: "Sarah", role: "Staff", image: "/assets/team/sarah.png" },
]

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Us</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Serving South Florida Since 2008. Total Excellence Services, Inc.
                    </p>
                </div>

                {/* Story */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                            Total Excelllence Services, Inc. was founded in April of 2008 and since 2013 we have been providing professional cleaning services for residential & commercial buildings.
                        </p>
                        <p>
                            Our Company’s goal is to professionally clean and service each of our customer’s facilities and buildings to the best of our abilities and in the highest standard possible. <span className="font-bold text-primary">“Cleaning with the Spirit of Excellence”</span>
                        </p>
                        <p>
                            At Total Excellence Services Inc., we understand that our customers want as few hassles as possible and therefore Total Excellence Services Inc. shall provide strong management and direction for each project to ensure services are delivered to you in a smooth and hassle free manner.
                        </p>
                    </div>
                    <div className="relative h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                        <Image src="/assets/sliderimages/3.jpg" alt="Tes Cleaning professional staff working together" fill className="object-cover" />
                    </div>
                </div>

                {/* Staff Training */}
                <div className="bg-primary text-white rounded-3xl p-8 md:p-12 mb-20">
                    <h2 className="text-3xl font-bold mb-6">Trained, Hardworking Professionals</h2>
                    <p className="text-gray-200 mb-4 leading-relaxed">
                        Our cleaning professionals are trained using the best training program in the industry called C.O.R.E. This method uses a variety of different training techniques that include reading material, video and hands-on training.
                    </p>
                    <p className="text-gray-200 leading-relaxed">
                        Our cleaning professionals have to pass written tests and practical tests as a condition of employment with us. We empower our employees by giving them the tools and techniques needed to make sure the job gets done right the first time. We only hire the best and we only retain the best. Each professional cleaning team consists of 2 to 4 fully trained, fully insured cleaning professionals. Each team has it's own team leader and we also have a full-time, dedicated quality control manager.
                    </p>
                </div>

                {/* Team Grid */}
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {team.map((member, i) => (
                            <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                                {member.image ? (
                                    <div className="w-20 h-20 relative rounded-full mx-auto mb-4 overflow-hidden ring-2 ring-primary/20">
                                        <Image src={member.image} alt={`${member.name} - ${member.role} at Tes Cleaning`} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-400">
                                        {member.name[0]}
                                    </div>
                                )}
                                <h3 className="font-bold text-primary">{member.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}