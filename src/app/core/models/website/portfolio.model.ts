import { CategoryDTO } from './category.model';
import { TechnologyDTO } from './technology.model';

export interface PortfolioDTO {
  id: number;
  portfolioName: string;
  clientName: string;
  img: string;
  description: string;
  repository: string;
  demo: string;
  startDate: Date;
  endDate: Date;
  publishDate: Date;
  technologies: TechnologyDTO[];
  category: CategoryDTO;
}
