"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/side-menu";

import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import Header from "@/app/_components/header";
import { Card, CardContent } from "@/app/_components/ui/card";

interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.replace("/");
    };

    return (
        <div>
            <div className="mb-6">
                <Header />
            </div>

            {/* border-b border-solid border-secondary */}

            <div>
                <div className="px-5 mb-3    ">
                    <h1 className="text-xl font-bold">{barbershop.name}</h1>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1 mt-2">
                            <MapPinIcon className="text-primary" size={18} />

                            <p className="text-sm">{barbershop.address}</p>
                        </div>

                        <div className="flex gap-1 items-center">
                            <StarIcon className="text-primary" size={18} />

                            <p className="text-sm">5,0 (899 avaliações)</p>
                        </div>
                    </div>
                </div>

                <div className="h-[250px] w-full relative mb-6">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={handleBackClick}
                        className="z-50 absolute top-4 left-4"
                    >
                        <ChevronLeftIcon />
                    </Button>

                    <Image
                        fill
                        src={barbershop.imageUrl}
                        alt={barbershop.name}
                        style={{
                            objectFit: "cover",
                        }}
                        className="opacity-75"
                    />
                </div>

                <div className="px-5">
                    <h2 className="text-sm lg:text-center mb-3 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-[26px] lg:px-0 lg:pt-16">
                        SOBRE NOS
                    </h2>
                    <Card className="">
                        <CardContent className="p-5 md:p-4 justify-center">
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae quod tempore sapiente natus, alias libero hic repellat eius in sequi ut molestiae saepe accusantium magni aspernatur optio cupiditate sint accusamus.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BarbershopInfo;