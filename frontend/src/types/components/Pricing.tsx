import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    features: [
      'Track up to 3 habits',
      'Basic analytics',
      'Community access',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    price: '9.99',
    features: [
      'Unlimited habit tracking',
      'Advanced analytics',
      'Priority support',
      'Custom reminders',
      'Progress sharing'
    ]
  },
  {
    name: 'Premium',
    price: '19.99',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'White-label options'
    ]
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 ${
                index === 1 ? 'border-2 border-indigo-600 transform md:-translate-y-4' : ''
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="ml-1 text-gray-600">/month</span>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full py-3 px-6 rounded-full text-center ${
                index === 1
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
              } transition-colors`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;