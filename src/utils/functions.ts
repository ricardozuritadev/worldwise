export const formatDates = (date: Date | undefined) => {
  if (!date) return 'No date';

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => {
      return 127397 + char.charCodeAt(0);
    });
  return String.fromCodePoint(...codePoints);
}
