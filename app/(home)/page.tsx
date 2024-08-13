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
          <div className="px-5 pt-5 lg:px-0 lg:py-0">
            <h2 className="text-xl font-bold md:text-2xl">
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

          <div className="[&&:: -webkit-scrollbar]:hidden mt-7 flex gap-3 overflow-x-scroll px-5 md:hidden">
            {quickSerachOptions.map((option) => (
              <Button
                className="gap-2"
                variant="secondary"
                key={option.title}
                asChild
              >
                <Link href={`/barbershops?search=${option.title}`}>
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

        <div className="mt-6 lg:mt-0 lg:w-[55%]">
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

      <div className="mt-6 lg:px-32 lg:pt-6">
        <h2 className="mb-3 px-5 font-bold uppercase text-gray-400 md:text-lg lg:mb-6 lg:px-0 lg:text-center lg:text-[26px]">
          Conheça nossos destaques
        </h2>

        <ServicesSection />
      </div>

      <div className="mt-6 lg:mt-16 lg:px-32">
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

      <div className="mb-10 mt-6 lg:my-16 lg:px-32">
        <h2 className="mb-3 px-5 font-bold uppercase text-gray-400 md:text-lg lg:mb-6 lg:px-0 lg:text-center lg:text-[26px]">
          Nossa Galeria
        </h2>

        <section className="flex w-full flex-col gap-3 px-5 grayscale lg:px-0">
          <div className="flex w-full gap-3">
            <div className="flex w-full flex-col gap-3 overflow-hidden">
              <div className="flex overflow-hidden rounded-lg">
                <img
                  src="/image_galery_1.jpg"
                  alt="teste"
                  className="h-40 w-full object-cover duration-200 hover:scale-105 hover:opacity-30"
                />
              </div>

              <div className="flex overflow-hidden rounded-lg">
                <img
                  src="/image_galery_2.jpg"
                  alt="teste"
                  className="h-40 w-full object-cover duration-200 hover:scale-105 hover:opacity-30"
                />
              </div>
            </div>

            <div className="flex gap-3 overflow-hidden">
              <div className="flex gap-3 overflow-hidden rounded-lg">
                <img
                  src="/teste.jpeg"
                  alt="teste"
                  className="h-[332px] w-[350px] object-cover duration-200 hover:scale-105 hover:opacity-30 md:w-[1000px]"
                />
              </div>

              <div className="flex flex-col gap-3 overflow-hidden">
                <div className="flex overflow-hidden rounded-lg">
                  <img
                    src="/image_galery_4.jpg"
                    alt="image_4"
                    className="h-28 w-full object-cover duration-200 hover:scale-105 hover:opacity-30 md:w-[1400px]"
                  />
                </div>

                <div className="flex overflow-hidden rounded-lg">
                  <img
                    src="/image_galery_5.jpg"
                    alt="teste"
                    className="h-[208px] w-full object-cover duration-200 hover:scale-105 hover:opacity-30"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3">
            <div className="flex w-full gap-3 overflow-hidden rounded-lg">
              <img
                src="/image_galery_6.jpg"
                alt="image_6"
                className="h-[332px] w-full object-cover duration-200 hover:scale-105 hover:opacity-30"
              />
            </div>

            <div className="flex w-full flex-col gap-3 overflow-hidden md:w-[3000px] md:flex-row">
              <div className="flex w-full gap-3 overflow-hidden rounded-lg md:w-[2500px]">
                <img
                  src="image_galery_7.jpg"
                  alt="teste"
                  className="h-40 w-full object-cover duration-200 hover:scale-105 hover:opacity-30 md:h-[332px]"
                />
              </div>

              <div className="flex w-full gap-3 overflow-hidden rounded-lg">
                <img
                  src="image_galery_8.jpg"
                  alt="teste"
                  className="h-40 w-full object-cover duration-200 hover:scale-105 hover:opacity-30 md:h-[332px]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
