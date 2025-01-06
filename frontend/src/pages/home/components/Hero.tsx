import React, { useEffect, useRef } from 'react';
import { ArrowRight, Activity, Target, Trophy } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Animate stats card
      gsap.from('.stats-card', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'elastic.out(1, 0.75)'
      });

      // Animate floating elements
      gsap.to('.floating-icon', {
        y: -20,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        stagger: {
          each: 0.5,
          from: 'random'
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0">
        <Target className="floating-icon absolute top-1/4 left-1/4 w-8 h-8 text-green-400 opacity-30" />
        <Activity className="floating-icon absolute top-1/3 right-1/4 w-8 h-8 text-green-400 opacity-30" />
        <Trophy className="floating-icon absolute bottom-1/4 left-1/3 w-8 h-8 text-green-400 opacity-30" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="hero-content space-y-8 z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Track. Achieve.
              <span className="text-green-600 block">Celebrate Success!</span>
            </h1>
            <p className="text-xl text-gray-600">
              Turn your goals into streaks, and your streaks into achievements. Streakly makes consistency simple and rewarding!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-lg shadow-green-500/20">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToAbout}
                className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
          <div ref={statsRef} className="relative z-10">
            <div className="stats-card bg-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
              <div className="relative">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Current Streak</h3>
                      <p className="text-5xl font-bold text-green-600 mt-2">28 Days</p>
                    </div>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="relative">
                        <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${Math.random() * 40 + 60}%`,
                              opacity: 1 - (i * 0.1)
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                      { label: 'Goals', value: '12' },
                      { label: 'Completed', value: '8' },
                      { label: 'Streak', value: '28d' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-green-50 p-4 rounded-xl text-center">
                        <div className="text-xl font-bold text-green-600">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}