export const FIFTY_MINUTES_IN_SECONDS = 50 * 60;

export const TEN_MINUTES_IN_SECONDS = 10 * 60;

export const nowPlus = (time: number) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + time);
  return now;
};

export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomPart}`;
};

export const playBeep = () => {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.5);
};
