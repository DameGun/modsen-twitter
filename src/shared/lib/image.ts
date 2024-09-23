import { ImageBitsIdentifiers } from '@/shared/constants/image';

export function getFileSignature(bytesArray: Uint8Array) {
  const arr = bytesArray.subarray(0, 4);
  let header = '';

  for (let i = 0; i < arr.length; i++) {
    header += arr[i].toString(16);
  }

  return header;
}

export function checkFileSignature(header: string) {
  let fileSignature = false;

  switch (header) {
    case ImageBitsIdentifiers.Jpg:
    case ImageBitsIdentifiers.Png: {
      fileSignature = true;
      break;
    }
    default: {
      fileSignature = false;
      break;
    }
  }

  return fileSignature;
}

export function dataUrlToBytesArray(dataUrl: string) {
  const base64String = dataUrl.split(',')[1];
  const binaryString = atob(base64String);

  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
