"use client"

import { useCopyToClipboard } from "@uidotdev/usehooks";

import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/side-menu";

import { ChevronLeftIcon, Clock, Copy, MapPinIcon, MenuIcon, Phone, Smartphone, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import Header from "@/app/_components/header";
import { Card, CardContent } from "@/app/_components/ui/card";
import { toast } from "sonner";

interface BarbershopInfoProps {
    barbershop: Barbershop
}


const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();


    const [copied, copyToClipboard] = useCopyToClipboard();

    const handleCopy = () => {
        copyToClipboard("(85) 1234 5678");
        copyToClipboard("(85) 91234 5678");
        toast.success("Número de Telefone copiado com sucesso!");
    };

    const handleBackClick = () => {
        router.replace("/");
    };

    return (
        <div>
            <div className="mb-6">
                <Header />
            </div>

            <div className="lg:flex lg:mt-16 lg:px-32 gap-5">
                <div className="lg:min-w-[40%]">
                    <div className="md:flex justify-between px-5 lg:px-32 border-b border-solid border-secondary mb-3">
                        <h1 className="text-xl pb-2 lg:text-3xl font-bold ">
                            {barbershop.name}
                        </h1>

                        <div className="flex gap-1 items-center md:p-3 md:border border-solid border-secondary rounded-lg">
                            <StarIcon className="text-primary" size={20} />

                            <p className="text-sm lg:text-base">5,0 (899 avaliações)</p>
                        </div>
                    </div>

                    <div className="px-5 mb-3 lg:px-0">

                        <div className="flex flex-col md:flex-row gap-2 mt-2 justify-between">
                            <div className="flex items-center gap-1 ">
                                <MapPinIcon className="text-primary font-bold" size={20} />

                                <p className="text-sm lg:text-base">{barbershop.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-[250px] lg:h-96 w-full relative mb-6">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={handleBackClick}
                            className="z-50 absolute top-4 left-4 md:left-9"
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
                            className="opacity-75 md:max-w-[95%] md:mx-5 md:rounded-xl lg:mx-0 lg:min-w-[100%]"
                        />
                    </div>
                </div>

                <div className="px-5">
                    <h2 className="text-sm lg:text-center mb-3 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-[26px] lg:px-0 lg:pt-16">
                        SOBRE NÓS
                    </h2>

                    <Card className="">
                        <CardContent className="p-5 md:p-4 justify-center">
                            <p className="pb-3 text-sm text-gray-400 border-b border-solid border-secondary mb-3 md:px-5">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae quod tempore sapiente natus, alias libero hic repellat eius in sequi ut molestiae saepe accusantium magni aspernatur optio cupiditate sint accusamus.
                            </p>

                            <h2 className="flex gap-2 items-center font-bold mt-2 mb-2 overflow-hidden text-ellipsis text-nowrap md:px-5 lg:text-lg">
                                <Clock className="size-6 text-purple-500" />
                                Horário de funcionamento
                            </h2>

                            <div className="flex justify-between pb-3 border-b border-solid border-secondary mb-3 md:px-5">
                                <div>
                                    <p className="text-sm text-gray-400">Domingo</p>
                                    <p className="text-sm text-gray-400">Segunda-Feira</p>
                                    <p className="text-sm text-gray-400">Terça-Feira</p>
                                    <p className="text-sm text-gray-400">Quarta-Feira</p>
                                    <p className="text-sm text-gray-400">Quinta-Feira</p>
                                    <p className="text-sm text-gray-400">Sexta-Feira</p>
                                    <p className="text-sm text-gray-400">Sabado</p>
                                </div>

                                <div>
                                    <p className="text-sm">08:00 - 12:00</p>
                                    <p className="text-sm">Fechado</p>
                                    <p className="text-sm">08:00 - 17:00</p>
                                    <p className="text-sm">08:00 - 17:00</p>
                                    <p className="text-sm">08:00 - 17:00</p>
                                    <p className="text-sm">08:00 - 17:00</p>
                                    <p className="text-sm">08:00 - 15:00</p>
                                </div>
                            </div>

                            <div className="flex justify-between md:px-5 mb-3">
                                <p className="flex gap-2 items-center">
                                    <Phone className="size-4 text-purple-500 font-bold" />
                                    (85) 1234 5678
                                </p>
                                
                                <Button onClick={handleCopy} className="flex gap-1 bg-none px-3 h-8">
                                    Copiar
                                    <Copy className="size-4" />
                                </Button>
                            </div>

                            <div className="flex justify-between md:px-5">
                                <p className="flex gap-2 items-center">
                                    <Smartphone className="size-4 text-purple-500 font-bold" />
                                    (85) 91234 5678
                                </p>
                                
                                <Button onClick={handleCopy} className="flex gap-1 bg-none px-3 h-8">
                                    Copiar
                                    <Copy className="size-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BarbershopInfo;