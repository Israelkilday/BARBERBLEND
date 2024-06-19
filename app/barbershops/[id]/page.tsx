import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import SectionBarbers from "./_components/sectionBarbers";
import ServiceItem from "./_components/serviceItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <h2 className="px-5 md:px-32 text-sm lg:text-center mb-3 mt-3 lg:mt-16 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-[26px]">
        NOSSOS SERVIÇOS
      </h2>

      <div className="px-5  flex flex-col gap-4 mb-6 lg:grid grid-cols-2 md:px-32 lg:mb-16">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>

      <div className="mb-6 lg:px-32 md:mb-16">
        <h2 className="px-5 md:px-32 text-sm lg:text-center mb-3 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-[26px] lg:px-0">
          Conheça nossa equipe
        </h2>

        <div className="">
          <SectionBarbers />
        </div>
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
