'use client';

import RecipeCard from "@/components/RecipeCard";
import { RecipeWithRelations } from '../types/types';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

interface RecipeCardProps {
    recipes: RecipeWithRelations[];
}

export default function RecipeSwiper({ recipes }: RecipeCardProps) {
    return (
        <Swiper
            modules={[EffectCoverflow, Navigation]}
            navigation={true}
            effect={'coverflow'}
            spaceBetween={50}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            coverflowEffect={{
                depth: 150,
                modifier: 1,
                rotate: 10,
                slideShadows: true,
            }}
            loop={true}
            style={{ maxWidth: '1000px' }}
        >
            {recipes.map((recipe) => (
                <SwiperSlide key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}