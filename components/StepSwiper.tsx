'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Waypoints } from 'lucide-react';


interface Step {
    id: string;
    stepNumber: number;
    instruction: string;
}

interface StepSwiperProps {
    steps: Step[];
}

export default function StepSwiper({ steps }: StepSwiperProps) {
    return (
        <div className="step-swiper">
            <h2><Waypoints /> Steps ({steps.length})</h2>
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {steps
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((step) => (
                        <SwiperSlide key={step.id}>
                            <div className="step-slide">
                                <span>{step.stepNumber}</span>
                                <p>{step.instruction}</p>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}