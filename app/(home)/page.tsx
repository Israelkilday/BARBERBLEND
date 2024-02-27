import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

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

      <div className="lg:flex lg:px-32 lg:py-16">
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

          <div className="px-5 mt-6 lg:px-0 md:w-96 ">
            <Search />
          </div>

          <div className="mt-6">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold lg:pl-0 md:text-lg">
                  Agendamentos
                </h2>

                <div className=" px-5 flex gap-3 overflow-x-auto [&:: -webkit-scrollbar]:hidden lg:px-0">
                  {confirmedBookings.map(
                    booking => <BookingItem key={booking.id} booking={booking} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold lg:px-0 md:text-lg">
            Recomendados
          </h2>

          <div className="flex px-5 gap-4 overflow-x-auto lg:px-0 [&:: -webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <div key={barbershop.id} className="min-w-[167px] max-w-[167px] md:min-w-[197px] md:max-w-[197px]">
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
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
    </div>
  );
};
