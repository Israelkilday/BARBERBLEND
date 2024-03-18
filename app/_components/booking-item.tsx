"use client"


import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { cancelBooking } from "../_actions/cancel-booking";
import BookingInfo from "./booking-info";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "./ui/alert-dialog";


interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            Service: true;
            barbershop: true;
        }
    }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const isBookingConfirmed = isFuture(booking.date);

    const handleCancelClick = async () => {
        setIsDeleteLoading(true)

        try {
            await cancelBooking(booking.id);

            toast.success("Reserva cancelada com sucesso!");

        } catch (error) {
            console.error(error);

        } finally {
            setIsDeleteLoading(false);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Card className="w-full">
                    <CardContent className="py-0 w-full flex px-0">
                        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                            <Badge
                                variant={isBookingConfirmed ? "default" : "secondary"}
                                className="w-fit md:text-sm font-bold"
                            >
                                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                            </Badge>

                            <h2 className="font-bold md:text-base">{booking.Service.name}</h2>

                            <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                    <AvatarImage src={booking.barbershop.imageUrl} />

                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>

                                <h3 className="text-sm md:text-base">{booking.barbershop.name}</h3>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
                            <p className="text-sm lg:text-base capitalize">
                                {format(booking.date, "MMMM", {
                                    locale: ptBR,
                                })}
                            </p>
                            <p className="text-2xl">{format(booking.date, "dd")}</p>
                            <p className="text-sm lg:text-base">{format(booking.date, "hh:mm")}</p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>

            <SheetContent className="px-5">
                <SheetHeader className="text-left pb-6 border-b border-solid border-secondary">
                    <SheetTitle className="text-xl">Informaçoes de Reserva</SheetTitle>
                </SheetHeader>

                <div>
                    <div className="relative h-[180px] w-full mt-6">
                        <Image
                            src="/barbershop-map.png"
                            fill
                            alt={booking.barbershop.name}
                            style={{
                                objectFit: "cover",
                            }}
                            className="rounded-xl"
                        />

                        <div className="w-full absolute bottom-7 left-0 px-5">
                            <Card>
                                <CardContent className="p-3 flex gap-2">
                                    <Avatar>
                                        <AvatarImage src={booking.barbershop.imageUrl}></AvatarImage>
                                    </Avatar>

                                    <div>
                                        <h2 className="font-bold lg:text-base">{booking.barbershop.name}</h2>

                                        <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis lg:text-sm">
                                            {booking.barbershop.address}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Badge
                        variant={isBookingConfirmed ? "default" : "secondary"}
                        className="w-fit mt-3 mb-3 font-bold lg:text-base"
                    >
                        {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                    </Badge>

                    <BookingInfo booking={booking} />

                    <SheetFooter className="flex-row gap-3 mt-6">
                        <SheetClose asChild>
                            <Button className="w-full lg:text-base" variant="secondary">
                                Voltar
                            </Button>
                        </SheetClose>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    disabled={!isBookingConfirmed || isDeleteLoading}
                                    className="w-full lg:text-base"
                                    variant="destructive"
                                >
                                    Cancelar Reserva
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="lg:text-xl">
                                        Deseja mesmo Cancelar Reserva?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription className="lg:text-base">
                                        Uma vez cancelada , não será possível reverter esta ação.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter className="flex-row gap-3">
                                    <AlertDialogCancel
                                        className="w-full mt-0 lg:text-base"
                                    >
                                        Voltar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        className="w-full lg:text-base"
                                        onClick={handleCancelClick}
                                        disabled={isDeleteLoading}
                                    >
                                        {isDeleteLoading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Confirmar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default BookingItem;