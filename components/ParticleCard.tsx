import React from 'react';
import { Particle, ParticleType } from '../types';
import { TYPE_COLORS } from '../constants';
import { motion } from 'framer-motion';

interface ParticleCardProps {
  particle: Particle;
  onClick: (particle: Particle) => void;
  isDimmed: boolean;
}

export const ParticleCard: React.FC<ParticleCardProps> = ({ particle, onClick, isDimmed }) => {
  return (
    <motion.div
      layoutId={`card-${particle.id}`}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(particle)}
      className={`
        relative p-2 sm:p-4 rounded-lg border backdrop-blur-md cursor-pointer transition-all duration-300
        ${TYPE_COLORS[particle.type]}
        ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100 shadow-lg shadow-black/20'}
        flex flex-col items-start justify-between h-24 sm:h-32
      `}
    >
      <div className="flex justify-between w-full">
        <span className="text-xs sm:text-sm font-bold opacity-70">{particle.mass}</span>
        <span className="text-xs sm:text-sm font-mono opacity-70">{particle.spin}</span>
      </div>
      
      <div className="self-center text-center">
        <h3 className="text-2xl sm:text-4xl font-black font-mono tracking-tighter">{particle.symbol}</h3>
        <p className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold mt-1 truncate max-w-[80px] sm:max-w-full">
          {particle.name}
        </p>
      </div>

      <div className="text-xs opacity-70 w-full text-right font-mono">
        {particle.charge}
      </div>
    </motion.div>
  );
};
