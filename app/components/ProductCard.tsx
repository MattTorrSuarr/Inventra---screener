import { TrendingUp, ShoppingCart, Search, Flame } from 'lucide-react';

export interface Product {
    id: string;
    title: string;
    image: string;
    price: number;
    platform: 'amazon' | 'aliexpress' | 'google';
    category: string;
    salesCount: number;
    searchVolume: number;
    trendScore: number;
    isHot: boolean;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const platformBadgeClass = {
        amazon: 'badge-amazon',
        aliexpress: 'badge-aliexpress',
        google: 'badge-google',
    }[product.platform];

    const platformLabel = {
        amazon: 'Amazon',
        aliexpress: 'AliExpress',
        google: 'Google Trends',
    }[product.platform];

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <div className="glass-card glass-card-hover p-4 group">
            {/* Hot Badge */}
            {product.isHot && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                    <Flame size={12} className="animate-pulse" />
                    HOT
                </div>
            )}

            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-800 mb-4">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-semibold ${platformBadgeClass}`}>
                    {platformLabel}
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
                <h3 className="text-white font-medium line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {product.title}
                </h3>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 px-2 py-1 bg-slate-800 rounded-full">
                        {product.category}
                    </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-700">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-green-400">
                            <ShoppingCart size={14} />
                            <span className="text-sm font-semibold">{formatNumber(product.salesCount)}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Sales</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-400">
                            <Search size={14} />
                            <span className="text-sm font-semibold">{formatNumber(product.searchVolume)}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Searches</span>
                    </div>
                    <div className="text-center">
                        <div className={`flex items-center justify-center gap-1 ${product.trendScore >= 80 ? 'trending-hot' : 'trending-up'}`}>
                            <TrendingUp size={14} />
                            <span className="text-sm font-semibold">{product.trendScore}%</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Trend</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
