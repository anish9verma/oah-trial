'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Clock, MapPin, User, Mail, Phone } from 'lucide-react';
import { BookingData } from '@/lib/types';

interface ConfirmationScreenProps {
  bookingData: BookingData;
  bookingId: string;
  onNewBooking: () => void;
}

export default function ConfirmationScreen({ 
  bookingData, 
  bookingId, 
  onNewBooking 
}: ConfirmationScreenProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
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
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your appointment has been successfully scheduled
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Booking ID: <span className="font-mono">{bookingId}</span>
          </p>
        </div>
      </div>

      <Card className="p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Appointment Details</h2>
        
        <div className="space-y-6">
          {/* Service Details */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{bookingData.service?.name}</h3>
              <p className="text-gray-600">{bookingData.service?.duration} minutes</p>
              <p className="text-sm text-gray-500 mt-1">{bookingData.service?.description}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">
                {bookingData.date && formatDate(bookingData.date)}
              </h3>
              <p className="text-gray-600">
                {bookingData.time && formatTime(bookingData.time)}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Your Location</h3>
              <p className="text-gray-600">{bookingData.address?.formatted}</p>
              <p className="text-sm text-gray-500 mt-1">
                Your provider will arrive at your location
              </p>
            </div>
          </div>

          {/* Provider */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">{bookingData.provider?.name}</h3>
              <p className="text-gray-600">{bookingData.provider?.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                ⭐ {bookingData.provider?.rating} rating • {bookingData.provider?.specialties.join(', ')}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Your Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <span>{bookingData.guestInfo?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{bookingData.guestInfo?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{bookingData.guestInfo?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 max-w-2xl mx-auto bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• You'll receive a confirmation email with all the details</p>
          <p>• Your provider will call you 24 hours before your appointment</p>
          <p>• Please ensure someone is available at the scheduled time</p>
          <p>• If you need to reschedule, please call us at least 4 hours in advance</p>
        </div>
      </Card>

      <div className="flex justify-center gap-4">
        <Button onClick={onNewBooking} variant="outline" size="lg">
          Book Another Service
        </Button>
        <Button size="lg">
          View My Bookings
        </Button>
      </div>
    </div>
  );
}