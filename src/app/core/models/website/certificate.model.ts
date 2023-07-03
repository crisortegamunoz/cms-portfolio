import { CategoryDTO } from "./category.model";

export interface CertificateDTO {
  id: number;
  name: string;
  pdfUrl: string | undefined;
  imgUrl: string | undefined;
  entityName: string;
  completed: Date;
  category: CategoryDTO
}
