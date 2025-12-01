import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Particle, ParticleType } from '../types';
import { PARTICLES, TYPE_COLORS_SOLID } from '../constants';

interface InteractionGraphProps {
  activeParticle: Particle | null;
}

// Simple force diagram visualizer using SVG
export const InteractionGraph: React.FC<InteractionGraphProps> = ({ activeParticle }) => {
  
  // Define positions for categories in a circle/layout
  const categories = [
    { type: ParticleType.QUARK, angle: 225, color: TYPE_COLORS_SOLID[ParticleType.QUARK] },
    { type: ParticleType.LEPTON, angle: 315, color: TYPE_COLORS_SOLID[ParticleType.LEPTON] },
    { type: ParticleType.GAUGE_BOSON, angle: 90, color: TYPE_COLORS_SOLID[ParticleType.GAUGE_BOSON] },
    { type: ParticleType.SCALAR_BOSON, angle: 180, center: true, color: TYPE_COLORS_SOLID[ParticleType.SCALAR_BOSON] },
  ];

  const getPosition = (type: ParticleType) => {
    if (type === ParticleType.SCALAR_BOSON) return { x: 200, y: 200 };
    if (type === ParticleType.GAUGE_BOSON) return { x: 200, y: 80 }; 
    if (type === ParticleType.QUARK) return { x: 100, y: 300 };
    if (type === ParticleType.LEPTON) return { x: 300, y: 300 };
    return { x: 0, y: 0 };
  };

  const lines = useMemo(() => {
    const paths = [];
    const bosonPos = getPosition(ParticleType.GAUGE_BOSON);
    const quarkPos = getPosition(ParticleType.QUARK);
    const leptonPos = getPosition(ParticleType.LEPTON);
    const higgsPos = getPosition(ParticleType.SCALAR_BOSON);

    // Connections representing interactions
    // Quarks <-> Bosons (Strong, Weak, EM)
    paths.push({ from: quarkPos, to: bosonPos, label: 'Strong, EM, Weak', id: 'q-b' });
    // Leptons <-> Bosons (Weak, EM)
    paths.push({ from: leptonPos, to: bosonPos, label: 'EM, Weak', id: 'l-b' });
    // Higgs -> Everything (Mass)
    paths.push({ from: higgsPos, to: bosonPos, label: 'Mass (W/Z)', id: 'h-b' });
    paths.push({ from: higgsPos, to: quarkPos, label: 'Mass', id: 'h-q' });
    paths.push({ from: higgsPos, to: leptonPos, label: 'Mass', id: 'h-l' });

    return paths;
  }, []);

  const isActive = (id: string) => {
    if (!activeParticle) return true;
    const type = activeParticle.type;
    // Highlight relevant paths
    if (type === ParticleType.QUARK && (id === 'q-b' || id === 'h-q')) return true;
    if (type === ParticleType.LEPTON && (id === 'l-b' || id === 'h-l')) return true;
    if (type === ParticleType.GAUGE_BOSON) return true; // Bosons mediate everything basically
    if (type === ParticleType.SCALAR_BOSON) return true; // Higgs touches all massive
    return false;
  };

  return (
    <div className="w-full h-[400px] flex items-center justify-center relative overflow-hidden bg-slate-900/50 rounded-xl border border-slate-800">
      <svg width="400" height="400" viewBox="0 0 400 400">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
          </marker>
        </defs>

        {/* Interaction Lines */}
        {lines.map((line) => (
          <g key={line.id} className="transition-opacity duration-500" style={{ opacity: isActive(line.id) ? 1 : 0.1 }}>
            <line
              x1={line.from.x}
              y1={line.from.y}
              x2={line.to.x}
              y2={line.to.y}
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
             <text 
               x={(line.from.x + line.to.x) / 2} 
               y={(line.from.y + line.to.y) / 2 - 10} 
               textAnchor="middle" 
               fill="#94a3b8" 
               fontSize="10"
               className="uppercase font-mono tracking-wider bg-slate-900"
             >
               {line.label}
             </text>
          </g>
        ))}

        {/* Nodes */}
        {categories.map((cat) => {
            const pos = getPosition(cat.type);
            const isDimmed = activeParticle && activeParticle.type !== cat.type;
            return (
              <g key={cat.type} className="transition-opacity duration-300" style={{ opacity: isDimmed ? 0.3 : 1 }}>
                <circle cx={pos.x} cy={pos.y} r="40" fill={cat.color + '20'} stroke={cat.color} strokeWidth="2" />
                <text x={pos.x} y={pos.y} dy="4" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" className="uppercase font-mono">
                  {cat.type.split(' ')[0]}
                </text>
              </g>
            );
        })}
      </svg>
      
      <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono">
        * Simplified Interaction Map
      </div>
    </div>
  );
};
