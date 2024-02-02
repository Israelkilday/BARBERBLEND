import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "./_components/barbershop-info";

interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
    if (!params.id) {
        // TODO redirecionar para homepage
        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!barbershop) {
        // TODO redirecionar para homepage
        return null;
    }

    return <BarbershopInfo barbershop={barbershop} />       
};

export default BarbershopDetailsPage;