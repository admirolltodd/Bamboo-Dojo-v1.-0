import React, { useState, useEffect } from 'react';
import { RANKS } from '../data';

interface LeaderboardProps {
  onRestart: () => void;
  currentScore: number;
  playerName: string;
}

interface ScoreEntry {
  name: string;
  score: number;
  rank: string;
  date: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onRestart, currentScore, playerName }) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [rank, setRank] = useState(RANKS[0]);

  useEffect(() => {
    // Determine rank
    const earnedRank = [...RANKS].reverse().find(r => currentScore >= r.min) || RANKS[0];
    setRank(earnedRank);

    // Save and load scores
    const saved = localStorage.getItem('bamboo_dojo_scores');
    let parsedScores: ScoreEntry[] = saved ? JSON.parse(saved) : [];
    
    if (currentScore > 0) {
      const newEntry = {
        name: playerName || 'Anonymous Chef',
        score: currentScore,
        rank: earnedRank.title,
        date: new Date().toLocaleDateString()
      };
      parsedScores.push(newEntry);
      parsedScores.sort((a, b) => b.score - a.score);
      parsedScores = parsedScores.slice(0, 10); // Keep top 10
      localStorage.setItem('bamboo_dojo_scores', JSON.stringify(parsedScores));
    }
    
    setScores(parsedScores);
  }, [currentScore, playerName]);

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center p-8 overflow-y-auto z-40">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>GAME OVER</h2>
        <p className="text-2xl text-[#FFD700]">Score: {currentScore}</p>
      </div>

      <div className="bg-gray-900 border-2 border-[#FFD700] p-6 rounded-xl max-w-2xl w-full mb-8 text-center">
        <div className="text-6xl mb-4">🍣</div>
        <h3 className="text-2xl text-white font-bold mb-2">Rank Achieved:</h3>
        <div className="text-3xl text-[#4CAF50] font-black mb-4">{rank.title}</div>
        <p className="text-gray-400 italic">"{rank.desc}"</p>
      </div>

      <div className="w-full max-w-2xl bg-gray-900 rounded-xl overflow-hidden border border-gray-800 mb-8">
        <div className="bg-gray-800 p-4 text-center border-b border-gray-700">
          <h3 className="text-xl text-white font-bold tracking-widest uppercase">Hall of Fame</h3>
        </div>
        <div className="p-0">
          {scores.map((s, i) => (
            <div key={i} className={`flex justify-between items-center p-4 border-b border-gray-800 ${s.name === playerName && s.score === currentScore ? 'bg-[#4CAF50]/20' : ''}`}>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 font-mono w-6 text-right">{i + 1}.</span>
                <div>
                  <div className="text-white font-bold">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#FFD700] font-black">{s.score}</div>
                <div className="text-xs text-[#4CAF50]">{s.rank}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={onRestart}
        className="px-12 py-4 bg-[#4CAF50] text-black text-2xl font-black rounded-full shadow-[0_6px_0_#2E7D32] active:shadow-none active:translate-y-2 transition-all uppercase tracking-wider"
      >
        Play Again
      </button>
    </div>
  );
}
