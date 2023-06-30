import { CategoryDTO } from "./category.model";
import { TechnologyDTO } from "./technology.model";

export interface SkillDTO {
    id: number;
    name?: string;
    show: boolean;
    percentage?: number;
    cssClass?: string;
    cssStyle?: string;
    technology: TechnologyDTO;
    category: CategoryDTO;
}
