import { ShoppingBag, TrendingUp, Award } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Discover Your <br />
                            <span className="text-yellow-300">Perfect Style</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100">
                            Explore the latest fashion trends for men and women. Quality products at unbeatable prices.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="px-8 py-3 bg-white text-primary-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                                Shop Now
                            </button>
                            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary-600 transition-all">
                                View Collection
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold">500+</div>
                                <div className="text-sm text-blue-200">Products</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">10K+</div>
                                <div className="text-sm text-blue-200">Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">4.8★</div>
                                <div className="text-sm text-blue-200">Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Features */}
                    <div className="space-y-4 animate-slide-up">
                        <FeatureCard
                            icon={<ShoppingBag className="w-6 h-6" />}
                            title="Free Shipping"
                            description="On orders over Rp 500.000"
                        />
                        <FeatureCard
                            icon={<TrendingUp className="w-6 h-6" />}
                            title="Trending Products"
                            description="Latest fashion collection 2025"
                        />
                        <FeatureCard
                            icon={<Award className="w-6 h-6" />}
                            title="Quality Guarantee"
                            description="100% authentic products"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-blue-100">{description}</p>
            </div>
        </div>
    );
}