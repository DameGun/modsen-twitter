import { deleteObject, getDownloadURL, listAll, ref, uploadString } from 'firebase/storage';

import { StoragePaths } from '@/constants/firebase';

import { storage } from '../firebase';

export class ImageRepositoryService {
  static async uploadImageByPath(imageUrl: string, path: string) {
    const storageRef = ref(storage, path);

    const uploadResult = await uploadString(storageRef, imageUrl, 'data_url');

    const storageImageUrl = await getDownloadURL(uploadResult.ref);

    return storageImageUrl;
  }

  static async deleteImages(path: string) {
    const storageRef = ref(storage, path);

    const allItems = await listAll(storageRef);

    for (const item of allItems.items) {
      await deleteObject(item);
    }
  }

  static async uploadImageCollectionById(images: string[], path: string) {
    const storagesUrls = [];

    for (let i = 0; i < images.length; i++) {
      const relatedPath = StoragePaths.tweetsMedia(path, i + 1);
      const uploadedUrl = await ImageRepositoryService.uploadImageByPath(images[i], relatedPath);

      if (uploadedUrl) storagesUrls.push(uploadedUrl);
    }

    return storagesUrls;
  }
}
