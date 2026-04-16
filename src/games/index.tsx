import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SUSHI_ROLLS, SUSHI_LORE, ALL_ROLLS } from '../data';

// --- Utility ---
const shuffle = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// --- Game 1: BEHIND! ---
export const BehindGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ x: 300 }}
        animate={{ x: -300 }}
        transition={{ duration: 2, ease: "linear" }}
        className="absolute w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => onComplete(true)}
      >
        <span className="text-white text-xs font-bold">COWORKER</span>
      </motion.div>
      <div className="w-24 h-32 bg-green-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold">YOU</span>
      </div>
    </div>
  );
};

// --- Game 2: SHARP! ---
export const SharpGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const items = [
    { id: 1, type: 'sharp', icon: '🔪' },
    { id: 2, type: 'safe', icon: '🥄' },
    { id: 3, type: 'safe', icon: '🥣' },
    { id: 4, type: 'sharp', icon: '🗡️' },
    { id: 5, type: 'safe', icon: '🥢' },
    { id: 6, type: 'safe', icon: '🧊' },
  ];
  const [shuffled] = useState(() => shuffle(items));
  const [clicked, setClicked] = useState<number[]>([]);
  
  const sharpCount = items.filter(i => i.type === 'sharp').length;

  const handleClick = (item: any) => {
    if (item.type === 'safe') {
      onComplete(false);
    } else {
      const newClicked = [...clicked, item.id];
      setClicked(newClicked);
      if (newClicked.length === sharpCount) {
        onComplete(true);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-center gap-4 p-8">
      {shuffled.map(item => (
        <motion.button
          key={item.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleClick(item)}
          className={`text-6xl p-4 bg-gray-800 rounded-xl border-2 ${clicked.includes(item.id) ? 'border-green-500 opacity-50' : 'border-gray-600'}`}
          disabled={clicked.includes(item.id)}
        >
          {item.icon}
        </motion.button>
      ))}
    </div>
  );
};

// --- Game 3: CORNER! ---
export const CornerGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setPosition(p => p + 2), 50);
    return () => clearInterval(timer);
  }, []);

  const handleTap = () => {
    // Sweet spot is between 60 and 80
    if (position >= 60 && position <= 85) {
      onComplete(true);
    } else {
      onComplete(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="w-full h-32 bg-gray-800 relative border-y-4 border-gray-600">
        <div className="absolute left-[70%] top-0 bottom-0 w-4 bg-yellow-500/50" /> {/* Sweet spot visual */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl"
          style={{ left: `${position}%` }}
        >
          🏃
        </motion.div>
      </div>
      <button 
        onClick={handleTap}
        className="mt-12 px-12 py-6 bg-red-600 text-white text-3xl font-black rounded-full shadow-[0_8px_0_#991b1b] active:shadow-[0_0px_0_#991b1b] active:translate-y-2 transition-all"
      >
        CORNER!
      </button>
    </div>
  );
};

// --- Game 4: WHAT'S IN IT? ---
export const WhatsInItGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [question] = useState(() => {
    const roll = SUSHI_ROLLS[Math.floor(Math.random() * SUSHI_ROLLS.length)];
    const wrong1 = SUSHI_ROLLS[Math.floor(Math.random() * SUSHI_ROLLS.length)];
    const wrong2 = SUSHI_ROLLS[Math.floor(Math.random() * SUSHI_ROLLS.length)];
    const options = shuffle([
      { text: roll.ingredients.join(', '), correct: true },
      { text: wrong1.ingredients.join(', '), correct: false },
      { text: wrong2.ingredients.join(', '), correct: false }
    ]);
    return { roll: roll.name, options };
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-3xl text-white font-bold mb-8">{question.roll}</h3>
      <div className="flex flex-col gap-4 w-full max-w-md">
        {question.options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => onComplete(opt.correct)}
            className="p-4 bg-gray-800 text-white rounded-lg border-2 border-gray-600 hover:border-green-500 transition-colors text-sm md:text-base"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Game 5: SUSHI LORE ---
export const SushiLoreGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [question] = useState(() => {
    const q = SUSHI_LORE[Math.floor(Math.random() * SUSHI_LORE.length)];
    const options = shuffle([
      { text: q.a, correct: true },
      ...q.options.slice(0, 2).map(o => ({ text: o, correct: false }))
    ]);
    return { q: q.q, options };
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-4xl text-[#FFD700] font-black mb-8 tracking-wider">{question.q}</h3>
      <div className="flex flex-col gap-4 w-full max-w-md">
        {question.options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => onComplete(opt.correct)}
            className="p-4 bg-gray-800 text-white rounded-lg border-2 border-gray-600 hover:border-green-500 transition-colors font-medium"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Game 6: TEMP CHECK ---
export const TempCheckGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [scenario] = useState(() => {
    const scenarios = [
      { item: "Raw Salmon", temp: "35°F", safe: true },
      { item: "Raw Tuna", temp: "55°F", safe: false },
      { item: "Cooked Chicken", temp: "150°F", safe: true },
      { item: "Cooked Rice", temp: "80°F", safe: false },
      { item: "Frozen Shrimp", temp: "-5°F", safe: true },
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gray-800 p-8 rounded-2xl border-4 border-gray-700 mb-12">
        <h3 className="text-3xl text-white font-bold mb-4">{scenario.item}</h3>
        <div className="text-6xl font-black text-[#FF4444] font-mono">{scenario.temp}</div>
      </div>
      <div className="flex gap-8">
        <button onClick={() => onComplete(scenario.safe)} className="w-32 h-32 bg-green-600 rounded-full text-white text-2xl font-bold shadow-[0_8px_0_#166534] active:translate-y-2 active:shadow-none">SAFE</button>
        <button onClick={() => onComplete(!scenario.safe)} className="w-32 h-32 bg-red-600 rounded-full text-white text-2xl font-bold shadow-[0_8px_0_#991b1b] active:translate-y-2 active:shadow-none">DANGER</button>
      </div>
    </div>
  );
};

// --- Game 7: FIFO OR NO-GO ---
export const FifoGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [boxes] = useState(() => {
    const today = new Date();
    const dates = [
      new Date(today.getTime() - 3 * 86400000),
      new Date(today.getTime() - 2 * 86400000),
      new Date(today.getTime() - 1 * 86400000),
    ];
    const shuffledDates = shuffle(dates);
    const oldest = Math.min(...shuffledDates.map(d => d.getTime()));
    
    return shuffledDates.map(d => ({
      dateStr: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isOldest: d.getTime() === oldest
    }));
  });

  return (
    <div className="w-full h-full flex items-center justify-center gap-6 p-6">
      {boxes.map((box, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(box.isOldest)}
          className="w-32 h-40 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] bg-[#d4a373] rounded-lg border-4 border-[#bc6c25] flex flex-col items-center justify-center shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-2 w-full text-center text-[#bc6c25] font-black text-xs uppercase tracking-widest">SALMON</div>
          <div className="bg-white px-3 py-1 border-2 border-black transform -rotate-6 mt-4">
            <span className="text-black font-mono font-bold">{box.dateStr}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

// --- Game 8: NAME THAT ROLL ---
export const NameThatRollGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [question] = useState(() => {
    const roll = ALL_ROLLS[Math.floor(Math.random() * ALL_ROLLS.length)];
    const wrong1 = ALL_ROLLS[Math.floor(Math.random() * ALL_ROLLS.length)];
    const wrong2 = ALL_ROLLS[Math.floor(Math.random() * ALL_ROLLS.length)];
    const options = shuffle([
      { text: roll.name, correct: true },
      { text: wrong1.name, correct: false },
      { text: wrong2.name, correct: false }
    ]);
    return { ingredients: roll.ingredients.join(', '), options };
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-[#4CAF50] mb-8 max-w-lg">
        <p className="text-xl text-white font-medium italic">"{question.ingredients}"</p>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md">
        {question.options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => onComplete(opt.correct)}
            className="p-4 bg-[#1a1a1a] text-[#FFD700] rounded-lg border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors font-bold text-lg"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Game 9: FOLLOWING! ---
export const FollowingGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setPosition(p => p + 1.5), 50);
    return () => clearInterval(timer);
  }, []);

  const handleTap = () => {
    if (position >= 50 && position <= 75) {
      onComplete(true);
    } else {
      onComplete(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="w-full h-32 bg-gray-800 relative border-y-4 border-gray-600 overflow-hidden">
        <div className="absolute left-[60%] top-0 bottom-0 w-16 bg-yellow-500/30 border-x-2 border-yellow-500 border-dashed" />
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl z-10"
          style={{ left: `${position + 15}%` }}
        >
          👨‍🍳
        </motion.div>
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl"
          style={{ left: `${position}%` }}
        >
          🏃
        </motion.div>
      </div>
      <button 
        onClick={handleTap}
        className="mt-12 px-12 py-6 bg-blue-600 text-white text-3xl font-black rounded-full shadow-[0_8px_0_#1e3a8a] active:shadow-[0_0px_0_#1e3a8a] active:translate-y-2 transition-all"
      >
        FOLLOWING!
      </button>
    </div>
  );
};

// --- Game 10: SAUCE MASTER ---
export const SauceMasterGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [question] = useState(() => {
    const rollsWithSauce = ALL_ROLLS.filter(r => r.ingredients.some(i => i.includes('sauce') || i.includes('mayo') || i.includes('paste')));
    const roll = rollsWithSauce[Math.floor(Math.random() * rollsWithSauce.length)];
    const correctSauce = roll.ingredients.find(i => i.includes('sauce') || i.includes('mayo') || i.includes('paste')) || 'eel sauce';
    
    const allSauces = ['eel sauce', 'spicy sauce', 'spicy mayo', 'bamboo sauce', 'chili paste', 'ponzu'];
    const wrongSauces = allSauces.filter(s => s !== correctSauce);
    
    const options = shuffle([
      { text: correctSauce, correct: true },
      { text: wrongSauces[0], correct: false },
      { text: wrongSauces[1], correct: false }
    ]);
    return { roll: roll.name, options };
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-3xl text-white font-bold mb-2">What sauce goes on</h3>
      <h2 className="text-5xl text-[#FFD700] font-black mb-12">{question.roll}?</h2>
      <div className="flex gap-4 w-full max-w-2xl justify-center flex-wrap">
        {question.options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => onComplete(opt.correct)}
            className="w-32 h-32 rounded-full bg-gray-800 border-4 border-gray-600 hover:border-white flex items-center justify-center p-4 text-center text-white font-bold capitalize transition-all hover:scale-110"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Game 11: MEMORY ROLL ---
export const MemoryRollGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [sequence] = useState(() => {
    const items = shuffle(ALL_ROLLS).slice(0, 3).map(r => r.name);
    return items;
  });
  const [options] = useState(() => shuffle([...sequence, ALL_ROLLS[0].name, ALL_ROLLS[1].name]));
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('recall'), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleTap = (item: string) => {
    if (phase !== 'recall') return;
    
    const newSeq = [...playerSequence, item];
    setPlayerSequence(newSeq);
    
    // Check if wrong
    if (newSeq[newSeq.length - 1] !== sequence[newSeq.length - 1]) {
      onComplete(false);
      return;
    }
    
    // Check if complete
    if (newSeq.length === sequence.length) {
      onComplete(true);
    }
  };

  if (phase === 'memorize') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-2xl text-[#FF4444] font-black mb-8 animate-pulse">MEMORIZE!</h3>
        <div className="flex flex-col gap-4">
          {sequence.map((item, i) => (
            <div key={i} className="text-3xl text-white font-bold bg-gray-800 px-8 py-4 rounded-lg border-2 border-gray-600">
              {i + 1}. {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="flex gap-2 mb-8">
        {sequence.map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full ${i < playerSequence.length ? 'bg-green-500' : 'bg-gray-700'}`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
        {options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => handleTap(opt)}
            disabled={playerSequence.includes(opt)}
            className={`p-4 rounded-lg border-2 font-bold transition-all ${
              playerSequence.includes(opt) 
                ? 'bg-gray-900 border-gray-800 text-gray-600' 
                : 'bg-gray-800 border-gray-500 text-white hover:border-white hover:scale-105'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Game 12: RAW OR READY? ---
export const RawOrReadyGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
  const [scenario] = useState(() => {
    const scenarios = [
      { text: "Chicken cooked to 165°F", safe: true },
      { text: "Sushi-grade Salmon at 35°F", safe: true },
      { text: "Mayo left out for 4 hours", safe: false },
      { text: "Raw chicken stored above veggies", safe: false },
      { text: "Washed hands for 20 seconds", safe: true },
      { text: "Used same knife for raw fish and cooked steak", safe: false },
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gray-800 p-8 rounded-2xl border-4 border-gray-700 mb-12 max-w-lg">
        <h3 className="text-2xl md:text-3xl text-white font-bold leading-relaxed">{scenario.text}</h3>
      </div>
      <div className="flex gap-8">
        <button onClick={() => onComplete(scenario.safe)} className="w-32 h-32 bg-green-600 rounded-full text-white text-2xl font-bold shadow-[0_8px_0_#166534] active:translate-y-2 active:shadow-none">SAFE</button>
        <button onClick={() => onComplete(!scenario.safe)} className="w-32 h-32 bg-red-600 rounded-full text-white text-2xl font-bold shadow-[0_8px_0_#991b1b] active:translate-y-2 active:shadow-none">UNSAFE</button>
      </div>
    </div>
  );
};

// --- Registry ---
export const GAME_REGISTRY = [
  { id: 'behind', component: BehindGame, instruction: 'TAP THE COWORKER!', duration: 4000 },
  { id: 'sharp', component: SharpGame, instruction: 'CLICK ALL SHARP OBJECTS!', duration: 5000 },
  { id: 'corner', component: CornerGame, instruction: 'TAP CORNER AT THE TURN!', duration: 4000 },
  { id: 'whatsinit', component: WhatsInItGame, instruction: 'MATCH THE INGREDIENTS!', duration: 8000 },
  { id: 'sushilore', component: SushiLoreGame, instruction: 'ANSWER THE ORACLE!', duration: 7000 },
  { id: 'tempcheck', component: TempCheckGame, instruction: 'SAFE OR DANGER ZONE?', duration: 5000 },
  { id: 'fifo', component: FifoGame, instruction: 'TAP THE OLDEST BOX (FIFO)!', duration: 6000 },
  { id: 'namethatroll', component: NameThatRollGame, instruction: 'NAME THAT ROLL!', duration: 8000 },
  { id: 'following', component: FollowingGame, instruction: 'CALL FOLLOWING!', duration: 4000 },
  { id: 'saucemaster', component: SauceMasterGame, instruction: 'PICK THE RIGHT SAUCE!', duration: 6000 },
  { id: 'memoryroll', component: MemoryRollGame, instruction: 'MEMORIZE THE ORDER!', duration: 10000 },
  { id: 'raworready', component: RawOrReadyGame, instruction: 'SAFE TO SERVE?', duration: 5000 },
];
