import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GameScreenProps {
  instruction: string;
  duration: number;
  onComplete: (success: boolean) => void;
  children: React.ReactNode;
}

export const GameScreen: React.FC<GameScreenProps> = ({ instruction, duration, onComplete, children }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (showSplash) return;
    
    if (timeLeft <= 0) {
      onComplete(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 100);
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft, showSplash, onComplete]);

  if (showSplash) {
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center bg-black z-50"
      >
        <h2 className="text-4xl md:text-6xl font-black text-white text-center uppercase tracking-widest px-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {instruction}
        </h2>
      </motion.div>
    );
  }

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* Timer Bar */}
      <div className="h-2 w-full bg-gray-800">
        <motion.div 
          className="h-full bg-[#FF4444]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
      
      {/* Instruction Header */}
      <div className="bg-[#4CAF50] text-black font-bold text-center py-2 text-xl uppercase tracking-wider shadow-md z-10">
        {instruction}
      </div>

      {/* Game Content */}
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
}
