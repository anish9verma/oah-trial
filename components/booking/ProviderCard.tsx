'use client';

import { Provider } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import Image from 'next/image';

interface ProviderCardProps {
  provider: Provider;
  isAssigned?: boolean;
}

export default function ProviderCard({ provider, isAssigned = false }: ProviderCardProps) {
  return (
    <Card className={`p-6 ${isAssigned ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={provider.imageUrl}
            alt={provider.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{provider.name}</h3>
              {isAssigned && (
                <Badge variant="default" className="text-xs">
                  Assigned
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{provider.title}</p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{provider.rating}</span>
              <span className="text-sm text-gray-500">(50+ reviews)</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 leading-relaxed">
            {provider.bio}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {provider.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Available in your area</span>
          </div>
        </div>
      </div>
    </Card>
  );
}