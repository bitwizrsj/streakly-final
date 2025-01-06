import React from 'react';
import { Target, BarChart2, Users, Layers } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Effortlessly log and monitor your activities with our intuitive tracking system.'
  },
  {
    icon: BarChart2,
    title: 'Insightful Analytics',
    description: 'Get actionable insights into your habits with detailed progress reports and trends.'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Share and celebrate milestones with a supportive community of goal achievers.'
  },
  {
    icon: Layers,
    title: 'Flexible Plans',
    description: 'Choose from various plans designed to fit your unique needs and goals.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Features that Empower Your Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to build and maintain successful habits
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;