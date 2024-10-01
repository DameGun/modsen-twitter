export function formatTweetLikesCount(likesCount: number) {
  if (likesCount === 0) return undefined;

  return likesCount > 1000 ? `${likesCount / 1000}K` : likesCount;
}

export function formatTweetCreationTime(time: number) {
  const parsedDate = new Date(time);
  const currentDate = new Date();

  if (parsedDate.getFullYear() < currentDate.getFullYear()) {
    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } else if (
    parsedDate.getMonth() === currentDate.getMonth() &&
    parsedDate.getDate() === currentDate.getDate()
  ) {
    const hoursDiff = currentDate.getHours() - parsedDate.getHours();
    const minutesDiff = currentDate.getMinutes() - parsedDate.getMinutes();

    if (hoursDiff === 0) {
      if (minutesDiff === 0) return 'Just now';

      return `${minutesDiff}m`;
    }

    return `${hoursDiff}h`;
  } else {
    return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
