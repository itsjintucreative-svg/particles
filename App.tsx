import React, { useState } from 'react';
import { Particle, ParticleType } from './types';
import { PARTICLES } from './constants';
import { ParticleCard } from './components/ParticleCard';
import { DetailPanel } from './components/DetailPanel';
import { ChatInterface } from './components/ChatInterface';
import { InteractionGraph } from './components/InteractionGraph';
import { Atom, MessageSquare, Box, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [selectedParticle, setSelectedParticle] = useState<Particle | null>(null);
  const [view, setView] = useState<'grid' | 'chat'>('grid');
  const [filter, setFilter] = useState<ParticleType | 'All'>('All');

  // Group particles for layout
  const fermions = PARTICLES.filter(p => p.type === ParticleType.QUARK || p.type === ParticleType.LEPTON);
  const bosons = PARTICLES.filter(p => p.type === ParticleType.GAUGE_BOSON || p.type === ParticleType.SCALAR_BOSON);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Atom className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Standard Model<span className="text-blue-500">Explorer</span></span>
          </div>

          <div className="flex bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === 'grid' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2"><Box size={16}/> Particles</span>
            </button>
            <button
              onClick={() => setView('chat')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === 'chat' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2"><MessageSquare size={16}/> AI Physicist</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 relative">
        <div className="max-w-7xl mx-auto">
          
          {view === 'grid' && (
            <div className="space-y-12">
              {/* Header / Intro */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
                    The Building Blocks of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Universe</span>
                  </h1>
                  <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                    Explore the fundamental particles that make up everything in existence. 
                    Click on any particle to discover its properties, interactions, and role in the cosmos.
                  </p>
                  
                  {/* Filters */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {['All', ParticleType.QUARK, ParticleType.LEPTON, ParticleType.GAUGE_BOSON].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          filter === f 
                            ? 'bg-slate-100 text-slate-900 border-slate-100' 
                            : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mini Interaction Graph Widget */}
                <div className="w-full md:w-1/3 hidden lg:block">
                  <InteractionGraph activeParticle={selectedParticle} />
                </div>
              </div>

              {/* The Standard Model Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Generations Column Labels (Visual helper) */}
                <div className="hidden lg:block absolute left-4 top-[320px] bottom-0 w-8 border-l border-slate-800"></div>

                {/* Fermions Grid (Quarks & Leptons) */}
                <div className="lg:col-span-3 space-y-8">
                  <div>
                    <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-bold">Fermions (Matter)</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {fermions
                        .filter(p => filter === 'All' || filter === p.type)
                        .map((particle) => (
                        <ParticleCard
                          key={particle.id}
                          particle={particle}
                          onClick={setSelectedParticle}
                          isDimmed={!!selectedParticle && selectedParticle.id !== particle.id}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bosons Column */}
                <div className="lg:col-span-1 space-y-8">
                  <div>
                    <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-bold">Bosons (Forces)</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                      {bosons
                         .filter(p => filter === 'All' || filter === p.type || (filter === ParticleType.GAUGE_BOSON && p.type === ParticleType.SCALAR_BOSON)) // Hack to show Higgs with Bosons
                         .map((particle) => (
                        <ParticleCard
                          key={particle.id}
                          particle={particle}
                          onClick={setSelectedParticle}
                          isDimmed={!!selectedParticle && selectedParticle.id !== particle.id}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'chat' && (
             <div className="max-w-3xl mx-auto pt-4">
               <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold mb-2">Ask the Physicist</h2>
                 <p className="text-slate-400">Powered by the Gemini neural network.</p>
               </div>
               <ChatInterface />
             </div>
          )}
        </div>
      </main>

      <DetailPanel 
        particle={selectedParticle} 
        onClose={() => setSelectedParticle(null)} 
      />
    </div>
  );
};

export default App;