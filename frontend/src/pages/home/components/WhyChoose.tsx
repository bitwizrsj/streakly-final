import React from 'react';
import { UserCircle, BarChart2, Users, Smartphone } from 'lucide-react';

export default function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why Choose Streakly?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: UserCircle,
              title: "Personalized Experience",
              description: "Tailor your goals and tracking preferences to match your journey."
            },
            {
              icon: BarChart2,
              title: "Insightful Analytics",
              description: "Understand your habits with detailed charts and actionable insights."
            },
            {
              icon: Users,
              title: "Community Support",
              description: "Connect with goal-setters and achievers in our vibrant community."
            },
            {
              icon: Smartphone,
              title: "Mobile-Friendly",
              description: "Access Streakly on the go with our responsive design and mobile app."
            }
          ].map((feature, index) => (
            <div key={index} className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <feature.icon className="w-12 h-12 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="inline-block bg-green-50 rounded-full px-8 py-4">
            <span className="text-xl font-semibold text-green-600">1,000+ Users Achieving Goals Daily!</span>
          </div>
        </div>
      </div>
    </section>
  );
}