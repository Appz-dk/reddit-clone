import { FirebaseStorage, getDownloadURL, ref, uploadString } from "firebase/storage"

interface UploadImageToStorageArgs {
  storage: FirebaseStorage
  url: string,
  file: string,
}

export const uploadImageToStorage = async ({ storage, url, file }: UploadImageToStorageArgs) => {
  // store image in firebase storage at url location
  const imageRef = ref(storage, url);
  await uploadString(imageRef, file, "data_url");
  //getDownloadURL (returns imageURL)
  const imageDownloadUrl = await getDownloadURL(imageRef);
  return imageDownloadUrl
}