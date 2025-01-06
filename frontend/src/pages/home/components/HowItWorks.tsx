import React, { useEffect, useRef } from 'react';
import { Flag, LineChart, Trophy, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Flag,
    title: "Set Your Goals",
    description: "Define your daily, weekly, or custom goals. From fitness to learning, Streakly adapts to your unique lifestyle."
  },
  {
    icon: LineChart,
    title: "Track Your Progress",
    description: "Log your activities and monitor streaks with beautiful, intuitive visuals and analytics."
  },
  {
    icon: Trophy,
    title: "Celebrate Your Wins",
    description: "Receive reminders, unlock achievements, and share milestones with your community."
  },
  {
    icon: Zap,
    title: "Break the Barriers",
    description: "Analyze patterns, tackle challenges, and keep your streak alive with personalized insights."
  }
];

export default function HowItWorks() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from('.section-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 80%',
        }
      });
  
      // Animate timeline steps with sliding down effect
      gsap.utils.toArray('.timeline-step').forEach((step, index) => {
        gsap.from(step, {
          y: -100, // Slide down effect
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 75%', // Adjust visibility
            toggleActions: 'play none none reverse',
          }
        });
      });
  
      // Animate line drawing
      gsap.from('.timeline-line', {
        height: 0,
        duration: 1.5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
        }
      });
    }, timelineRef);


    return () => ctx.revert();
  }, []);

  return (
    <section ref={timelineRef} className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
        
        <div className="timeline-container relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line absolute left-8 top-0 w-1 bg-green-200 h-full transform -translate-x-1/2"></div>
          
          {/* Timeline steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="timeline-step relative flex items-start gap-8">
                {/* Timeline dot */}
                <div className="relative">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold z-10 relative shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <step.icon className="w-12 h-12 text-green-600 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}