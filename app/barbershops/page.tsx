import { db } from "../_lib/prisma";
import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import Search from "../(home)/_components/search";

interface BarbershopsPageProps {
  searchParams: {
    search: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },
        {
          services: {
            some: {
              name: {
                contains: searchParams.search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  });

  return (
    <>
      <Header />

      <div className="flex flex-col gap-4 px-5 pb-16 pt-10 lg:px-0 lg:pb-10">
        <div className="md:w-1/2 lg:w-1/2 lg:px-32 lg:pt-5">
          <Search
            defaultValues={{
              title: searchParams.search,
            }}
          />
        </div>

        <h1 className="pt-4 font-bold uppercase text-gray-400 md:text-lg lg:px-32 lg:text-xl">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:mb-20 lg:grid-cols-4 lg:gap-6 lg:px-32 lg:pt-5">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="md:w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopsPage;
