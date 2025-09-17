import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  initials: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule], // ✅ Add this
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      quote: `Buying my BMW 5 Series from AutoDrive was the best decision I made this year. The staff was professional, the paperwork was smooth, and I got my car delivered in just 2 days. Highly recommended!`,
      name: 'Mr. Shivam Kushwaha',
      role: 'Co-founder',
      company: 'Tractorwala Pvt Ltd',
      avatar: 'https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg',
      initials: 'SC'
    },
    {
      quote: `I traded in my old SUV for an Audi Q7 here. The valuation was fair and I drove home in my new car the same day. The dealership made everything easy and stress-free.`,
      name: 'Mr. Navdeep Kushwaha',
      role: 'Co-founder',
      company: 'Sarvodaya Inspire Pvt Ltd',
      avatar: 'https://i.pinimg.com/736x/71/22/c1/7122c1ac1382dea3563d776c1f158654.jpg',
      initials: 'MR'
    },
    {
      quote: `The customer service was excellent. They patiently answered all my questions and even offered me a free first service. I love my new Hyundai Creta!`,
      name: 'Mr. Dinesh Kushwaha ',
      role: 'Co-founder',
      company: 'Dk Associates',
     avatar: 'https://i.pinimg.com/1200x/f4/fd/90/f4fd908cd4b15090ee2c7ba71df8c033.jpg',
      initials: 'EW'
    }
    
  ];
}
