import React, { useState, useCallback, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { OracleOverlay } from './components/OracleOverlay';
import { Leaderboard } from './components/Leaderboard';
import { Chatbot } from './components/Chatbot';
import { GAME_REGISTRY } from './games';
import { ORACLE_QUOTES } from './data';
import { playSuccess, playFail } from './utils/audio';
import { motion, AnimatePresence } from 'motion/react';

type GameState = 'start' | 'playing' | 'oracle' | 'leaderboard';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [oracleMessage, setOracleMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Pick a random game
  const pickNextGame = useCallback(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * GAME_REGISTRY.length);
    } while (nextIndex === currentGameIndex && GAME_REGISTRY.length > 1);
    setCurrentGameIndex(nextIndex);
  }, [currentGameIndex]);

  const handleStart = (name: string) => {
    setPlayerName(name);
    setScore(0);
    setLives(3);
    setCombo(0);
    pickNextGame();
    setGameState('playing');
  };

  const handleGameComplete = (success: boolean) => {
    setIsSuccess(success);
    
    if (success) {
      playSuccess();
      const points = 100 + (combo * 50);
      setScore(s => s + points);
      setCombo(c => c + 1);
      setOracleMessage(ORACLE_QUOTES.pass[Math.floor(Math.random() * ORACLE_QUOTES.pass.length)]);
    } else {
      playFail();
      setLives(l => l - 1);
      setCombo(0);
      setOracleMessage(ORACLE_QUOTES.fail[Math.floor(Math.random() * ORACLE_QUOTES.fail.length)]);
      
      // Trigger screen shake
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setGameState('oracle');

    // Wait for oracle reaction, then next game or game over
    setTimeout(() => {
      if (!success && lives <= 1) {
        setGameState('leaderboard');
      } else {
        pickNextGame();
        setGameState('playing');
      }
    }, 3000);
  };

  const CurrentGameComponent = GAME_REGISTRY[currentGameIndex].component;
  const currentInstruction = GAME_REGISTRY[currentGameIndex].instruction;
  
  // Difficulty scaling: reduce duration slightly based on score
  const durationMultiplier = Math.max(0.6, 1 - (score / 10000));
  const currentDuration = GAME_REGISTRY[currentGameIndex].duration * durationMultiplier;

  return (
    <div className={`w-full h-screen bg-black overflow-hidden relative font-sans ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
      `}} />

      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <StartScreen key="start" onStart={handleStart} />
        )}

        {gameState === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* HUD */}
            <div className="absolute top-12 left-4 right-4 flex justify-between items-start z-20 pointer-events-none">
              <div className="bg-black/80 border-2 border-[#FFD700] px-4 py-2 rounded-lg">
                <div className="text-[#FFD700] font-black text-2xl font-mono">{score.toString().padStart(5, '0')}</div>
                {combo > 1 && (
                  <div className="text-[#4CAF50] font-bold text-sm animate-pulse">COMBO x{combo}!</div>
                )}
              </div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`text-3xl ${i < lives ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                    ❤️
                  </div>
                ))}
              </div>
            </div>

            <GameScreen 
              instruction={currentInstruction} 
              duration={currentDuration} 
              onComplete={handleGameComplete}
              key={currentGameIndex} // Force remount on new game
            >
              <CurrentGameComponent onComplete={handleGameComplete} />
            </GameScreen>
          </motion.div>
        )}

        {gameState === 'oracle' && (
          <OracleOverlay key="oracle" message={oracleMessage} isSuccess={isSuccess} />
        )}

        {gameState === 'leaderboard' && (
          <Leaderboard key="leaderboard" onRestart={() => setGameState('start')} currentScore={score} playerName={playerName} />
        )}
      </AnimatePresence>

      <Chatbot />
    </div>
  );
}
