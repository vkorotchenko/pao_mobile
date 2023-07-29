export const getDecimalDisplayValue = (value: number, decimals: number) => {
  if (!value || isNaN(value)) {
    return '0';
  }
  return (value / 10**decimals).toFixed(decimals);
}

export const toTimeString = (totalSeconds: number) => {
  try {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(11, 19);

    return result;
  } catch (e) {
    return totalSeconds
  }
};