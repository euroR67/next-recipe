import RecipeSwiper from "@/components/RecipeSwiper";
import prisma from "@/lib/db";
import { RecipeWithRelations } from "@/types/types";

export default async function Home() {
  const recipes: RecipeWithRelations[] = await prisma.recipe.findMany({
    include: {
      category: true,
      recipeTools: {
        include: {
          tool: true,
        },
      },
      steps: true,
      compositions: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return (
    <>
      <RecipeSwiper recipes={recipes} />
    </>
  );
}