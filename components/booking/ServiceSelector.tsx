'use client';

import { Service } from '@/lib/types';
import { services } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface ServiceSelectorProps {
  zipCode: string;
  onServiceSelect: (service: Service) => void;
  selectedService?: Service;
}

export default function ServiceSelector({ zipCode, onServiceSelect, selectedService }: ServiceSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Choose Your Service
        </h2>
        <p className="text-gray-600">
          Available in your area • {zipCode}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card 
            key={service.id}
            className={`
              group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1
              ${selectedService?.id === service.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'hover:shadow-md'
              }
            `}
            onClick={() => onServiceSelect(service)}
          >
            <div className="p-0">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    {service.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {service.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{service.priceRange}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  variant={selectedService?.id === service.id ? "default" : "outline"}
                >
                  {selectedService?.id === service.id ? 'Selected' : 'Select Service'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No services available in your area yet.</p>
          <p className="text-sm text-gray-400 mt-1">We're expanding our coverage soon!</p>
        </div>
      )}
    </div>
  );
}