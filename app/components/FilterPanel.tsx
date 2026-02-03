'use client';

import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedPlatform: string;
    setSelectedPlatform: (platform: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
}

const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'aliexpress', label: 'AliExpress' },
    { value: 'google', label: 'Google Trends' },
];

const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'sports', label: 'Sports' },
    { value: 'health', label: 'Health & Wellness' },
];

const sortOptions = [
    { value: 'trending', label: 'Most Trending' },
    { value: 'sales', label: 'Most Sold' },
    { value: 'searches', label: 'Most Searched' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
];

export default function FilterPanel({
    searchQuery,
    setSearchQuery,
    selectedPlatform,
    setSelectedPlatform,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
}: FilterPanelProps) {
    return (
        <div className="glass-card p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="text-white" size={20} />
                <h2 className="text-white font-semibold">Filter Products</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 transition-colors"
                    />
                </div>

                {/* Platform Filter */}
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-slate-500 transition-colors"
                    >
                        {platforms.map((platform) => (
                            <option key={platform.value} value={platform.value} className="bg-slate-800">
                                {platform.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-slate-500 transition-colors"
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value} className="bg-slate-800">
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Options */}
                <div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-slate-500 transition-colors"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value} className="bg-slate-800">
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
