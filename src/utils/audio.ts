export const playTone = (frequency: number, type: OscillatorType, duration: number) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const playSuccess = () => {
  playTone(440, 'sine', 0.1);
  setTimeout(() => playTone(880, 'sine', 0.2), 100);
};

export const playFail = () => {
  playTone(300, 'sawtooth', 0.3);
  setTimeout(() => playTone(200, 'sawtooth', 0.4), 150);
};

export const playTick = () => {
  playTone(800, 'square', 0.05);
};
