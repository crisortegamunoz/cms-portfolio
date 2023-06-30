import { CategoryDTO } from "./category.model";

export interface CertificateDTO {
  id: number;
  name: string;
  pdfUrl: string;
  imgUrl: string;
  entityName: string;
  completed: Date;
  category: CategoryDTO
}
