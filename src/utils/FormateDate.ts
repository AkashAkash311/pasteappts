export const FormatDate = (date: string | number | Date): string => {
  // Ensure the date is a valid Date object
  const _date = new Date(date);

  // Check if the date is valid
  if (isNaN(_date.getTime())) {
    console.error('Invalid date');
    return 'Invalid Date';
  }

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(_date);

  return formattedDate;
};
