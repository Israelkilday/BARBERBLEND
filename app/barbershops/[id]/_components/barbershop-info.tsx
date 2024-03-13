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

            <div className="h-[250px] w-full relative">
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

            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold ">{barbershop.name}</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1 mt-2">
                        <MapPinIcon className="text-primary" size={18} />

                        <p className="text-sm">{barbershop.address}</p>
                    </div>

                    <Card className="w-48">
                        <CardContent className="pl-3 p-4 justify-center">
                            <div className="flex gap-1 m-auto items-center">
                                <StarIcon className="text-primary" size={18} />

                                <p className="text-sm">5,0 (899 avaliações)</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BarbershopInfo;