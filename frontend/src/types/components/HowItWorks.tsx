import React from 'react';
import { Target, CheckCircle, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Set your goals',
    description: 'Define clear, achievable goals that align with your aspirations.'
  },
  {
    icon: CheckCircle,
    title: 'Track your progress',
    description: 'Log your daily activities and watch your streak grow day by day.'
  },
  {
    icon: Trophy,
    title: 'Celebrate success',
    description: 'Reach milestones, earn rewards, and stay motivated on your journey.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Three simple steps to transform your habits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 right-0 w-full h-0.5 bg-indigo-200" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;