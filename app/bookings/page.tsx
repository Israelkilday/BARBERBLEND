import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import BookingItem from "../_components/booking-item";
import { Annoyed } from "lucide-react";

const BookingsPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return redirect("/");
    }

    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
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
        }),

        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date(),
                },
            },
            include: {
                Service: true,
                barbershop: true,
            },
        }),
    ]);

    return (
        <>
            <Header />
                <div className="px-5 lg:px-32 py-6 lg:py-10">
                    <h1 className="text-xl lg:text-3xl font-bold mb-6">Agendamentos</h1>

                    {confirmedBookings.length > 0 && (
                        <>
                            <h2 className="text-gray-400 uppercase font-bold text-sm lg:text-lg mt-6 mb-3">
                                Confirmados
                            </h2>


                            <div className="flex flex-col gap-3 lg:grid grid-cols-2 cursor-pointer">
                                {confirmedBookings.map((booking) => (
                                    <BookingItem key={booking.id} booking={booking} />
                                ))}
                            </div>
                        </>
                    )}

                    {confirmedBookings.length === 0 && (
                        <div >
                            <h2 className="flex gap-2 text-gray-400">
                                <Annoyed className="text-purple-500" />
                                Ops! Você ainda Não possui Agendamentos.
                            </h2>
                        </div>
                    )}

                    {finishedBookings.length > 0 && (
                        <>
                            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3 lg:text-lg">
                                Finalizados
                            </h2>
                            <div className="flex flex-col gap-3 lg:grid grid-cols-2">
                                {finishedBookings.map((booking) => (
                                    <BookingItem key={booking.id} booking={booking} />
                                ))}
                            </div>
                        </>
                    )}
                </div >
        </>
    );
};

export default BookingsPage; 