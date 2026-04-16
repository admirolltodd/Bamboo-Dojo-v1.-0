import React from 'react';
import { motion } from 'motion/react';

interface OracleOverlayProps {
  message: string;
  isSuccess: boolean;
}

export const OracleOverlay: React.FC<OracleOverlayProps> = ({ message, isSuccess }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`absolute inset-0 flex flex-col items-center justify-center z-50 p-6 ${isSuccess ? 'bg-green-900/90' : 'bg-red-900/90'}`}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.8 }}
        animate={{ y: 0, scale: 1 }}
        className="text-8xl mb-8 filter drop-shadow-2xl relative"
      >
        🍣
        <div className="absolute -top-4 -right-4 text-4xl">🥢</div>
        <div className="absolute -top-2 left-2 text-2xl bg-white text-black px-2 rounded-sm font-bold transform -rotate-12">CHEF</div>
      </motion.div>
      
      <div className="bg-black/80 border-2 border-[#FFD700] p-6 rounded-lg max-w-2xl w-full shadow-2xl relative">
        <div className="absolute -top-3 left-4 bg-[#FFD700] text-black font-bold px-3 py-1 text-sm rounded-sm uppercase tracking-wider">
          The Bamboo Oracle
        </div>
        <p className="text-white text-xl md:text-2xl font-medium leading-relaxed font-sans text-center">
          "{message}"
        </p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-white/50 text-sm uppercase tracking-widest animate-pulse"
      >
        Preparing next trial...
      </motion.div>
    </motion.div>
  );
}
