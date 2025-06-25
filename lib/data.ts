import { Service, Provider, TimeSlot } from './types';

export const services: Service[] = [
  {
    id: 'massage-60',
    name: '60-Minute Therapeutic Massage',
    description: 'A full-body therapeutic massage designed to relieve tension, improve circulation, and promote deep relaxation.',
    duration: 60,
    priceRange: '$120-150',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Massage Therapy'
  },
  {
    id: 'massage-90',
    name: '90-Minute Deep Tissue Massage',
    description: 'Intensive deep tissue work targeting chronic muscle tension and specific problem areas.',
    duration: 90,
    priceRange: '$180-220',
    imageUrl: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Massage Therapy'
  },
  {
    id: 'facial-classic',
    name: 'Classic European Facial',
    description: 'A rejuvenating facial treatment including cleansing, exfoliation, extractions, and hydrating mask.',
    duration: 75,
    priceRange: '$100-130',
    imageUrl: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Skincare'
  },
  {
    id: 'manicure-gel',
    name: 'Gel Manicure',
    description: 'Long-lasting gel manicure with nail shaping, cuticle care, and professional color application.',
    duration: 45,
    priceRange: '$45-65',
    imageUrl: 'https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Nail Care'
  },
  {
    id: 'pedicure-spa',
    name: 'Spa Pedicure',
    description: 'Luxurious pedicure with foot soak, exfoliation, massage, and nail treatment.',
    duration: 60,
    priceRange: '$55-75',
    imageUrl: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Nail Care'
  },
  {
    id: 'wellness-consultation',
    name: 'Wellness Consultation',
    description: 'Personalized wellness assessment and treatment plan development with our certified practitioners.',
    duration: 30,
    priceRange: '$75-95',
    imageUrl: 'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wellness'
  }
];

export const providers: Provider[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'Licensed Massage Therapist',
    bio: 'With over 8 years of experience, Sarah specializes in therapeutic and deep tissue massage techniques.',
    imageUrl: 'https://images.pexels.com/photos/3985359/pexels-photo-3985359.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    specialties: ['Deep Tissue', 'Swedish', 'Sports Massage']
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    title: 'Certified Wellness Practitioner',
    bio: 'Michael combines traditional techniques with modern wellness approaches for holistic healing.',
    imageUrl: 'https://images.pexels.com/photos/5794051/pexels-photo-5794051.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    specialties: ['Therapeutic Massage', 'Wellness Coaching', 'Stress Relief']
  },
  {
    id: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    title: 'Master Esthetician',
    bio: 'Emily is passionate about skincare and has helped hundreds of clients achieve healthy, glowing skin.',
    imageUrl: 'https://images.pexels.com/photos/3985357/pexels-photo-3985357.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    specialties: ['Facial Treatments', 'Anti-Aging', 'Acne Treatment']
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    title: 'Licensed Nail Technician',
    bio: 'David brings creativity and precision to nail care with 6 years of professional experience.',
    imageUrl: 'https://images.pexels.com/photos/5794059/pexels-photo-5794059.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    specialties: ['Gel Manicures', 'Nail Art', 'Pedicures']
  }
];

// Simulated availability data
export const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 19;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const available = Math.random() > 0.3; // 70% availability
      const providerId = available ? providers[Math.floor(Math.random() * providers.length)].id : undefined;
      
      slots.push({
        time,
        available,
        providerId
      });
    }
  }
  
  return slots;
};

export const supportedZipCodes = [
  '90210', '90211', '90212', '90213', '90401', '90402', '90403',
  '10001', '10002', '10003', '10004', '10005', '10006', '10007',
  '60601', '60602', '60603', '60604', '60605', '60606', '60607',
  '33101', '33102', '33103', '33104', '33105', '33106', '33107',
  '75201', '75202', '75203', '75204', '75205', '75206', '75207'
];