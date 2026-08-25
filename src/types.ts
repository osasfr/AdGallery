export type AdType = 'banner' | 'video' | 'native';

export interface Ad {
  id: string;
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  category: string;
  type: AdType;
  ctaText: string;
  targetUrl: string;
}
