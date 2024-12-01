import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RecipeWithRelations } from '../types/types';
import { ArrowRight, Clock11, HeartPulse, Vegan } from 'lucide-react';

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
                <div className='vegan-healthy'>
                    {/* If isHealthy is true */}
                    {recipe.isHealthy && <p><HeartPulse color="#1b1b1b" fill='#df1666' strokeWidth={1.25} /></p>}
                    {/* If isVegan is true */}
                    {recipe.isVegan && <p><Vegan color="#1b1b1b" fill='#33a947' strokeWidth={1.25} /></p>}
                </div>
            </div>
            <div className='card-info'>
                <h1>{recipe.title}</h1>
                <span className={recipe.category.name === 'Starter' ? 'Starter' : recipe.category.name === 'Dessert' ? 'Dessert' : recipe.category.name === 'Main' ? 'Main' : ''}>
                    {recipe.category.name}
                </span>
                <p><Clock11 size={16} /> {recipe.duration} min</p>
                <Link href={`/recipe/${recipe.id}`}>View recipe <ArrowRight size={16} /></Link>
            </div>
        </div>
    )
}

export default RecipeCard