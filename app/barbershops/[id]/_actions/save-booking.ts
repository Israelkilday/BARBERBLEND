"use server";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => {
  const user = await getServerSession(authOptions);

  if (!user) {
    throw new Error("Usuario não autentícado");
  }

  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
      barbershopId: params.barbershopId,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
};
