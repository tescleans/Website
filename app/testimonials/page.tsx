import { Quote, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { getGoogleReviews } from "@/lib/getReviews"

export default async function TestimonialsPage() {
    const reviews = await getGoogleReviews()

    return (
        <div className="pt-32 pb-24 min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50">Testimonials</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                        We pride ourselves on delivering total excellence. Here is what our clients have to say about our services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <Quote className="h-8 w-8 text-primary opacity-20" />
                                <div className="flex gap-1">
                                    {[...Array(review.rating.value)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>

                            <div className="flex-grow mb-8">
                                <p className="text-neutral-700 dark:text-neutral-300 italic leading-relaxed line-clamp-6">
                                    "{review.text}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-auto border-t border-neutral-100 dark:border-neutral-800 pt-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                                    {review.author.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col">
                                        <p className="font-bold text-neutral-900 dark:text-white text-sm">{review.author.name}</p>
                                        <span className="text-xs text-neutral-400">
                                            {formatDistanceToNow(new Date(review.publishedAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}