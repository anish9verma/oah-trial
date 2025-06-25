'use client';

import { BookingStep } from '@/lib/types';
import { Check } from 'lucide-react';

interface BookingProgressProps {
  steps: BookingStep[];
}

export default function BookingProgress({ steps }: BookingProgressProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${step.completed 
                    ? 'bg-primary text-primary-foreground' 
                    : step.current 
                      ? 'bg-primary/20 text-primary border-2 border-primary' 
                      : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {step.completed ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`
                mt-2 text-sm font-medium transition-colors duration-300
                ${step.current ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`
                w-16 h-0.5 mx-4 transition-colors duration-300
                ${steps[index + 1].completed || steps[index + 1].current 
                  ? 'bg-primary' 
                  : 'bg-muted'
                }
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}