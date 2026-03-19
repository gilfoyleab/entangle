import { Scene } from '@/components/canvas/Scene';

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-[#020205] overflow-hidden font-sans text-white">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 top-[10vh]">
        <Scene />
      </div>

      {/* Foreground UI Layer */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        
        {/* Navbar */}
        <header className="flex items-center justify-between px-6 md:px-12 py-6 pointer-events-auto">
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



      </div>
    </main>
  );
}
