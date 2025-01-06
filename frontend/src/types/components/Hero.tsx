import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Achieve More, One Streak at a Time!
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Streakly helps you track, manage, and celebrate your goals seamlessly. 
              Stay consistent, build habits, and unlock your true potential.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors flex items-center justify-center">
                Start Your Streak Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" 
              alt="Productivity Illustration"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;