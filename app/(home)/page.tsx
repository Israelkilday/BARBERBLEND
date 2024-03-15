import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../_components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
import ServicesSection from "./_components/servicesSection";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recomendedBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: "asc"
      }
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

      <div className="lg:flex justify-between lg:px-32 lg:py-16 lg:mb-16">
        <div >
          <div className="px-5 pt-5 lg:px-0 lg:py-0">
            <h2 className="text-xl font-bold md:text-2xl">
              {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá! Vamos agendar um corte hoje?"}
            </h2>

            <p className="capitalize text-sm md:text-xl">
              {format(new Date(), "EEEE ',' dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="mt-6 px-5 md:w-3/5 lg:px-0 lg:w-full">
            <Search />
          </div>

          <div className="mt-6 pl-5 pr-0  lg:px-0">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="text-sm mb-3 uppercase text-gray-400 font-bold lg:pl-0 md:text-lg">
                  Agendamentos
                </h2>

                <Carousel
                  opts={{
                    loop: true,
                  }}
                  className="flex gap-3 md:w-3/5 lg:w-96 lg:px-0"
                >
                  <CarouselContent className="w-11/12 md:w-full cursor-pointer">
                    {confirmedBookings.map(booking => (
                      <CarouselItem key={booking.id}>
                        <BookingItem booking={booking} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {confirmedBookings.length > 1 ? (<CarouselNext className="hidden md:flex lg:-right-[24px]" />) : null}
                </Carousel>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 lg:w-[55%] lg:mt-0">
          <h2 className="px-5 text-sm mb-3 uppercase text-gray-400 font-bold lg:px-0 md:text-lg">
            Recomendados
          </h2>

          <Carousel
            className=" overflow-x-auto pl-5 pr-0 lg:pl-0 md:max-w-3xl lg:max-w-6xl lg:overflow-hidden"
          >
            <CarouselContent>
              {barbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="min-w-[183px] max-w-[183px] md:min-w-[243px] md:max-w-[243px] ">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden left-1 lg:flex" />
            <CarouselNext className="hidden right-1 lg:flex" />
          </Carousel >
        </div >

        <Image
          fill
          src="/banner.jpg"
          alt="Banner"
          style={{
            objectFit: "cover",
          }}
          className="-z-30 opacity-40 grayscale hidden lg:flex max-h-[570px]"
        />
      </div >

      <div className="mt-6 lg:pt-6 lg:px-32">
        <h2 className="px-5 text-sm lg:text-center mb-3 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-[26px] lg:px-0">
          Conheça nossos destaques
        </h2>

        <ServicesSection />
      </div>

      <div className="mt-6 lg:mt-16 lg:px-32">
        <h2 className="px-5 text-sm mb-3 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-center lg:text-[26px] lg:px-0">
          Escolha sua Barbearia
        </h2>

        <Carousel
          className=" overflow-x-auto pl-5 pr-0 lg:pl-0 md:max-w-3xl lg:max-w-6xl lg:overflow-hidden"
        >
          <CarouselContent>
            {recomendedBarbershops.map((barbershop) => (
              <CarouselItem key={barbershop.id} className="min-w-[183px] max-w-[183px] md:min-w-[243px] md:max-w-[243px] lg:max-w-[275px] lg:min-w-[275px]">
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden left-1 lg:flex" />
          <CarouselNext className="hidden right-1 lg:flex" />
        </Carousel >
      </div>

      <div className="mt-6 mb-10 lg:my-16 lg:px-32">
        <h2 className="px-5 text-sm lg:text-center mb-3 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-[26px] lg:px-0">
          Nossa Galeria
        </h2>

        <section className="flex px-5 lg:px-0 flex-col w-full gap-3 grayscale">
          <div className="flex w-full gap-3">
            <div className="flex flex-col w-full gap-3 overflow-hidden">

              <div className="flex overflow-hidden rounded-lg">
                <img src="/image_galery_1.jpg" alt="teste" className="object-cover w-full h-40 hover:scale-105 hover:opacity-30 duration-200" />
              </div>

              <div className="flex overflow-hidden rounded-lg">
                <img src="/image_galery_2.jpg" alt="teste" className="object-cover w-full h-40 hover:scale-105 hover:opacity-30 duration-200" />
              </div>
            </div>

            <div className="flex gap-3 overflow-hidden">
              <div className="flex gap-3 overflow-hidden rounded-lg">
                <img src="/teste.jpeg" alt="teste" className="object-cover h-[332px] w-[350px] md:w-[1000px] hover:scale-105 hover:opacity-30 duration-200" />
              </div>

              <div className="flex flex-col gap-3 overflow-hidden">
                <div className="flex overflow-hidden rounded-lg">
                  <img src="/image_galery_4.jpg" alt="image_4" className="object-cover h-28 w-full md:w-[1400px] hover:scale-105 hover:opacity-30 duration-200" />
                </div>

                <div className="flex overflow-hidden rounded-lg">
                  <img src="/image_galery_5.jpg" alt="teste" className="object-cover h-[208px] w-full  hover:scale-105 hover:opacity-30 duration-200" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3">
            <div className="flex w-full gap-3 overflow-hidden rounded-lg">
              <img src="/image_galery_6.jpg" alt="image_6" className="object-cover w-full h-[332px] hover:scale-105 hover:opacity-30 duration-200" />
            </div>

            <div className="flex flex-col md:flex-row w-full md:w-[3000px] gap-3 overflow-hidden">
              <div className="flex w-full md:w-[2500px] gap-3 overflow-hidden rounded-lg">
                <img src="image_galery_7.jpg" alt="teste" className="object-cover w-full h-40 md:h-[332px] hover:scale-105 hover:opacity-30 duration-200" />
              </div>

              <div className="flex w-full gap-3 overflow-hidden rounded-lg">
                <img src="image_galery_8.jpg" alt="teste" className="object-cover w-full h-40 md:h-[332px] hover:scale-105 hover:opacity-30 duration-200" />
              </div>
            </div>
          </div>
        </section>
      </div >
    </div >
  );
};
