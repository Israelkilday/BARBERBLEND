"use client"

import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel";
import { Card, CardContent } from '@/app/_components/ui/card'
import { Scissors } from 'lucide-react';

const barbers = [
    {
        id: 0,
        image: "/barber1.jpg",
        name: "FRANCISCO",
        seniority: "Barber Senior",
    },
    {
        id: 1,
        image: "/barber2.jpg",
        name: "ROBERTO",
        seniority: "New Barber",
    },
    {
        id: 2,
        image: "/barber3.jpg",
        name: "ALEX",
        seniority: "Barber Junior",
    },
    {
        id: 3,
        image: "/barber4.jpg",
        name: "ANTONIO",
        seniority: "Barber Senior",
    },
    {
        id: 4,
        image: "/barber5.jpg",
        name: "RAFAEL",
        seniority: "Barber Senior",
    },
    {
        id: 5,
        image: "/barber6.jpg",
        name: "GUSTAVO",
        seniority: "Barber Junior",
    },

]

const SectionBarbers = () => {
    return (
        <div>
            <Carousel
                plugins={[
                    Autoplay({
                      delay: 2000,
                    }),
                  ]}
                className="overflow-x-auto pl-5 pr-0 lg:pl-0 lg:overflow-hidden"
            >
                <CarouselContent>
                    {barbers.map(card => (
                        <CarouselItem key={card.id} className="min-w-[183px] max-w-[183px] md:min-w-[243px] md:max-w-[243px] lg:max-w-[270px] lg:min-w-[270px]">
                            <Card className="min-w-full max-w-full h-[300px] md:h-[350px] lg:h-[420px] rounded-2xl">
                                <CardContent className="p-0 px-1 pt-1">
                                    <div className="w-full h-52 md:h-64 lg:h-80 rounded-2xl relative overflow-hidden ">
                                        <Image
                                            fill
                                            src={card.image}
                                            alt="barber name"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                            className="max-h-80 overflow-hidden w-full rounded-2xl hover:grayscale hover:scale-105 duration-200"
                                        />
                                    </div>

                                    <div className="flex gap-1 flex-col items-center mb-auto px-2 pb-2">
                                        <h2 className="flex gap-1 items-center justify-center font-bold mt-4 pt-2 mb-1 overflow-hidden text-nowrap lg:text-lg border-t border-solid border-secondary w-full">
                                            <Scissors className="font-bold text-purple-500 size-5" />
                                            {card.name}
                                        </h2>

                                        <p className="text-sm text-gray-400 lg:text-base">
                                            {card.seniority}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden left-1 lg:flex" />

                <CarouselNext className="hidden right-1 lg:flex" />
            </Carousel>
        </div>
    );
};

export default SectionBarbers