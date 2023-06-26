export interface DialogData<T> {
  id: string | number;
  action: string;
  name: string;
  objectName: string;
  object: T;
}
