'use client';

import { useState, useMemo } from 'react';
import { Package, TrendingUp, Search, Flame } from 'lucide-react';
import ProductCard, { Product } from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';

// Mock product data - in production, this would come from real APIs
const mockProducts: Product[] = [
    {
        id: '1',
        title: 'Wireless Earbuds Pro with Noise Cancellation',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
        price: 29.99,
        platform: 'amazon',
        category: 'electronics',
        salesCount: 125000,
        searchVolume: 890000,
        trendScore: 95,
        isHot: true,
    },
    {
        id: '2',
        title: 'LED Ring Light 18" with Tripod Stand',
        image: 'https://images.unsplash.com/photo-1598618356794-eb1720430eb4?w=400&h=400&fit=crop',
        price: 45.99,
        platform: 'aliexpress',
        category: 'electronics',
        salesCount: 87000,
        searchVolume: 450000,
        trendScore: 88,
        isHot: true,
    },
    {
        id: '3',
        title: 'Minimalist Leather Crossbody Bag',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
        price: 34.99,
        platform: 'amazon',
        category: 'fashion',
        salesCount: 65000,
        searchVolume: 320000,
        trendScore: 82,
        isHot: false,
    },
    {
        id: '4',
        title: 'Smart Home LED Strip Lights RGB',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        price: 18.99,
        platform: 'aliexpress',
        category: 'home',
        salesCount: 234000,
        searchVolume: 780000,
        trendScore: 91,
        isHot: true,
    },
    {
        id: '5',
        title: 'Portable Blender Personal Size',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop',
        price: 24.99,
        platform: 'google',
        category: 'home',
        salesCount: 156000,
        searchVolume: 520000,
        trendScore: 86,
        isHot: false,
    },
    {
        id: '6',
        title: 'Resistance Bands Set with Handles',
        image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop',
        price: 19.99,
        platform: 'amazon',
        category: 'sports',
        salesCount: 189000,
        searchVolume: 670000,
        trendScore: 84,
        isHot: false,
    },
    {
        id: '7',
        title: 'Vitamin C Serum with Hyaluronic Acid',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
        price: 15.99,
        platform: 'google',
        category: 'beauty',
        salesCount: 278000,
        searchVolume: 920000,
        trendScore: 93,
        isHot: true,
    },
    {
        id: '8',
        title: 'Magnetic Phone Car Mount Holder',
        image: 'https://images.unsplash.com/photo-1583573636246-18cb2246697f?w=400&h=400&fit=crop',
        price: 12.99,
        platform: 'aliexpress',
        category: 'electronics',
        salesCount: 145000,
        searchVolume: 380000,
        trendScore: 79,
        isHot: false,
    },
    {
        id: '9',
        title: 'Yoga Mat Non-Slip Premium Quality',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
        price: 28.99,
        platform: 'amazon',
        category: 'sports',
        salesCount: 98000,
        searchVolume: 410000,
        trendScore: 77,
        isHot: false,
    },
    {
        id: '10',
        title: 'Reusable Silicone Food Storage Bags',
        image: 'https://images.unsplash.com/photo-1610141058822-fc92c1c2622f?w=400&h=400&fit=crop',
        price: 16.99,
        platform: 'google',
        category: 'home',
        salesCount: 167000,
        searchVolume: 290000,
        trendScore: 81,
        isHot: false,
    },
    {
        id: '11',
        title: 'Posture Corrector Back Brace',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
        price: 22.99,
        platform: 'aliexpress',
        category: 'health',
        salesCount: 112000,
        searchVolume: 540000,
        trendScore: 89,
        isHot: true,
    },
    {
        id: '12',
        title: 'Kids Educational STEM Building Blocks',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
        price: 32.99,
        platform: 'amazon',
        category: 'toys',
        salesCount: 78000,
        searchVolume: 260000,
        trendScore: 75,
        isHot: false,
    },
];

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('trending');

    const filteredProducts = useMemo(() => {
        let filtered = [...mockProducts];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter((p) =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Platform filter
        if (selectedPlatform !== 'all') {
            filtered = filtered.filter((p) => p.platform === selectedPlatform);
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        // Sort
        switch (sortBy) {
            case 'trending':
                filtered.sort((a, b) => b.trendScore - a.trendScore);
                break;
            case 'sales':
                filtered.sort((a, b) => b.salesCount - a.salesCount);
                break;
            case 'searches':
                filtered.sort((a, b) => b.searchVolume - a.searchVolume);
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
        }

        return filtered;
    }, [searchQuery, selectedPlatform, selectedCategory, sortBy]);

    const hotProductsCount = mockProducts.filter((p) => p.isHot).length;
    const totalSearchVolume = mockProducts.reduce((acc, p) => acc + p.searchVolume, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Product Screener</h1>
                <p className="text-slate-400">Discover trending products across all platforms</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-500/20 flex items-center justify-center">
                        <Package className="text-white" size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{mockProducts.length}</div>
                        <div className="text-sm text-slate-400">Total Products</div>
                    </div>
                </div>
                <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Flame className="text-orange-400" size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{hotProductsCount}</div>
                        <div className="text-sm text-slate-400">Hot Products</div>
                    </div>
                </div>
                <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <TrendingUp className="text-green-400" size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">95%</div>
                        <div className="text-sm text-slate-400">Avg Trend Score</div>
                    </div>
                </div>
                <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Search className="text-blue-400" size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{(totalSearchVolume / 1000000).toFixed(1)}M</div>
                        <div className="text-sm text-slate-400">Search Volume</div>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            <FilterPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-slate-400">
                    Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
                </p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="glass-card p-12 text-center">
                    <Search className="mx-auto text-slate-500 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                    <p className="text-slate-400">Try adjusting your filters or search query</p>
                </div>
            )}
        </div>
    );
}
