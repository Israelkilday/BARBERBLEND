import { Barbershop, Booking, Service } from "@prisma/client";
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
      <CardContent className="flex flex-col gap-3 px-3 py-3">
        <div className="flex justify-between">
          <h2 className="font-bold lg:text-base">{booking.Service.name}</h2>
          <h3 className="text-sm font-bold lg:text-base">
            {""}
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(booking.Service.price))}
          </h3>
        </div>

        {booking.date && (
          <>
            <div className="flex justify-between">
              <h3 className="text-sm text-gray-400 lg:text-base">Data</h3>

              <h4 className="text-sm lg:text-base">
                {format(booking.date, "dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </h4>
            </div>

            <div className="flex justify-between">
              <h3 className="text-sm text-gray-400 lg:text-base">Horario</h3>

              <h4 className="text-sm lg:text-base">
                {format(booking.date, "HH:mm")}
              </h4>
            </div>
          </>
        )}

        <div className="flex justify-between">
          <h3 className="text-sm text-gray-400 lg:text-base">Barbearia</h3>

          <h4 className="text-sm lg:text-base">{booking.barbershop.name}</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingInfo;
