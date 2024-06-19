"use client";

import { Barbershop } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "sonner";
import {
  ChevronLeftIcon,
  Clock,
  Copy,
  MapPinIcon,
  Phone,
  Smartphone,
  StarIcon,
} from "lucide-react";
import Header from "@/app/_components/header";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.replace("/");
  };

  const [copied, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard("(85) 1234 5678");
    copyToClipboard("(85) 91234 5678");
    toast.success("Número de Telefone copiado com sucesso!");
  };

  return (
    <div>
      <div className="mb-20 hidden lg:block">
        <Header />
      </div>

      <div className="lg:flex lg:px-32 gap-5 lg:gap-12">
        <div className="lg:min-w-[50%] lg:min-h-full">
          <div className="lg:mb-2 hidden lg:block">
            <div className="flex justify-between pb-1">
              <h1 className="text-base items-end lg:text-2xl font-bold ">
                {barbershop.name}
              </h1>

              <div className="flex gap-1 items-center">
                <StarIcon className="text-primary" size={20} />

                <p className="text-sm lg:text-base">
                  {barbershop.ratings} ({barbershop.stars} avaliações)
                </p>
              </div>
            </div>
          </div>

          <div className="h-[280px] lg:min-h-full w-full relative mb-6">
            <Button
              size="icon"
              variant="outline"
              onClick={handleBackClick}
              className="z-50 rounded-full absolute top-4 left-4 md:left-9"
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
              className=" h-auto w-full lg:rounded-3xl lg:min-w-[100%] lg:max-h-[88%]"
            />
          </div>
        </div>

        <div className="md:px-32 relative bottom-4 z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-background pt-7 lg:pt-0 px-5 lg:px-0 lg:mt-[22px]">
          <div className="lg:mb-5 lg:hidden">
            <div className="flex justify-between border-b border-solid border-secondary pb-3 mb-7">
              <h1 className="text-base items-end font-bold ">
                {barbershop.name}
              </h1>

              <div className="flex gap-1 items-end      ">
                <StarIcon className="text-primary" size={20} />

                <p className="text-sm">
                  {barbershop.ratings} ({barbershop.stars} avaliações)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-end gap-1 pb-4">
            <MapPinIcon className="text-primary font-bold" size={20} />

            <p className="text-sm lg:text-base">{barbershop.address}</p>
          </div>

          <Card>
            <CardContent className="p-5 md:p-4 lg justify-center">
              <h2 className="text-sm lg:text-center pb-3 mb-3 md:px-5 lg-px-0  uppercase text-gray-400 font-bold border-b border-solid border-secondary md:text-lg lg:text-xl lg:px-0">
                INFORMAÇÕES
              </h2>

              <p className="pb-3 text-sm text-gray-400 border-b border-solid border-secondary mb-3 md:px-5">
                {barbershop.description}
              </p>

              <h2 className="flex gap-2 items-center lg:justify-center font-bold mt-2 mb-2 overflow-hidden text-nowrap md:px-5 lg:px-0 lg:text-lg">
                <Clock className="size-6 text-purple-500" />
                Horário de funcionamento
              </h2>

              <div className="flex justify-between  pb-3 border-b border-solid border-secondary mb-3 md:px-5">
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

                <Button
                  onClick={handleCopy}
                  className="flex gap-1 bg-none px-3 h-8"
                >
                  Copiar
                  <Copy className="size-4" />
                </Button>
              </div>

              <div className="flex justify-between md:px-5">
                <p className="flex gap-2 items-center">
                  <Smartphone className="size-4 text-purple-500 font-bold" />
                  (85) 91234 5678
                </p>

                <Button
                  onClick={handleCopy}
                  className="flex gap-1 bg-none px-3 h-8"
                >
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
};

export default BarbershopInfo;
