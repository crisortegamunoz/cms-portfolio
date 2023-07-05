import { getStorage, ref, uploadBytes, UploadResult, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { environment } from 'environments/environment';


export class CommonFunctions {

  private static storage = getStorage(initializeApp(environment.firebase));

  static uploadToFirebase(files: File[], path: string): Promise<UploadResult>[] {
    const uploadPromises: Promise<UploadResult>[] = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const storageRef = ref(this.storage, `${path}/${file.name}`);
      const uploadPromise = uploadBytes(storageRef, file);
      uploadPromises.push(uploadPromise);
    }
    return uploadPromises;
  }

  static getUrlFromFirebase(snapshots: UploadResult[]): Promise<string>[] {
    const downloadURLPromises: Promise<string>[] = [];
    snapshots.forEach((snapshot: UploadResult) => {
      const storageRef = ref(this.storage, snapshot.ref.fullPath);
      const downloadURLPromise = getDownloadURL(storageRef);
      downloadURLPromises.push(downloadURLPromise);
    });
    return downloadURLPromises;
  }

  static deleteFilesFromFirebase(imagePaths: string[]): Promise<void[]> {
    const deletePromises = imagePaths.map(path => {
      const imageRef = ref(this.storage, path);
      return deleteObject(imageRef);
    });

    return Promise.all(deletePromises);
  }

  static createFilePaths(path: string, files: string[]): string[] {
    return files.map(file => `${path}/${file}`);
  }

  static getFilePathByUrl(fileUrls: string[]): string[] {
    const array: string[] = [];
    fileUrls.forEach(url => {
      const decodedUrl = decodeURIComponent(url);
      const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).split('?')[0];
      array.push(fileName);
    });
    return array;
  }

}
