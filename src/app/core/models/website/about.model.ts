import { BoxDTO } from './box.model';

export interface AboutDTO {
  id: number;
  title: string;
  descriptions: string[];
  boxes: BoxDTO[];
}
