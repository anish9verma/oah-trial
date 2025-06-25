'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, Phone, UserPlus } from 'lucide-react';
import { BookingData } from '@/lib/types';

interface BookingFormProps {
  bookingData: BookingData;
  onSubmit: (guestInfo: { name: string; email: string; phone: string }, createProfile: boolean) => void;
}

export default function BookingForm({ bookingData, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [createProfile, setCreateProfile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(formData, createProfile);
    setIsSubmitting(false);
  };

  const formatPrice = (priceRange: string) => {
    return priceRange.split('-')[0]; // Take the lower end for display
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const displayHour = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Complete Your Booking
        </h2>
        <p className="text-gray-600">
          Just a few details and you're all set
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Summary */}
        <Card className="p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{bookingData.service?.name}</p>
                <p className="text-sm text-gray-600">{bookingData.service?.duration} minutes</p>
              </div>
              <p className="font-semibold">{formatPrice(bookingData.service?.priceRange || '')}</p>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Provider</span>
              </div>
              <p className="font-medium">{bookingData.provider?.name}</p>
              <p className="text-sm text-gray-600">{bookingData.provider?.title}</p>
            </div>
            
            <div className="pt-4 border-t">
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{bookingData.date && formatDate(bookingData.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{bookingData.time && formatTime(bookingData.time)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{bookingData.address?.formatted}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Your Information</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10"
                  placeholder="(555) 123-4567"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Checkbox
                id="createProfile"
                checked={createProfile}
                onCheckedChange={(checked) => setCreateProfile(checked as boolean)}
              />
              <Label htmlFor="createProfile" className="text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Create a profile for faster future bookings
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Booking...' : 'Confirm Booking'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}