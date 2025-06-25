'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Service, TimeSlot } from '@/lib/types';
import { generateTimeSlots } from '@/lib/data';

interface DateTimePickerProps {
  service: Service;
  zipCode: string;
  onTimeSelect: (date: string, time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

export default function DateTimePicker({ 
  service, 
  zipCode, 
  onTimeSelect, 
  selectedDate, 
  selectedTime 
}: DateTimePickerProps) {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDateLocal, setSelectedDateLocal] = useState(selectedDate || '');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Generate next 14 days
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) { // Start from tomorrow
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    setAvailableDates(dates);
    
    if (!selectedDateLocal && dates.length > 0) {
      setSelectedDateLocal(dates[0]);
    }
  }, [selectedDateLocal]);

  useEffect(() => {
    if (selectedDateLocal) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const slots = generateTimeSlots(selectedDateLocal);
        setTimeSlots(slots);
        setLoading(false);
      }, 500);
    }
  }, [selectedDateLocal]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
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
          Select Date & Time
        </h2>
        <p className="text-gray-600">
          {service.name} • {service.duration} minutes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date Selection */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Choose Date</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {availableDates.map((date) => (
              <Button
                key={date}
                variant={selectedDateLocal === date ? "default" : "outline"}
                className="h-12 text-sm"
                onClick={() => setSelectedDateLocal(date)}
              >
                {formatDate(date)}
              </Button>
            ))}
          </div>
        </Card>

        {/* Time Selection */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Choose Time</h3>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {timeSlots.filter(slot => slot.available).map((slot) => (
                <Button
                  key={slot.time}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  className="h-10 text-sm"
                  onClick={() => onTimeSelect(selectedDateLocal, slot.time)}
                >
                  {formatTime(slot.time)}
                </Button>
              ))}
            </div>
          )}
          
          {!loading && timeSlots.filter(slot => slot.available).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No available times for this date.</p>
              <p className="text-sm">Please select another date.</p>
            </div>
          )}
        </Card>
      </div>

      {selectedDate && selectedTime && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-center text-green-800">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">
              Selected: {formatDate(selectedDate)} at {formatTime(selectedTime)}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}