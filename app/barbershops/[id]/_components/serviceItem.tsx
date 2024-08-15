"use client";

import { Barbershop, Booking, Service } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { format, setHours, setMinutes } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateDayTimeList } from "../_helpers/hours";
import * as saveBooking from "../_actions/save-booking";
import { getDayBookings } from "../_actions/get-day-bookings";
import BookingInfo from "@/app/_components/booking-info";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Calendar } from "@/app/_components/ui/calendar";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import SigInDialog from "@/app/_components/sig-in-dialog";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({
  service,
  barbershop,
  isAuthenticated,
}: ServiceItemProps) => {
  const router = useRouter();

  const { data } = useSession();

  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDAyBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvaliableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);

      setDAyBookings(_dayBookings);
    };

    refreshAvaliableHours();
  }, [date, barbershop.id]);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return setSignInDialogIsOpen(true);
    }
  };

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);

    try {
      if (!hour || !date || !data?.user) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking.saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      });

      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);

      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'as' HH':'mm'.'", {
          locale: ptBR,
        }),

        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) {
        return true;
      }

      return false;
    });
  }, [date, dayBookings]);

  return (
    <>
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-4">
            <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
              <Image
                fill
                src={service.imageUrl}
                alt={service.name}
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>

            <div className="flex w-full flex-col">
              <h2 className="font-bold lg:text-base">{service.name}</h2>

              <p className="text-sm text-gray-400">{service.description}</p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-primary lg:text-base">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>

                <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="secondary" onClick={handleBookingClick}>
                      Reservar
                    </Button>
                  </SheetTrigger>

                  <SheetContent className="p-0">
                    <SheetHeader className="border-b border-solid border-secondary px-5 py-5 text-left lg:hidden">
                      <SheetTitle>Fazer Reserva</SheetTitle>
                    </SheetHeader>

                    <div className="lg:flex lg:px-0 lg:pt-5">
                      <div className="py-4 lg:pb-2">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateClick}
                          className="mt-0 pb-0 pt-0"
                          locale={ptBR}
                          fromDate={new Date()}
                          styles={{
                            head_cell: {
                              width: "100%",
                              textTransform: "capitalize",
                            },

                            cell: {
                              width: "100%",
                            },

                            button: {
                              width: "100%",
                            },

                            nav_button_previous: {
                              width: "32px",
                              height: "32px",
                            },

                            nav_button_next: {
                              width: "32px",
                              height: "32px",
                            },

                            caption: {
                              textTransform: "capitalize",
                            },
                          }}
                        />
                      </div>

                      {date && (
                        <div className="[&:: -webkit-scrollbar]:hidden flex grid-cols-3 gap-3 overflow-x-auto border-t border-solid border-secondary px-5 py-4 lg:grid lg:border-none">
                          {timeList.map((time) => (
                            <Button
                              variant={hour === time ? "default" : "outline"}
                              key={time}
                              className="rounded-full"
                              onClick={() => handleHourClick(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-solid border-secondary px-5 py-4">
                      <BookingInfo
                        booking={{
                          barbershop: barbershop,
                          date:
                            date && hour
                              ? setMinutes(
                                  setHours(date, Number(hour.split(":")[0])),
                                  Number(hour.split(":")[1]),
                                )
                              : undefined,
                          Service: service,
                        }}
                      />
                    </div>

                    <SheetFooter className="px-5">
                      <Button
                        onClick={handleBookingSubmit}
                        disabled={
                          !isAuthenticated || !hour || !date || submitIsLoading
                        }
                      >
                        {submitIsLoading && (
                          <Loader2 className="mr-2 flex h-4 w-4 animate-spin lg:text-base" />
                        )}
                        Confirmar reserva
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => {
          setSignInDialogIsOpen(open);
        }}
      >
        <DialogContent className="w-[90%]">
          <SigInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
