const isCurrentTimeInRange = (currentTime, timestampFrom, timestampTo) =>
  currentTime >= timestampFrom && currentTime < timestampTo;

export default isCurrentTimeInRange;
