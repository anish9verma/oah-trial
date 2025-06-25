'use client';

import { useState, useEffect } from 'react';
import { BookingData, BookingStep, Address, Service, Provider } from '@/lib/types';
import { providers } from '@/lib/data';
import BookingProgress from '@/components/booking/BookingProgress';
import AddressInput from '@/components/booking/AddressInput';
import ServiceSelector from '@/components/booking/ServiceSelector';
import DateTimePicker from '@/components/booking/DateTimePicker';
import ProviderCard from '@/components/booking/ProviderCard';
import BookingForm from '@/components/booking/BookingForm';
import ConfirmationScreen from '@/components/booking/ConfirmationScreen';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type BookingStepId = 'address' | 'service' | 'datetime' | 'provider' | 'booking' | 'confirmation';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<BookingStepId>('address');
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [bookingId, setBookingId] = useState<string>('');

  const steps: BookingStep[] = [
    { id: 'address', title: 'Location', completed: !!bookingData.address, current: currentStep === 'address' },
    { id: 'service', title: 'Service', completed: !!bookingData.service, current: currentStep === 'service' },
    { id: 'datetime', title: 'Date & Time', completed: !!bookingData.date && !!bookingData.time, current: currentStep === 'datetime' },
    { id: 'provider', title: 'Provider', completed: !!bookingData.provider, current: currentStep === 'provider' },
    { id: 'booking', title: 'Details', completed: !!bookingData.guestInfo, current: currentStep === 'booking' },
    { id: 'confirmation', title: 'Confirmation', completed: false, current: currentStep === 'confirmation' },
  ];

  const handleAddressSelect = (address: Address) => {
    setBookingData({ ...bookingData, address });
    setTimeout(() => setCurrentStep('service'), 500);
  };

  const handleServiceSelect = (service: Service) => {
    setBookingData({ ...bookingData, service });
    setTimeout(() => setCurrentStep('datetime'), 500);
  };

  const handleTimeSelect = (date: string, time: string) => {
    setBookingData({ ...bookingData, date, time });
    
    // Auto-assign provider
    const assignedProvider = providers[Math.floor(Math.random() * providers.length)];
    setBookingData(prev => ({ ...prev, provider: assignedProvider }));
    
    setTimeout(() => setCurrentStep('provider'), 500);
  };

  const handleProviderContinue = () => {
    setCurrentStep('booking');
  };

  const handleBookingSubmit = (guestInfo: { name: string; email: string; phone: string }, createProfile: boolean) => {
    setBookingData({ ...bookingData, guestInfo });
    
    // Generate booking ID
    const id = `OLI-${Date.now().toString().slice(-8)}`;
    setBookingId(id);
    
    setCurrentStep('confirmation');
  };

  const handleNewBooking = () => {
    setBookingData({});
    setBookingId('');
    setCurrentStep('address');
  };

  const canGoBack = currentStep !== 'address' && currentStep !== 'confirmation';
  const canGoForward = () => {
    switch (currentStep) {
      case 'address': return !!bookingData.address;
      case 'service': return !!bookingData.service;
      case 'datetime': return !!bookingData.date && !!bookingData.time;
      case 'provider': return !!bookingData.provider;
      default: return false;
    }
  };

  const goBack = () => {
    const stepOrder: BookingStepId[] = ['address', 'service', 'datetime', 'provider', 'booking'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const goForward = () => {
    const stepOrder: BookingStepId[] = ['address', 'service', 'datetime', 'provider', 'booking'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1 && canGoForward()) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {currentStep !== 'confirmation' && (
          <BookingProgress steps={steps} />
        )}

        <div className="mb-8">
          {currentStep === 'address' && (
            <AddressInput 
              onAddressSelect={handleAddressSelect}
              selectedAddress={bookingData.address}
            />
          )}

          {currentStep === 'service' && bookingData.address && (
            <ServiceSelector
              zipCode={bookingData.address.zipCode}
              onServiceSelect={handleServiceSelect}
              selectedService={bookingData.service}
            />
          )}

          {currentStep === 'datetime' && bookingData.service && bookingData.address && (
            <DateTimePicker
              service={bookingData.service}
              zipCode={bookingData.address.zipCode}
              onTimeSelect={handleTimeSelect}
              selectedDate={bookingData.date}
              selectedTime={bookingData.time}
            />
          )}

          {currentStep === 'provider' && bookingData.provider && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Assigned Provider
                </h2>
                <p className="text-gray-600">
                  We've matched you with the perfect provider for your needs
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <ProviderCard provider={bookingData.provider} isAssigned={true} />
              </div>
            </div>
          )}

          {currentStep === 'booking' && (
            <BookingForm
              bookingData={bookingData}
              onSubmit={handleBookingSubmit}
            />
          )}

          {currentStep === 'confirmation' && bookingId && (
            <ConfirmationScreen
              bookingData={bookingData}
              bookingId={bookingId}
              onNewBooking={handleNewBooking}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep !== 'confirmation' && (
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={!canGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep === 'provider' ? (
              <Button
                onClick={handleProviderContinue}
                className="flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : currentStep !== 'booking' && (
              <Button
                onClick={goForward}
                disabled={!canGoForward()}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}