import React, { useState } from 'react';
import { motion } from 'motion/react';

interface StartScreenProps {
  onStart: (name: string) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center p-6 z-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div className="text-[40rem]">🎋</div>
      </div>

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center z-10 mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-black text-[#4CAF50] mb-4 drop-shadow-[0_0_15px_rgba(76,175,80,0.5)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          BAMBOO DOJO
        </h1>
        <p className="text-[#FFD700] text-xl md:text-2xl font-medium tracking-widest uppercase">
          Micro-Game Trainer
        </p>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900/80 p-8 rounded-2xl border-2 border-gray-700 backdrop-blur-sm z-10 w-full max-w-md text-center shadow-2xl"
      >
        <div className="text-6xl mb-6">🍣</div>
        <p className="text-gray-300 mb-8 italic">
          "The Bamboo Oracle judges you. Begin, if you dare."
        </p>
        
        <input 
          type="text" 
          placeholder="Enter your name, chef..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border-2 border-gray-600 rounded-lg p-4 text-white text-center text-xl mb-8 focus:border-[#4CAF50] focus:outline-none transition-colors"
          maxLength={15}
        />

        <button 
          onClick={() => onStart(name || 'Anonymous Chef')}
          className="w-full py-4 bg-[#4CAF50] text-black text-2xl font-black rounded-lg shadow-[0_6px_0_#2E7D32] active:shadow-none active:translate-y-2 transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name.trim()}
        >
          ENTER DOJO
        </button>
      </motion.div>
    </div>
  );
}
