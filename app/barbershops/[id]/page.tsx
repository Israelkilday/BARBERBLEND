import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/serviceItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import ServicesSection from "./_components/servicesSection";

interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
    const session = await getServerSession(authOptions);

    if (!params.id) {
        // TODO redirecionar para homepage
        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        }
    });

    if (!barbershop) {
        // TODO redirecionar para homepage
        return null;
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />

            <h2 className="px-5 text-sm lg:text-center mb-3 mt-6 lg:mt-16 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-[26px]">
                NOSSOS SERVIÇOS
            </h2>

            <div className="px-5  flex flex-col gap-4 mb-6 lg:grid grid-cols-2 lg:px-32 lg:mb-16">
                {barbershop.services.map((service) => (
                    <ServiceItem
                        key={service.id}
                        barbershop={barbershop}
                        service={service} isAuthenticated={!!session?.user} />
                ))}
            </div>

            <div className="mb-6 lg:px-32 lg:mb-16">
                <h2 className="px-5 text-sm lg:text-center mb-3 lg:mb-6 uppercase text-gray-400 font-bold md:text-lg lg:text-[26px] lg:px-0">
                    Conheça nossos destaques
                </h2>
                <ServicesSection />
            </div>
        </div>
    );
};

export default BarbershopDetailsPage;