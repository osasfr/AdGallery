import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, X, Play, ExternalLink } from 'lucide-react';
import { MOCK_ADS, CATEGORIES } from './data';
import { AdCard } from './components/AdCard';
import { Ad } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);

  const filteredAds = useMemo(() => {
    return MOCK_ADS.filter((ad) => {
      const matchesCategory = selectedCategory === 'All' || ad.category === selectedCategory;
      const matchesSearch = 
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        ad.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (activeReelIndex !== null && reelContainerRef.current) {
      const target = reelContainerRef.current.children[activeReelIndex] as HTMLElement;
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, [activeReelIndex]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-20 py-4 sm:py-0 gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">AdGallery</h1>
                <p className="text-xs font-medium text-slate-500">Curated Advertising Feed</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns, brands, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-full text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filtering & Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <SlidersHorizontal className="w-4 h-4" />
            <span>{filteredAds.length} {filteredAds.length === 1 ? 'result' : 'results'}</span>
          </div>
        </div>

        {/* Ad Grid */}
        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAds.map((ad, idx) => (
              <AdCard key={ad.id} ad={ad} onClick={() => setActiveReelIndex(idx)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No advertisements found</h3>
            <p className="text-slate-500 max-w-sm">
              We couldn't find any ads matching "{searchQuery}" in the {selectedCategory} category.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-6 px-6 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-full hover:bg-slate-50 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

      </main>

      {/* Reel View Overlay */}
      {activeReelIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
          <button 
            onClick={() => setActiveReelIndex(null)}
            className="absolute top-6 right-6 z-[60] w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            ref={reelContainerRef}
            className="flex-1 overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
          >
            {filteredAds.map((ad, idx) => (
              <div key={ad.id} className="h-[100dvh] w-full snap-start relative bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={ad.imageUrl} 
                  alt={ad.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/95" />
                
                {ad.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                      <Play className="w-8 h-8 text-white ml-1 opacity-80" fill="currentColor" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 sm:p-10 sm:pb-16 flex flex-col gap-4 max-w-2xl mx-auto z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xl shadow-lg">
                      {ad.company.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg drop-shadow-md">{ad.company}</h4>
                      <p className="text-sm text-white/80 font-medium drop-shadow-md">Sponsored &bull; {ad.category}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg">{ad.title}</h2>
                  <p className="text-white/90 text-lg line-clamp-3 drop-shadow-md mb-2">{ad.description}</p>
                  
                  <a 
                    href={ad.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-transform active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto self-start shadow-xl"
                  >
                    {ad.ctaText}
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
