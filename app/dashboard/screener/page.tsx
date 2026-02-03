"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock Data Type
type Product = {
    id: string
    title: string
    category: string
    price: number
    revenue: number
    reviews: number
    rating: number
    platform: "Amazon" | "AliExpress"
    image: string
}

export default function ScreenerPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        category: "all",
        minPrice: "",
        maxPrice: "",
    })

    // Fetch logic with optional preset
    const fetchProducts = async (preset?: string) => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (preset) {
                params.append("preset", preset)
            } else {
                if (filters.category && filters.category !== "all") params.append("category", filters.category)
                if (filters.minPrice) params.append("minPrice", filters.minPrice)
                if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)
            }

            const res = await fetch(`/api/products?${params.toString()}`)
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.error("Failed to fetch products:", error)
        } finally {
            // Small artificial delay to show off the skeletons effectively if the API is too fast locally
            setTimeout(() => setLoading(false), 300)
        }
    }

    // Initial fetch
    useEffect(() => {
        fetchProducts()
    }, [])

    const handleSearch = () => {
        fetchProducts()
    }

    const handleHiddenGems = () => {
        setFilters({ category: "all", minPrice: "", maxPrice: "" })
        fetchProducts("hidden_gems")
    }

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Product Screener</h1>
                    <p className="text-muted-foreground">
                        Find winning products based on data-driven criteria.
                    </p>
                </div>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                    <CardDescription>Refine your search to find the best opportunities.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <Select
                                value={filters.category}
                                onValueChange={(v) => setFilters({ ...filters, category: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="Electronics">Electronics</SelectItem>
                                    <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                                    <SelectItem value="Sports">Sports</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Min Price ($)</label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Max Price ($)</label>
                            <Input
                                type="number"
                                placeholder="1000"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            />
                        </div>
                        <div className="flex items-end gap-2">
                            <Button onClick={handleSearch} disabled={loading} className="flex-1">
                                {loading ? "Searching..." : <><Search className="mr-2 h-4 w-4" /> Search</>}
                            </Button>
                            <Button variant="outline" onClick={handleHiddenGems} disabled={loading} title="High Demand, Low Competition" className="flex-1 border-amber-500/50 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                <Sparkles className="mr-2 h-4 w-4" /> Hidden Gems
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Platform</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Est. Revenue</TableHead>
                                <TableHead className="text-right">Reviews</TableHead>
                                <TableHead className="text-right">Rating</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                // Skeleton Rows
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded" /><Skeleton className="h-4 w-[150px]" /></div></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                        <TableCell><Skeleton className="h-5 w-[60px] rounded-full" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-[70px] ml-auto" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-[40px] ml-auto" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-[30px] ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <Search className="h-8 w-8 mb-4 opacity-50" />
                                            <p className="text-lg font-medium">No products found</p>
                                            <p className="text-sm">Try adjusting your filters or use "Hidden Gems" to find opportunities.</p>
                                            <Button variant="link" onClick={() => {
                                                setFilters({ category: "all", minPrice: "", maxPrice: "" })
                                                fetchProducts()
                                            }}>
                                                Clear Filters
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar Fallback for Image */}
                                                <div className="h-10 w-10 overflow-hidden rounded bg-muted/50 border">
                                                    <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                                                </div>
                                                <span className="truncate max-w-[200px]" title={product.title}>{product.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                product.platform === 'Amazon' ? 'border-orange-500 text-orange-600' :
                                                    product.platform === 'AliExpress' ? 'border-red-500 text-red-600' : ''
                                            }>{product.platform}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">${product.price.toFixed(2)}</TableCell>
                                        <TableCell className="text-right text-green-600 font-semibold">${product.revenue.toLocaleString()}</TableCell>
                                        <TableCell className="text-right text-muted-foreground">{product.reviews.toLocaleString()}</TableCell>
                                        <TableCell className="text-right flex justify-end items-center gap-1">
                                            <span className="font-medium">{product.rating}</span>
                                            <span className="text-yellow-500">★</span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
