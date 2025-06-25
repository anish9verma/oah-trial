'use client';

import { useState } from 'react';
import { MapPin, Check, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Address } from '@/lib/types';
import { supportedZipCodes } from '@/lib/data';

interface AddressInputProps {
  onAddressSelect: (address: Address) => void;
  selectedAddress?: Address;
}

export default function AddressInput({ onAddressSelect, selectedAddress }: AddressInputProps) {
  const [zipCode, setZipCode] = useState(selectedAddress?.zipCode || '');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const validateZipCode = async (zip: string) => {
    setIsValidating(true);
    setError('');
    
    // Simulate API validation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!supportedZipCodes.includes(zip)) {
      setError('Sorry, we don\'t currently service this area. We\'re expanding soon!');
      setIsValidating(false);
      return;
    }
    
    // Mock address data based on ZIP
    const mockAddresses: Record<string, Address> = {
      '90210': { zipCode: zip, city: 'Beverly Hills', state: 'CA', formatted: 'Beverly Hills, CA 90210' },
      '10001': { zipCode: zip, city: 'New York', state: 'NY', formatted: 'New York, NY 10001' },
      '60601': { zipCode: zip, city: 'Chicago', state: 'IL', formatted: 'Chicago, IL 60601' },
      '33101': { zipCode: zip, city: 'Miami', state: 'FL', formatted: 'Miami, FL 33101' },
      '75201': { zipCode: zip, city: 'Dallas', state: 'TX', formatted: 'Dallas, TX 75201' },
    };
    
    const address = mockAddresses[zip] || {
      zipCode: zip,
      city: 'Your City',
      state: 'ST',
      formatted: `Your City, ST ${zip}`
    };
    
    onAddressSelect(address);
    setIsValidating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length === 5) {
      validateZipCode(zipCode);
    }
  };

  const popularZips = ['90210', '10001', '60601', '33101', '75201'];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Where would you like your service?
          </h1>
          <p className="text-lg text-gray-600">
            Enter your ZIP code to see available services in your area
          </p>
        </div>
      </div>

      <Card className="p-6 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
              ZIP Code
            </label>
            <Input
              id="zipCode"
              type="text"
              value={zipCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setZipCode(value);
                setError('');
              }}
              placeholder="Enter your ZIP code"
              className="text-lg text-center"
              maxLength={5}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
          
          {selectedAddress && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <Check className="w-4 h-4" />
              <span>Service area confirmed: {selectedAddress.formatted}</span>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={zipCode.length !== 5 || isValidating}
          >
            {isValidating ? 'Validating...' : 'Check Availability'}
          </Button>
        </form>
      </Card>

      {showSuggestions && (
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-600 mb-3">Popular service areas:</p>
          <div className="flex flex-wrap gap-2">
            {popularZips.map((zip) => (
              <button
                key={zip}
                onClick={() => {
                  setZipCode(zip);
                  setShowSuggestions(false);
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {zip}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}