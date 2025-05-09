import prisma from "@/lib/db";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Image from "next/image";
import Link from 'next/link';
import { Clock11, Gauge, ListTodo, CookingPot, ArrowRight, Lightbulb } from 'lucide-react';
import StepSwiper from "@/components/StepSwiper";
import DownloadPDFButton from "@/components/DownloadPDFButton";
import FavoriteButton from "@/components/FavoriteButton";

interface Params {
    id: string;
}

export default async function RecipeDetail({ params }: { params: Promise<Params> }) {
    const { id } = await params;
    const recipe = await prisma.recipe.findUnique({
        where: {
            id,
        },
        include: {
            category: {
                include: {
                    recipes: true,
                },
            },
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

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <main className="recipe-detail">
            <section className="hero">
                <div className="left">
                    <h1>{recipe?.title}</h1>
                    <div>
                        <span className={`category ${recipe?.category.name}`}>
                            {recipe?.category.name}
                        </span>
                        <p><Clock11 size={16} /> {recipe.duration} min</p>
                        <div className='difficulty'>
                            {[...Array(5)].map((_, index) => {
                                let color = '#ffffff';
                                if (recipe.difficulty >= 1 && recipe.difficulty <= 2 && index < 2) {
                                    color = '#33a947';
                                } else if (recipe.difficulty >= 3 && recipe.difficulty <= 4 && index < recipe.difficulty) {
                                    color = '#ff8c00';
                                } else if (recipe.difficulty === 5 && index < 5) {
                                    color = '#df1666';
                                }
                                return <Gauge key={index} color={color} />;
                            })}
                        </div>
                    </div>
                    <div className="btns">

                        <DownloadPDFButton recipe={recipe} />
                        <FavoriteButton recipeId={recipe.id} />
                    </div>
                </div>
                {recipe && (
                    <div className="right">
                        <Image src={recipe.image} alt={recipe.title} width={1000} height={1000} />
                    </div>
                )}
            </section >

            <section className="content">
                <div className="instruction-ingredient">
                    <article>
                        <h2><ListTodo />Instructions</h2>
                        <p>{recipe.instruction}</p>
                    </article>
                    <aside>
                        <h2><CookingPot />Ingredients and Tools</h2>
                        <TabGroup className="tab">
                            <TabList className="tab-list">
                                <Tab className="tab">Ingrédients</Tab>
                                <Tab className="tab">Outils</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <ul className="ingredients">
                                        {recipe.compositions.map((composition) => (
                                            <li key={composition.id}>
                                                <Image
                                                    src={composition.ingredient.image}
                                                    alt={composition.ingredient.name}
                                                    width={500}
                                                    height={500}
                                                />
                                                <p>{composition.ingredient.name}</p>
                                                <span>{composition.quantity} {composition.unit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </TabPanel>
                                <TabPanel>
                                    <ul className="tools">
                                        {recipe.recipeTools.map((tool) => (
                                            <li key={tool.id}>
                                                <Image
                                                    src={tool.tool.image}
                                                    alt={tool.tool.name}
                                                    width={500}
                                                    height={500}
                                                />
                                                <p>{tool.tool.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </aside>

                </div>

                <div className="steps">
                    <StepSwiper steps={recipe.steps} />
                </div>

                <div className="suggestion">
                    <h2><Lightbulb /> Suggestions</h2>
                    <div>
                        {recipe.category.recipes
                            .filter((r: { id: string }) => r.id !== recipe.id)
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 3)
                            .map((suggestion: { id: string; image: string; title: string }) => (
                                <li key={suggestion.id}>
                                    <Image src={suggestion.image} alt={suggestion.title} width={500} height={500} />
                                    <div>
                                        <h3>{suggestion.title}</h3>
                                        <Link href={`/recipe/${suggestion.id}`}>View recipe <ArrowRight size={16} /></Link>
                                    </div>
                                </li>
                            ))}
                    </div>
                </div>
            </section >
        </main>
    );
}