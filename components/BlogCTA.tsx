
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";

export default function BlogCTA() {
    return (
        <section className="my-12 bg-primary rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 font-outfit">
                        Ready to Experience the Difference?
                    </h3>
                    <p className="text-white/80 text-lg mb-6 max-w-xl">
                        Let Tes Cleaning handle the dirty work so you can focus on what matters most.
                        Contact us today for a free, no-obligation quote.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="tel:7862861851"
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            (786) 286-1851
                        </Link>

                        <Link
                            href="mailto:info@tescleans.com"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            Email Us
                        </Link>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <Link href="/#contact" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <span className="uppercase tracking-widest text-sm font-semibold">Get a Quote</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}