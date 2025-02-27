export interface RecipeWithRelations {
    id: string;
    title: string;
    slug: string;
    image: string;
    instruction: string;
    duration: number;
    isHealthy: boolean;
    isVegan: boolean;
    difficulty: number;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    category: Category;
    recipeTools: RecipeTool[];
    steps: Step[];
    compositions: Compose[];
}

interface Compose {
    id: string;
    quantity: number;
    unit: string;
    recipeId: string;
    recipe: RecipeWithRelations;
    ingredientId: string;
    ingredient: Ingredient;
}

interface Ingredient {
    id: string;
    name: string;
    image: string;
    recipes: Compose[];
}

interface Category {
    id: string;
    name: string;
    recipes: RecipeWithRelations[];
}

interface Step {
    id: string;
    instruction: string;
    stepNumber: number;
    recipeId: string;
    recipe: RecipeWithRelations;
}

interface RecipeTool {
    id: string;
    recipeId: string;
    recipe: RecipeWithRelations;
    toolId: string;
    tool: Tool;
}

interface Tool {
    id: string;
    name: string;
    image: string;
    recipeTools: RecipeTool[];
}