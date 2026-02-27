
import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://tescleans.com";

    // Static routes
    const routes = [
        "",
        "/about",
        "/services",
        "/work",
        "/testimonials",
        "/contact",
        "/blog",
        "/faqs",
        "/book",
        "/careers",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Blog posts
    const posts = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...routes, ...posts];
}