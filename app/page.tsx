import RecipeCard from "@/components/RecipeCard";
import RecipeSwiper from "@/components/RecipeSwiper";
import prisma from "@/lib/db";

export default async function Home() {
  const recipes = await prisma.recipe.findMany({
    include: {
      category: true,
      recipeTools: true,
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