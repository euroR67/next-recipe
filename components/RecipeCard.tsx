import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RecipeWithRelations } from '../types/types';
import { ArrowRight, Clock11, HeartPulse, Vegan, Gauge } from 'lucide-react';

interface RecipeCardProps {
    recipe: RecipeWithRelations;
}

{ /* Recipe card component */ }
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    return (
        <div className='recipe-card'>
            <div className='card-image'>
                {/* If image exists */}
                {recipe.image && (
                    <Image src={recipe.image} alt={recipe.title} width={300} height={200} />
                )}
                {/* If recipe is healthy or vegan */}
                {(recipe.isHealthy || recipe.isVegan) && (
                    <div className='vegan-healthy'>
                        {/* If isHealthy is true */}
                        {recipe.isHealthy && <HeartPulse color="#1b1b1b" fill='#df1666' strokeWidth={1.25} />}
                        {/* If isVegan is true */}
                        {recipe.isVegan && <Vegan color="#1b1b1b" fill='#33a947' strokeWidth={1.25} />}
                    </div>
                )}
            </div>
            <div className='card-info'>
                <h1>{recipe.title}</h1>
                <span className={`category ${recipe.category.name}`}>
                    {recipe.category.name}
                </span>
                <p><Clock11 size={16} /> {recipe.duration} min</p>

                {/* Afficher les gauge de la bonne couleur et du bon nombre de gauge en fonction de la difficulté */}
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

                <Link href={`/recipe/${recipe.id}`}>View recipe <ArrowRight size={16} /></Link>
            </div>
        </div>
    )
}

export default RecipeCard