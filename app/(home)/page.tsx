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
import Image from "next/image";

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

      <div
        className="lg:flex justify-between lg:px-32 lg:py-16"
      >
        {/* bg-transparent md:bg-center md:bg-cover md:bg-no-repeat */}
        {/* style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/banner.jpeg)", filter: "drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))" }} */}

        <div>
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

          <div className="px-5 mt-6 lg:px-0 md:w-2/3 lg:w-full ">
            <Search />
          </div>

          <div className="mt-6">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold lg:pl-0 md:text-lg">
                  Agendamentos
                </h2>

                <Carousel
                  opts={{
                    loop: true,
                  }}
                  className="px-5 md:pr-[272px] flex gap-3 overflow-x-auto lg:w-96 lg:overflow-hidden lg:px-0"
                >
                  <CarouselContent>
                    {confirmedBookings.map(booking => (
                      <CarouselItem key={booking.id}>
                        <BookingItem booking={booking} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {confirmedBookings.length > 1 ? (<CarouselNext className="hidden md:flex md:right-[220px]  lg:-right-[-4px] lg:top-[120px]" />) : null}

                  {/* <CarouselNext className="hidden -right-[-4px] top-[120px] lg:flex" /> */}
                </Carousel>

                {/* 
                <div className="px-5 flex gap-3 overflow-x-auto lg:w-96 [&:: -webkit-scrollbar]:hidden lg:px-0"> */}

                {/* <div className="px-5 flex gap-3 overflow-x-auto lg:w-96 lg:overflow-hidden lg:px-0">
                  {confirmedBookings.map(
                    booking => <BookingItem key={booking.id} booking={booking} />
                  )}
                </div> */}
              </>
            )}
          </div>
        </div>

        <div className="mt-6 lg:w-[55%] lg:mt-0">
          <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold lg:px-0 md:text-lg">
            Recomendados
          </h2>

          {/* <div className="flex px-5 gap-4 overflow-x-auto lg:px-0 [&:: -webkit-scrollbar]:hidden"> */}

          <Carousel
            className=" overflow-x-auto pl-5 pr-0 lg:pl-0 md:max-w-3xl lg:max-w-6xl lg:overflow-hidden"
          >
            <CarouselContent>
              {barbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="min-w-[183px] max-w-[183px] md:min-w-[233px] md:max-w-[233px]">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden left-1 lg:flex" />
            <CarouselNext className="hidden right-1 lg:flex" />
          </Carousel >

          {/* <div className="flex px-5 gap-4 overflow-x-auto lg:px-0 lg:overflow-hidden">
            {barbershops.map((barbershop) => (
              <div key={barbershop.id} className="min-w-[167px] max-w-[167px] md:min-w-[197px] md:max-w-[197px]">
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
          </div> */}
        </div >

        <Image
          fill
          src="/banner.jpeg"
          alt="Banner"
          // sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          className="-z-30 opacity-10 drop-shadow-lg hidden lg:flex"
        />
      </div >

      <div className="mt-6 lg:mt-28 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold md:text-xl">
          Populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&:: -webkit-scrollbar]:hidden">
          {recomendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px] md:min-w-[197px] md:max-w-[197px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};
