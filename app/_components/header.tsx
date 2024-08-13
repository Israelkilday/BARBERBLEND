"use client";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  CircleUserRound,
  LogOutIcon,
  MenuIcon,
  Scissors,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { data } = useSession();

  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn("google");

  return (
    <header>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5 lg:px-32">
          <Link
            href="/"
            className="flex items-center gap-1 rounded-md p-2 font-bold outline-none duration-300 hover:bg-accent"
          >
            <Scissors className="font-bold text-purple-500" />

            <h2 className="font-berkshire-swash md:text-lg">BARBERBLEND</h2>

            <Scissors className="trasform rotate-180 font-bold text-purple-500" />
          </Link>

          {data?.user ? (
            <div className="flex items-center justify-between gap-2 px-5 lg:px-0">
              <div className="hidden items-center gap-3 lg:flex">
                <Button
                  asChild
                  className="hidden justify-start border-none bg-card hover:bg-accent lg:flex"
                >
                  <Link href="/bookings" className="md:text-lg">
                    <CalendarIcon size={24} className="mr-2 text-violet-700" />
                    Agendamentos
                  </Link>
                </Button>

                <Avatar>
                  <AvatarImage src={data.user?.image ?? ""} />
                </Avatar>

                <h2 className="mr-2 font-bold md:text-lg">{data.user.name}</h2>

                <Button
                  variant="secondary"
                  size="icon"
                  className="hidden lg:flex"
                >
                  <LogOutIcon onClick={handleLogoutClick} />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleLoginClick}
              className="hidden hover:bg-primary/85 md:text-lg lg:flex"
            >
              <CircleUserRound className="mr-2" size={24} />
              Login
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 md:h-9 md:w-9 lg:hidden"
              >
                <MenuIcon size={26} className="md:block" />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
