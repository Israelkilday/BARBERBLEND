"use client"

import { Barbershop } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarIcon } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";


interface BarbershopItemProps {
    barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    const router = useRouter();

    const handleBookingClick = () => {
        router.push(`/barbershops/${barbershop.id}`);
    }

    return (
        <Card className="min-w-full max-w-full rounded-2xl">
            <CardContent className="px-1 py-0 pt-1">
                <div className="w-full h-[159px] lg:h-[171px] relative">
                    <div className="absolute top-2 left-2 z-50">
                        <Badge
                            variant="secondary"
                            className="flex opacity-90 gap-1 items-center"
                        >
                            <StarIcon size={12} className="fill-primary text-primary" />

                            <span className="text-xs">5,0</span>
                        </Badge>
                    </div>

                    <Image
                        fill
                        src={barbershop.imageUrl}
                        alt={barbershop.name}
                        style={{
                            objectFit: "cover",
                        }}
                        className="h-[159px] w-full rounded-2xl"
                    />
                </div>

                <div className="px-2 pb-3">
                    <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
                        {barbershop.name}
                    </h2>

                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
                        {barbershop.address}
                    </p>

                    <Button variant="secondary" className="w-full mt-3 lg:text-base"
                        onClick={handleBookingClick}
                    >
                        Reservar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BarbershopItem;