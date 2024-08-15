"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { SheetClose, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { quickSerachOptions } from "../_constantes/quickSearch";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SigInDialog from "./sig-in-dialog";

const SideMenu = () => {
  const { data } = useSession();

  const handleLogoutClick = () => signOut();

  return (
    <>
      <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar className="md:h-12 md:w-12">
              <AvatarImage src={data.user?.image ?? ""} />
            </Avatar>

            <div>
              <h3 className="font-bold md:text-lg">{data.user.name}</h3>
              <span className="block text-xs text-muted-foreground">
                {data?.user?.email}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 px-5 py-6">
          <div className="flex items-center gap-2">
            <UserIcon size={32} className="text-violet-700" />

            <h2 className="pt-3 font-bold md:text-lg">Olá, Faça seu Login!</h2>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start md:py-5 md:text-base"
              >
                <LogInIcon
                  className="mr-2 text-violet-700 md:block"
                  size={24}
                />
                Fazer Login
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%]">
              <SigInDialog />
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start md:py-5" asChild>
          <Link href="/" className="md:text-base">
            <HomeIcon size={20} className="mr-2 text-violet-700 md:block" />
            Inicio
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start md:py-5" asChild>
            <Link href="/bookings" className="md:text-base">
              <CalendarIcon
                size={20}
                className="mr-2 text-violet-700 md:block"
              />
              Agendamentos
            </Link>
          </Button>
        )}

        <Separator className="mt-3" />

        <div className="mt-1 flex flex-col gap-3">
          {quickSerachOptions.map((option) => (
            <SheetClose key={option.title} asChild>
              <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.iamgeUrl}
                    width={17}
                    height={17}
                    alt={option.title}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        {data?.user && (
          <div>
            <Separator className="mt-1" />

            <div className="flex items-center gap-3">
              <Button
                className="mt-6 w-full justify-start gap-2 pl-4"
                onClick={handleLogoutClick}
                variant="outline"
                size="icon"
              >
                <LogOutIcon size={24} className="text-violet-700" />
                <span className="block">Sair da Conta</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideMenu;
