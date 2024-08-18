import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../_lib/auth";
import ServicesSection from "./_components/servicesSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";
import { Button } from "../_components/ui/button";
import { quickSerachOptions } from "../_constantes/quickSearch";
import Link from "next/link";
import Galery from "./_components/galery";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recomendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: "desc",
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              Service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

  return (
    <div>
      <Header />

      <div className="justify-between lg:mb-16 lg:flex lg:px-32 lg:py-16">
        <div>
          <div className="px-5 pt-10 lg:px-0 lg:py-0 lg:pt-0">
            <h2 className="font-bold md:text-2xl">
              {session?.user
                ? `Olá, ${session.user.name?.split(" ")[0]}!`
                : "Olá! Vamos agendar um corte hoje?"}
            </h2>

            <p className="text-sm capitalize md:text-xl">
              {format(new Date(), "EEEE ',' dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="mt-6 px-5 md:w-3/5 lg:w-full lg:px-0">
            <Search />
          </div>

          <div className="[&&:: -webkit-scrollbar]:hidden mt-8 flex gap-3 overflow-x-scroll px-5 lg:hidden">
            {quickSerachOptions.map((option) => (
              <Button
                className="gap-2"
                variant="secondary"
                key={option.title}
                asChild
              >
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.iamgeUrl}
                    width={16}
                    height={16}
                    alt={option.title}
                  />
                  {option.title}
                </Link>
              </Button>
            ))}
          </div>

          <div className="relative mt-8 h-[190px] w-full md:h-72 lg:hidden">
            <Image
              alt="Agende nos melhores com FSW Barber"
              src="/banner.jpg"
              fill
              priority
              quality={100}
              className="object-cover"
            />
          </div>

          <div className="mt-6 pl-5 pr-0 lg:px-0">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="mb-3 font-bold uppercase text-gray-400 md:text-lg lg:pl-0">
                  Agendamentos
                </h2>

                <Carousel
                  opts={{
                    loop: true,
                  }}
                  className="flex gap-3 md:w-3/5 lg:w-96 lg:px-0"
                >
                  <CarouselContent className="w-11/12 cursor-pointer md:w-full">
                    {confirmedBookings.map((booking) => (
                      <CarouselItem key={booking.id}>
                        <BookingItem booking={booking} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {confirmedBookings.length > 1 ? (
                    <CarouselNext className="hidden md:flex lg:-right-[24px]" />
                  ) : null}
                </Carousel>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:w-[55%]">
          <h2 className="mb-3 px-5 font-bold uppercase text-gray-400 md:text-lg lg:px-0">
            Recomendados
          </h2>

          <Carousel className="overflow-x-auto pl-5 pr-0 md:max-w-3xl lg:max-w-6xl lg:overflow-hidden lg:pl-0">
            <CarouselContent>
              {barbershops.slice(0, 10).map((barbershop) => (
                <CarouselItem
                  key={barbershop.id}
                  className="min-w-[183px] max-w-[183px] md:min-w-[243px] md:max-w-[243px]"
                >
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 hidden lg:flex" />
            <CarouselNext className="right-1 hidden lg:flex" />
          </Carousel>
        </div>

        <Image
          fill
          src="/banner.jpg"
          alt="Banner"
          style={{
            objectFit: "cover",
          }}
          className="-z-30 hidden max-h-[570px] opacity-40 grayscale lg:flex"
        />
      </div>

      <div className="mt-7 hidden justify-between gap-3 px-32 lg:flex">
        {quickSerachOptions.map((option) => (
          <Button
            className="gap-2 px-7 text-base"
            variant="secondary"
            key={option.title}
            asChild
          >
            <Link href={`/barbershops?service=${option.title}`}>
              <Image
                src={option.iamgeUrl}
                width={18}
                height={18}
                alt={option.title}
              />
              {option.title}
            </Link>
          </Button>
        ))}
      </div>

      <div className="mt-8 lg:px-32 lg:pt-6">
        <h2 className="mb-3 px-5 font-bold uppercase text-gray-400 md:text-lg lg:mb-6 lg:px-0 lg:text-center lg:text-[26px]">
          Conheça nossos destaques
        </h2>

        <ServicesSection />
      </div>

      <div className="mt-8 lg:mt-16 lg:px-32">
        <h2 className="mb-3 px-5 font-bold uppercase text-gray-400 md:text-lg lg:mb-6 lg:px-0 lg:text-center lg:text-[26px]">
          Escolha sua Barbearia
        </h2>

        <Carousel className="overflow-x-auto pl-5 pr-0 md:max-w-3xl lg:max-w-6xl lg:overflow-hidden lg:pl-0">
          <CarouselContent>
            {recomendedBarbershops.slice(0, 10).map((barbershop) => (
              <CarouselItem
                key={barbershop.id}
                className="min-w-[183px] max-w-[183px] md:min-w-[243px] md:max-w-[243px] lg:min-w-[275px] lg:max-w-[275px]"
              >
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-1 hidden lg:flex" />

          <CarouselNext className="right-1 hidden lg:flex" />
        </Carousel>
      </div>

      <div className="mb-16 mt-8 lg:mb-24 lg:mt-16 lg:px-32">
        <h2 className="mb-3 px-5 font-bold uppercase text-gray-400 md:text-lg lg:mb-6 lg:px-0 lg:text-center lg:text-[26px]">
          Nossa Galeria
        </h2>

        <Galery />
      </div>
    </div>
  );
}
