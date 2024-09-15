import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { storage } from '../firebase';

export class ImageRepositoryService {
  static async uploadImageByPath(imageUrl: string, path: string) {
    const storageRef = ref(storage, path);

    const uploadResult = await uploadString(storageRef, imageUrl, 'data_url');

    const storageImageUrl = await getDownloadURL(uploadResult.ref);

    return storageImageUrl;
  }
}
