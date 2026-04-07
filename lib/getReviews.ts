export interface Review {
    id: string
    author: {
        name: string
        avatarUrl: string | null
    }
    text: string
    rating: {
        value: number
    }
    publishedAt: string
}

export interface FeaturableResponse {
    widget: {
        reviews: Review[]
    }
}

export async function getGoogleReviews(): Promise<Review[]> {
    try {
        const res = await fetch(
            "https://featurable.com/api/v2/widgets/f959fee1-3ba2-4c22-bc7d-6c4ba8119dfa",
            { next: { revalidate: 3600 } }
        )
        if (!res.ok) return [];
        const data: FeaturableResponse = await res.json()
        return data.widget.reviews ?? [];
    } catch (error) {
        console.error("Error fetching reviews:", error)
        return []
    }
}
