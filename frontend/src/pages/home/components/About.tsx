import React from 'react';
import { Target, Activity, BarChart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What is Streakly?</h2>
          <p className="text-xl text-gray-600">
            Streakly is your ultimate habit-tracking and productivity companion. We help you stay focused, 
            build momentum, and achieve your goals by turning your progress into streaks. With Streakly, 
            goal-setting becomes fun, efficient, and rewarding.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Goal Setting",
              description: "Set and customize your goals with our intuitive interface"
            },
            {
              icon: Activity,
              title: "Progress Tracking",
              description: "Monitor your daily activities and build lasting habits"
            },
            {
              icon: BarChart,
              title: "Analytics",
              description: "Gain insights from detailed progress analytics"
            }
          ].map((feature, index) => (
            <div key={index} className="p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <feature.icon className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}