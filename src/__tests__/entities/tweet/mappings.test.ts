import { formatTweetCreationTime, formatTweetLikesCount } from '@/entities/tweet/lib/formatters';

describe('Tweet mapping functions', () => {
  describe('format tweet likes count', () => {
    it('should return undefined if likes count is 0', () => {
      const mappedLikes = formatTweetLikesCount(0);

      expect(mappedLikes).toBeUndefined();
    });

    it('should return number with prefix K if likes count is greater than 1000', () => {
      const mappedLikes = formatTweetLikesCount(5050);

      expect(mappedLikes).toBe('5.05K');
    });
  });

  describe('format tweet creation time', () => {
    it('should return Just Now if tweet was created less than minute ago', () => {
      const mappedTime = formatTweetCreationTime(Date.now());

      expect(mappedTime).toBe('Just now');
    });

    it('should return prefix M if tweet was created at this hour', () => {
      const time = new Date(Date.now()).setMinutes(new Date(Date.now()).getMinutes() - 1);
      const mappedTime = formatTweetCreationTime(time);

      expect(mappedTime).toContain('m');
    });

    it('should return prefix H if tweet was created more than hour ago', () => {
      const time = new Date(Date.now());
      const mappedTime = formatTweetCreationTime(time.setHours(time.getHours() - 1));

      expect(mappedTime).toContain('h');
    });

    it('should contain month and date if tweet was created more day ago', () => {
      const time = new Date(2024, 0, 1);
      const mappedTime = formatTweetCreationTime(time.valueOf());

      expect(mappedTime).toBe('Jan 1');
    });

    it('should contain year, month and date if tweet was created more year ago', () => {
      const time = new Date(2023, 0, 1);
      const mappedTime = formatTweetCreationTime(time.valueOf());

      expect(mappedTime).toBe('Jan 1, 2023');
    });
  });
});
