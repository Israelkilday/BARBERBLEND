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
    <div className="pb-5">
      <BarbershopInfo barbershop={barbershop} />

      <h2 className="mb-3 mt-3 px-5 uppercase text-gray-400 md:px-32 md:text-lg lg:mb-6 lg:mt-14 lg:text-center lg:text-[26px]">
        NOSSOS SERVIÇOS
      </h2>

      <div className="mb-6 flex grid-cols-2 flex-col gap-4 px-5 md:px-32 lg:mb-16 lg:grid">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>

      <div className="mb-12 mt-7 md:mb-16 lg:px-32">
        <h2 className="mb-3 px-5 uppercase text-gray-400 md:px-32 md:text-lg lg:mb-6 lg:px-0 lg:text-center lg:text-[26px]">
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
