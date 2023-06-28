export interface SkillDTO {
    id: number;
    name?: string;
    available: boolean;
    percentage?: number;
    cssClass?: string;
    cssStyle?: string;
    technologyId?: number;
    technologyName?: string;
    categoryId: number;
    categoryName: string;
}
