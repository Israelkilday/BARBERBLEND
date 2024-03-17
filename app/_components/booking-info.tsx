import { Barbershop, Booking, Prisma, Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "./ui/card";

interface BookingItemProps {
    booking: Partial<Pick<Booking, "date">> & {
        Service: Pick<Service, "name" | "price">;
        barbershop: Pick<Barbershop, "name">;
    };
}

const BookingInfo = ({ booking }: BookingItemProps) => {
    return (
        <Card>
            <CardContent className="px-3 py-3  gap-3 flex flex-col">
                <div className="flex justify-between">
                    <h2 className="font-bold lg:text-base">
                        {booking.Service.name}
                    </h2>
                    <h3 className="font-bold text-sm lg:text-base">
                        {""}
                        {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(Number(booking.Service.price))}
                    </h3>
                </div>

                {booking.date && (
                    <>
                        <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm lg:text-base">
                                Data
                            </h3>

                            <h4 className="text-sm lg:text-base">
                                {format(booking.date, "dd 'de' MMMM", {
                                    locale: ptBR,
                                })}
                            </h4>
                        </div>

                        <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm lg:text-base">
                                Horario
                            </h3>

                            <h4 className="text-sm lg:text-base">{format(booking.date, "hh:mm")}</h4>
                        </div>
                    </>
                )}

                <div className="flex justify-between">
                    <h3 className="text-gray-400 text-sm lg:text-base">
                        Barbearia
                    </h3>

                    <h4 className="text-sm lg:text-base">{booking.barbershop.name}</h4>
                </div>
            </CardContent>
        </Card>
    );
}

export default BookingInfo;


