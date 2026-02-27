
import { blogPosts } from "@/lib/blogData";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cleaning Tips & News | Tes Cleaning Blog",
    description: "Expert cleaning advice for commercial and residential spaces in Miami Lakes and South Florida. Learn about maintaining a clean, healthy environment.",
    openGraph: {
        title: "Cleaning Tips & News | Tes Cleaning Blog",
        description: "Expert cleaning advice for commercial and residential spaces in Miami Lakes and South Florida.",
        url: "https://tescleans.com/blog",
        siteName: "Tes Cleaning",
        locale: "en_US",
        type: "website",
    },
};

export default function BlogListingPage() {
    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-outfit">
                        Latest Cleaning Insights
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        Expert tips, industry news, and guides to help you maintain a cleaner, healthier space.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                        {post.category}
                                    </span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                </div>

                                <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center text-blue-600 font-semibold mt-auto">
                                    Read Article
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}