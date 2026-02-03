import { NextRequest, NextResponse } from "next/server"

// Extended Mock Data with varied stats for "Hidden Gems" testing
const MOCK_PRODUCTS = [
    {
        id: "1",
        title: "Portable Neck Fan",
        category: "Electronics",
        price: 24.99,
        revenue: 45000,
        reviews: 1200,
        rating: 4.5,
        platform: "Amazon",
        image: "https://placehold.co/50x50",
    },
    {
        id: "2",
        title: "Silicone Kitchen Utensil Set",
        category: "Home & Kitchen",
        price: 35.50,
        revenue: 12000,
        reviews: 450,
        rating: 4.2,
        platform: "Amazon",
        image: "https://placehold.co/50x50",
    },
    {
        id: "3",
        title: "Wireless Earbuds",
        category: "Electronics",
        price: 19.99,
        revenue: 85000,
        reviews: 3400,
        rating: 4.1,
        platform: "AliExpress",
        image: "https://placehold.co/50x50",
    },
    {
        id: "4",
        title: "Yoga Mat",
        category: "Sports",
        price: 15.00,
        revenue: 22000,
        reviews: 890,
        rating: 4.7,
        platform: "Amazon",
        image: "https://placehold.co/50x50",
    },
    {
        id: "5",
        title: "Smart Watch Band",
        category: "Electronics",
        price: 8.99,
        revenue: 60000,
        reviews: 5100,
        rating: 4.6,
        platform: "AliExpress",
        image: "https://placehold.co/50x50",
    },
    {
        id: "6",
        title: "Resistance Bands Set",
        category: "Sports",
        price: 12.99,
        revenue: 18000,
        reviews: 1500,
        rating: 4.4,
        platform: "Amazon",
        image: "https://placehold.co/50x50",
    },
    {
        id: "7",
        title: "Air Fryer Liners",
        category: "Home & Kitchen",
        price: 9.99,
        revenue: 30000,
        reviews: 2100,
        rating: 4.3,
        platform: "Amazon",
        image: "https://placehold.co/50x50",
    },
    // HIDDEN GEMS (High Revenue, Low Reviews)
    {
        id: "101",
        title: "Advanced Pet Grooming Kit",
        category: "Home & Kitchen",
        price: 49.99,
        revenue: 55000,
        reviews: 85, // Low reviews, High revenue
        rating: 4.8,
        platform: "Amazon",
        image: "https://placehold.co/50x50",
    },
    {
        id: "102",
        title: "Ergonomic Vertical Mouse",
        category: "Electronics",
        price: 29.99,
        revenue: 42000,
        reviews: 120, // Low-ish reviews
        rating: 4.6,
        platform: "AliExpress",
        image: "https://placehold.co/50x50",
    },
    {
        id: "103",
        title: "Collapsible Water Bottle",
        category: "Sports",
        price: 18.50,
        revenue: 38000,
        reviews: 60, // Very low competition
        rating: 4.5,
        platform: "Amazon",
        image: "https://placehold.co/50x50",
    },
]

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const preset = searchParams.get("preset") // 'hidden_gems'

    let filtered = [...MOCK_PRODUCTS]

    // Apply Preset Logic
    if (preset === "hidden_gems") {
        // Definition: Revenue > 30k AND Reviews < 150
        filtered = filtered.filter(p => p.revenue > 30000 && p.reviews < 150)
    }

    // Apply Standard Filters
    if (category && category !== "all") {
        filtered = filtered.filter((p) => p.category === category)
    }

    if (minPrice) {
        filtered = filtered.filter((p) => p.price >= parseFloat(minPrice))
    }

    if (maxPrice) {
        filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice))
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json(filtered)
}
