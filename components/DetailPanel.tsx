import React from 'react';
import { Particle, ParticleType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Atom, Zap, Scale, Clock, History } from 'lucide-react';
import { TYPE_COLORS_SOLID } from '../constants';

interface DetailPanelProps {
  particle: Particle | null;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ particle, onClose }) => {
  return (
    <AnimatePresence>
      {particle && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-slate-900 border-l border-slate-700 z-50 overflow-y-auto shadow-2xl"
          >
            <div className="p-6 md:p-8">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="mt-8">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ 
                    backgroundColor: `${TYPE_COLORS_SOLID[particle.type]}33`, 
                    color: TYPE_COLORS_SOLID[particle.type] 
                  }}
                >
                  {particle.type}
                </span>

                <h2 className="text-5xl font-black mb-2 font-mono text-white flex items-center gap-4">
                  {particle.symbol}
                  <span className="text-2xl font-sans font-normal opacity-50">{particle.name}</span>
                </h2>

                <p className="text-slate-300 text-lg leading-relaxed mt-6">
                  {particle.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                   <InfoItem icon={<Scale size={18} />} label="Mass" value={particle.mass} />
                   <InfoItem icon={<Zap size={18} />} label="Charge" value={particle.charge} />
                   <InfoItem icon={<Atom size={18} />} label="Spin" value={particle.spin} />
                   <InfoItem icon={<History size={18} />} label="Discovered" value={particle.discovered} />
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-blue-400" /> Fundamental Interactions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {particle.interactions.map(force => (
                      <span key={force} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">
                        {force}
                      </span>
                    ))}
                  </div>
                </div>

                {particle.type !== ParticleType.GAUGE_BOSON && particle.type !== ParticleType.SCALAR_BOSON && (
                   <div className="mt-8 pt-8 border-t border-slate-800">
                     <h3 className="text-lg font-bold text-white mb-4">Generation</h3>
                     <div className="flex items-center gap-4">
                       {['I', 'II', 'III'].map((gen) => (
                         <div 
                            key={gen}
                            className={`
                              w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2
                              ${particle.generation === gen 
                                ? 'border-blue-500 bg-blue-500/20 text-blue-200' 
                                : 'border-slate-700 text-slate-700'}
                            `}
                         >
                           {gen}
                         </div>
                       ))}
                     </div>
                     <p className="text-sm text-slate-500 mt-2">
                       {particle.generation === 'I' && 'Stable matter is made of generation I particles.'}
                       {particle.generation === 'II' && 'Heavier, unstable versions of generation I.'}
                       {particle.generation === 'III' && 'The heaviest and most unstable generation.'}
                     </p>
                   </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wide mb-1">
      {icon} {label}
    </div>
    <div className="text-lg font-mono font-semibold text-slate-100">{value}</div>
  </div>
);
