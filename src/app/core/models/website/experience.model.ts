import { CategoryDTO } from './category.model';
import { TechnologyDTO } from './technology.model';

export interface ExperienceDTO {
  id: number;
  roleName: string;
  roleDescription: string;
  entityName: string;
  entityDescription: string;
  responsibilities: string[];
  periodStart: Date;
  periodEnd: Date;
  category: CategoryDTO;
  technologies: TechnologyDTO[];
}
