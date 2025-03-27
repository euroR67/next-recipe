import prisma from "@/lib/db";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Image from "next/image";
import { Clock11, Gauge, Download, Heart, ListTodo, CookingPot } from 'lucide-react';

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
                        <button><Download /> Download</button>
                        <button><Heart />Favorite</button>
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
                    <h2>Steps ({recipe.steps.length})</h2>
                    <ol>
                        {recipe.steps.sort((a, b) => a.stepNumber - b.stepNumber).map((step) => (
                            <li key={step.id}>
                                <h3>{step.stepNumber}. {step.instruction}</h3>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="suggestion">
                    <h2>Suggestions</h2>
                    {recipe.category.recipes
                        .filter((r: { id: string }) => r.id !== recipe.id)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3)
                        .map((suggestion: { id: string; image: string; title: string }) => (
                            <li key={suggestion.id}>
                                <Image src={suggestion.image} alt={suggestion.title} width={100} height={100} />
                                <h3>{suggestion.title}</h3>
                            </li>
                        ))}
                </div>
            </section >
        </main>
    );
}