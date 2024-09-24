import { useCallback, useState } from 'react';

import { IMAGE_SIZE_CONSTRAINT, IMAGE_TYPES } from '@/shared/constants/image';

import { checkFileSignature, dataUrlToBytesArray, getFileSignature } from './image';

export function useUploadImg() {
  const [selectedFile, setSelectedFile] = useState<string | undefined>();

  const handleImageChange = useCallback(
    (file: File) =>
      new Promise<string>((resolve, reject) => {
        if (!IMAGE_TYPES.includes(file.type)) {
          throw new Error('Invalid file format');
        }

        if (file.size > IMAGE_SIZE_CONSTRAINT) {
          throw new Error('File size must be less than 2MB');
        }

        const reader = new FileReader();

        reader.onloadend = (e) => {
          try {
            if (!e.target || !e.target.result) {
              throw new Error('Error while trying to read file');
            }

            const imageDataUrl = e.target.result as string;
            const firstFourBytes = dataUrlToBytesArray(imageDataUrl);
            const header = getFileSignature(firstFourBytes);

            const fileSignature = checkFileSignature(header);

            if (!fileSignature) {
              throw new Error('File content is not a valid image');
            }

            setSelectedFile(imageDataUrl);

            resolve(imageDataUrl);
          } catch (err) {
            reject(err);
          }
        };

        reader.onerror = () => {
          reject(new Error('Error reading the file'));
        };

        reader.readAsDataURL(file);
      }),
    []
  );

  return { selectedFile, handleImageChange };
}
