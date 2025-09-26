export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};