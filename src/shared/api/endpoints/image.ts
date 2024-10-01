import { deleteObject, getDownloadURL, listAll, ref, uploadString } from 'firebase/storage';

import { StoragePaths } from '@/shared/constants/firebase';

import { storage } from '../firebase';

export async function uploadImageByPath(imageUrl: string, path: string) {
  const storageRef = ref(storage, path);

  const uploadResult = await uploadString(storageRef, imageUrl, 'data_url');

  const storageImageUrl = await getDownloadURL(uploadResult.ref);

  return storageImageUrl;
}

export async function deleteImages(path: string) {
  const storageRef = ref(storage, path);

  const allItems = await listAll(storageRef);

  for (const item of allItems.items) {
    await deleteObject(item);
  }
}

export async function uploadImageCollectionById(images: string[], path: string) {
  const storagesUrls = [];

  for (let i = 0; i < images.length; i++) {
    const relatedPath = StoragePaths.tweetsMedia(path, i + 1);
    const uploadedUrl = await uploadImageByPath(images[i], relatedPath);

    if (uploadedUrl) storagesUrls.push(uploadedUrl);
  }

  return storagesUrls;
}
