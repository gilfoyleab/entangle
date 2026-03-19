'use client';

import { Scene } from '@/components/canvas/Scene';
import { useEffect, useState } from 'react';
import { Network, Zap, Shield } from 'lucide-react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(scrollY / maxScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative w-full bg-[#020205] font-sans text-white h-[350vh]">
      
      {/* 3D Background - Fixed behind everything */}
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <Scene />
      </div>

      {/* Navbar - Fixed */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 pointer-events-auto bg-gradient-to-b from-[#020205] to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#00d2ff] to-[#ff1a66] animate-pulse" />
          </div>
          <span className="font-semibold tracking-widest text-lg">ENTANGLE</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <span className="hover:text-white cursor-pointer transition-colors">Subnets <span className="text-xs">▾</span></span>
          <span className="hover:text-white cursor-pointer transition-colors">Ecosystem <span className="text-xs">▾</span></span>
          <span className="hover:text-white cursor-pointer transition-colors">Community <span className="text-xs">▾</span></span>
          <span className="hover:text-white cursor-pointer transition-colors">Docs</span>
        </nav>

        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</button>
          <button className="text-sm font-medium bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-200 transition-colors">Sign up</button>
        </div>
      </header>

      {/* Page Content Layers */}
      <div className="relative z-10 w-full flex flex-col pointer-events-none">
        
        {/* Hero Section (Fades out) */}
        <section 
          className="h-screen flex flex-col items-center justify-center text-center px-4 md:mt-[-5vh] transition-opacity duration-300 pointer-events-auto"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          <h1 className="text-5xl md:text-[5.5rem] font-medium tracking-tight mb-6 leading-[1.1]">
            ENTANGLED IN <br />
            <span className="text-gray-400">THE COSMOS</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-8">
            The quantum entanglement of Miners and Validators. <br />
            Decentralizing AI, delivering fast, flexible, and efficient compute.
          </p>
          <div className="flex flex-col items-center animate-bounce text-gray-500 mt-12">
            <span className="text-xs tracking-widest uppercase mb-4 font-semibold">Scroll to Unentangle</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
          </div>
        </section>

        {/* Feature 1 - Minerals / Miners */}
        <section 
          className="h-screen flex items-center px-8 md:px-32 transition-opacity duration-700 pointer-events-auto"
          style={{ 
             opacity: Math.max(0, Math.min(1, (scrollProgress - 0.15) * 4)),
             transform: `translateY(${(1 - Math.min(1, Math.max(0, (scrollProgress - 0.15) * 4))) * 50}px)`
          }}
        >
          <div className="max-w-xl glass-panel p-10 rounded-3xl border-l-4 border-l-[#00d2ff] bg-black/40 backdrop-blur-xl pointer-events-auto">
            <div className="w-12 h-12 rounded-full bg-[#00d2ff]/20 flex items-center justify-center mb-6">
              <Zap className="text-[#00d2ff] w-6 h-6" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-metallic-cyan">Data Providers</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Miners act as the fundamental blue energy core, constantly processing intelligence and expanding the universe's compute capacity. 
            </p>
          </div>
        </section>

        {/* Feature 2 - Validators */}
        <section 
          className="h-screen flex items-center justify-end px-8 md:px-32 transition-opacity duration-700 pointer-events-auto"
          style={{ 
             opacity: Math.max(0, Math.min(1, (scrollProgress - 0.45) * 4)),
             transform: `translateY(${(1 - Math.min(1, Math.max(0, (scrollProgress - 0.45) * 4))) * 50}px)`
          }}
        >
          <div className="max-w-xl glass-panel p-10 rounded-3xl border-r-4 border-r-[#ff1a66] bg-black/40 backdrop-blur-xl pointer-events-auto">
            <div className="w-12 h-12 rounded-full bg-[#ff1a66]/20 flex items-center justify-center mb-6">
              <Shield className="text-[#ff1a66] w-6 h-6" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-metallic-magenta">The Validators</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Red energy fields representing strict consensus. Validators cryptographically evaluate the network, ensuring the whole ecosystem scales honestly.
            </p>
          </div>
        </section>

        <section className="h-[50vh]" />
        
      </div>
    </main>
  );
}
