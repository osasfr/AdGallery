import React from 'react';
import { Ad } from '../types';
import { ExternalLink, Play, Info } from 'lucide-react';

interface AdCardProps {
  ad: Ad;
  onClick: (ad: Ad) => void;
}

export function AdCard({ ad, onClick }: AdCardProps) {
  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 transform hover:-translate-y-1"
      onClick={() => onClick(ad)}
    >
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img 
          src={ad.imageUrl} 
          alt={ad.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Type Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md rounded-full">
            Sponsored
          </span>
          {ad.type === 'video' && (
            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full text-white shadow-lg">
              <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase overflow-hidden">
            {ad.company.charAt(0)}
          </div>
          <span className="text-sm font-medium text-slate-600">{ad.company}</span>
          <span className="mx-1.5 text-slate-300">&bull;</span>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {ad.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {ad.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
          {ad.description}
        </p>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-600 flex items-center gap-1.5 group-hover:gap-2 transition-all">
            {ad.ctaText}
            <ExternalLink className="w-4 h-4" />
          </span>
          <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" title="Why am I seeing this?">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
