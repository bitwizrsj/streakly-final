import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import WhyChoose from './components/WhyChoose';
import Footer from './components/Footer';


function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
      <Hero />
      <About />
      <HowItWorks />
      <WhyChoose />
      </main>
      <Footer />
    </div>
  );
}

export default Home;