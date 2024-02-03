import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/serviceItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.services.map((service) => (
                    <ServiceItem 
                    key={service.id} 
                    service={service} isAuthenticaded={!!session?.user} />
                ))}
            </div>
        </div>
    );
};

export default BarbershopDetailsPage;