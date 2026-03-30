import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Total Excellence</h3>
                        <p className="text-gray-300 text-sm">
                            Cleaning with a Spirit of Excellence. Serving South Florida Since 2008.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-white">Services</Link></li>
                            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                            <li><Link href="/faqs" className="hover:text-white">FAQ</Link></li>
                            <li><Link href="/work" className="hover:text-white">Our Work</Link></li>
                            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>Residential Cleaning</li>
                            <li>Commercial Cleaning</li>
                            <li>Move-In / Move-Out</li>
                            <li>Post Construction</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                                <span>6625 Miami Lakes Drive, Suite 411,<br />Miami Lakes, FL 33014</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" />
                                <a href="tel:7862861851">(786) 286-1851</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0" />
                                <a href="mailto:Info@tescleans.com">Info@tescleans.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Total Excellence Services Inc. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></Link>
                        <Link href="#" className="hover:text-white"><Instagram className="h-5 w-5" /></Link>
                        <Link href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
