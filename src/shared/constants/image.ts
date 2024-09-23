export const IMAGE_TYPES = ['image/jpeg', 'image/png'];
export const IMAGE_TYPES_CONSTRAINT = IMAGE_TYPES.join();
export const IMAGE_SIZE_CONSTRAINT = 2 * 1024 * 1024;

export enum ImageBitsIdentifiers {
  Png = '89504e47',
  Jpg = 'ffd8ffe0',
}
