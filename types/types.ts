/* eslint-disable @typescript-eslint/no-unused-vars */
export interface RecipeWithRelations {
    id: string;
    title: string;
    slug: string;
    image: string;
    instruction: string;
    duration: number;
    isHealthy: boolean;
    isVegan: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    recipeTools: RecipeTool[];
    steps: Step[];
    compositions: Compose[];
}

interface Compose {
    id: string;
    quantity: number;
    unit: string;
    ingredient: Ingredient;
}

interface Ingredient {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Category {
    id: string;
    name: string;
}

interface Step {
    id: string;
    description: string;
    stepNumber: number;
}

interface RecipeTool {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}