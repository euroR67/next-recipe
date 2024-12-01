import prisma from "@/lib/db";

interface Params {
    id: string;
}

export default async function RecipeDetail({ params }: { params: Params }) {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: params.id,
        }
    });

    return (
        <>
            <h1>{recipe?.title}</h1>
        </>
    );
}