import { ImageBitsIdentifiers } from '@/shared/constants/image';
import { checkFileSignature, dataUrlToBytesArray, getFileSignature } from '@/shared/lib/image';

describe('Image upload check functions', () => {
  describe('getFileSignature', () => {
    it('should return correct header for PNG file', () => {
      const pngBytes = new Uint8Array([137, 80, 78, 71]);
      expect(getFileSignature(pngBytes)).toBe('89504e47');
    });

    it('should return correct header for JPG file', () => {
      const jpgBytes = new Uint8Array([255, 216, 255, 224]);
      expect(getFileSignature(jpgBytes)).toBe('ffd8ffe0');
    });
  });

  describe('checkFileSignature', () => {
    it('should return true for valid PNG signature', () => {
      expect(checkFileSignature(ImageBitsIdentifiers.Png)).toBe(true);
    });

    it('should return true for valid JPG signature', () => {
      expect(checkFileSignature(ImageBitsIdentifiers.Jpg)).toBe(true);
    });

    it('should return false for invalid signature', () => {
      expect(checkFileSignature('invalidheader')).toBe(false);
    });
  });

  describe('dataUrlToBytesArray', () => {
    it('should convert data URL to bytes array', () => {
      const dataUrl =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
      const result = dataUrlToBytesArray(dataUrl);
      expect(result instanceof Uint8Array).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
