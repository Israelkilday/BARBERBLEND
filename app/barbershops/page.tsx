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
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 lg:px-0 py-6 flex flex-col gap-4">
        <div className="md:w-1/2 lg:w-1/2 lg:px-32 lg:pt-5 ">
          <Search
            defaultValues={{
              search: searchParams.search,
            }}
          />
        </div>

        <h1 className="text-gray-400 font-bold text-xs md:text-lg lg:text-xl uppercase lg:px-32 lg:pt-5">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:px-32 lg:pt-5 lg:mb-20">
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
