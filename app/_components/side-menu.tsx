"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { quickSerachOptions } from "../_constantes/quickSearch";

const SideMenu = () => {
  const { data } = useSession();

  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn("google");

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

            <h2 className="font-bold md:text-lg">{data.user.name}</h2>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-5 py-6">
          <div className="flex items-center gap-2">
            <UserIcon size={32} />

            <h2 className="font-bold md:text-lg">Olá, faça seu login</h2>
          </div>

          <Button
            variant="secondary"
            onClick={handleLoginClick}
            className="w-full justify-start md:py-5 md:text-base"
          >
            <LogInIcon className="mr-2 md:block" size={24} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start md:py-5" asChild>
          <Link href="/" className="md:text-base">
            <HomeIcon size={20} className="mr-2 md:block" />
            Inicio
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start md:py-5" asChild>
            <Link href="/bookings" className="md:text-base">
              <CalendarIcon size={20} className="mr-2 md:block" />
              Agendamentos
            </Link>
          </Button>
        )}

        <Separator className="mt-3" />

        <div className="mt-1 flex flex-col gap-3">
          {quickSerachOptions.map((option) => (
            <Button
              className="justify-start gap-2"
              variant="ghost"
              key={option.title}
            >
              <Image
                src={option.iamgeUrl}
                width={17}
                height={17}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <Separator className="mt-1" />

        <div className="flex items-center gap-3">
          <Button
            className="mt-3 w-full justify-start gap-2 pl-4"
            variant="outline"
            size="icon"
          >
            <LogOutIcon onClick={handleLogoutClick} />
            <span className="block">Sair da Conta</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
