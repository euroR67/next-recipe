'use client';

import RecipeCard from "@/components/RecipeCard";
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function RecipeSwiper({ recipes }) {
    return (
        <Swiper
            effect={'coverflow'}
            spaceBetween={50}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
        >
            {recipes.map((recipe) => (
                <SwiperSlide key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}